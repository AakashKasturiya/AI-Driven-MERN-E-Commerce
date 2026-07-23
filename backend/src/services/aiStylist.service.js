import openai from "../config/openai.js";
import Product from "../models/product.model.js";

const SYSTEM_PROMPT = `You are VELORA's AI Fashion Stylist — warm, concise, and genuinely helpful.
You give real styling advice (occasion dressing, color theory, fit, layering, budget-conscious picks).
Keep replies to 2-4 sentences, conversational, never robotic.
When the user is looking for specific items, call the "search_products" tool with your best-guess
category, keywords, and price range so real inventory can be shown alongside your advice.
Only call the tool when there's a genuine product intent — not for general style questions like
"what colors suit warm skin tones".`;

const searchProductsTool = {
  type: "function",
  function: {
    name: "search_products",
    description: "Search the store catalog for products matching the user's styling request.",
    parameters: {
      type: "object",
      properties: {
        keywords: { type: "string", description: "Free-text keywords, e.g. 'winter coat'" },
        category: { type: "string", description: "Category if clearly implied, omit if unclear" },
        minPrice: { type: "number" },
        maxPrice: { type: "number" },
      },
      required: ["keywords"],
    },
  },
};

// Normalizes Mongo product docs to the shape RecommendedSection expects:
// { id, title, thumbnail, price, category, rating }
function normalizeProducts(products) {
  return products.map((p) => ({
    id: String(p._id),
    title: p.title,
    thumbnail: p.thumbnail,
    price: p.discountPrice > 0 && p.discountPrice < p.price ? p.discountPrice : p.price,
    category: p.category,
    rating: p.rating ?? 4.5,
  }));
}

// Singularizes common terms to improve regex matching with singular DB fields
function singularize(word) {
  const w = word.toLowerCase();
  if (w.endsWith("es") && w.length > 4) {
    if (w.endsWith("dresses")) return "dress";
    if (w.endsWith("shoes")) return "shoe";
    if (w.endsWith("watches")) return "watch";
    return w.slice(0, -2);
  }
  if (w.endsWith("s") && w.length > 3 && !w.endsWith("ss")) {
    return w.slice(0, -1);
  }
  return w;
}

// Formulates Regex pattern matching both singular/plural forms of keyword with boundaries
function getKeywordRegexPattern(keyword) {
  const base = keyword.toLowerCase();
  if (base === "dress" || base === "watch" || base === "glass" || base === "status") {
    return `\\b${base}(es)?\\b`;
  }
  return `\\b${base}s?\\b`;
}

// Clean and extract valid product search keywords from text
function getKeywords(text) {
  let clean = String(text || "").toLowerCase();
  
  const replacements = {
    "don't": "dont",
    "can't": "cant",
    "won't": "wont",
    "bay": "buy",
    "buget": "budget",
    "undert": "under",
    "proudcts": "products",
    "proudct": "product",
    "recommedtions": "recommendations",
    "recommedtion": "recommendation",
    "collecion": "collection"
  };
  
  for (const [key, val] of Object.entries(replacements)) {
    clean = clean.replace(new RegExp(`\\b${key}\\b`, "g"), val);
  }
  
  clean = clean.replace(/[^\w\s-]/g, ""); // Allow hyphens like t-shirt
  
  const stopWords = new Set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
    "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", 
    "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", 
    "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", 
    "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", 
    "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", 
    "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", 
    "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", 
    "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", 
    "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", 
    "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", 
    "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", 
    "see", "give", "show", "get", "buy", "want", "need", "like", "find", "search", 
    "collection", "recommend", "recommendation", "recommendations", "please", "hello", 
    "hi", "hey", "tell", "ask", "look", "looking", "style", "shop", "shopping", "assistant", 
    "velora", "product", "products", "item", "items", "see", "say", "talk", "with", 
    "budget", "below", "above", "less", "more", "price", "limit", "upto", "up",
    "dont", "cant", "wont", "shouldnt", "havent", "hasnt", "didnt", "wasnt", "werent",
    "trendy", "trend", "trends", "luxury", "luxurious", "premium", "stylish", "beautiful",
    "nice", "gorgeous", "elegant", "cute", "cool", "casual", "formal", "great", "best",
    "popular", "amazing", "perfect", "good", "latest", "new", "old", "classic", "modern",
    "vintage", "outfit", "outfits", "idea", "ideas", "options", "selection", "selections",
    "choice", "choices", "wear", "styling"
  ]);

  return clean
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w && !stopWords.has(w) && isNaN(w))
    .map(w => singularize(w));
}

async function runProductSearch({ keywords, category, minPrice, maxPrice }) {
  const filter = {};

  if (keywords) {
    const rawKeys = keywords.split(/\s+/).filter(Boolean);
    const singularKeys = rawKeys.map(w => singularize(w));
    const uniqueKeys = [...new Set([...rawKeys, ...singularKeys])];
    const regexStr = uniqueKeys.map(k => getKeywordRegexPattern(k)).join("|");
    const regex = new RegExp(regexStr, "i");
    filter.$or = [{ title: regex }, { description: regex }, { brand: regex }];
  }
  if (category) filter.category = new RegExp(getKeywordRegexPattern(category), "i");
  if (minPrice != null || maxPrice != null) {
    filter.price = {};
    if (minPrice != null) filter.price.$gte = minPrice;
    if (maxPrice != null) filter.price.$lte = maxPrice;
  }

  const products = await Product.find(filter).limit(12).lean();
  return normalizeProducts(products);
}

// Fallback logic when OpenAI is unavailable (quota limit or unconfigured)
async function dbSearchFallback(message, history = []) {
  let cleanMsg = String(message || "").trim();
  
  // Normalizing typos in original message text
  const replacements = {
    "don't": "dont",
    "can't": "cant",
    "won't": "wont",
    "bay": "buy",
    "buget": "budget",
    "undert": "under",
    "proudcts": "products",
    "proudct": "product",
    "recommedtions": "recommendations",
    "recommedtion": "recommendation",
    "collecion": "collection"
  };
  for (const [key, val] of Object.entries(replacements)) {
    cleanMsg = cleanMsg.replace(new RegExp(`\\b${key}\\b`, "gi"), val);
  }

  const greetings = ["hello", "hi", "hey", "hola", "greetings", "good morning", "good afternoon"];
  const isGreeting = greetings.some(g => new RegExp(`\\b${g}\\b`, "i").test(cleanMsg));

  if (isGreeting && getKeywords(cleanMsg).length === 0) {
    const productsDocs = await Product.find({}).limit(12).lean();
    return {
      reply: "Hello! Welcome to VELORA's AI Shopping Assistant. I'm here to help you find the perfect outfits, style tips, or build your dream wardrobe from our collection! Here are some of our popular products to get you started.",
      products: normalizeProducts(productsDocs),
      usedFallback: false,
    };
  }

  // Get current message keywords
  let keywords = getKeywords(cleanMsg);
  
  // Re-use keywords from history if none found in current prompt (e.g. conversational follow-ups like "under 100")
  if (keywords.length === 0 && Array.isArray(history)) {
    for (let i = history.length - 1; i >= 0; i--) {
      const hMsg = history[i];
      if (hMsg.role === "user" || hMsg.role === "User") {
        const histKeywords = getKeywords(hMsg.text || hMsg.content);
        if (histKeywords.length > 0) {
          keywords = histKeywords;
          break;
        }
      }
    }
  }

  const filter = {};
  if (keywords.length > 0) {
    const regexStr = keywords.map(k => getKeywordRegexPattern(k)).join("|");
    const regex = new RegExp(regexStr, "i");
    filter.$or = [
      { title: regex },
      { description: regex },
      { category: regex },
      { brand: regex },
      { subCategory: regex },
    ];
  }

  // Extract price limit if context implies price or if message is very short
  let priceLimit = null;
  const numberMatches = cleanMsg.match(/\b\d+\b/g);
  if (numberMatches) {
    const hasPriceContext = /budget|under|below|less|price|\$|max|limit|upto|up to/i.test(cleanMsg) || 
                            cleanMsg.length <= 6;
    if (hasPriceContext) {
      priceLimit = parseFloat(numberMatches[numberMatches.length - 1]);
      if (!isNaN(priceLimit)) {
        filter.price = { $lte: priceLimit };
      }
    }
  }

  let productsDocs = await Product.find(filter).limit(40).lean();
  let usedFallback = false;

  if (productsDocs.length === 0) {
    // If no search match, try showing generic trending shirts if their query was shirt-related, or general fallback
    const isShirtQuery = keywords.some(k => k === "shirt" || k === "tshirt" || k === "t-shirt");
    const fallbackFilter = isShirtQuery ? { title: /shirt/i } : {};
    
    productsDocs = await Product.find(fallbackFilter).limit(40).lean();
    
    // Total fallback to any products if even fallback filter is empty
    if (productsDocs.length === 0) {
      productsDocs = await Product.find({}).limit(12).lean();
    }
    usedFallback = true;
  }

  // Sort and rank products based on matching keyword score (prioritize multiple matches and title matches)
  if (keywords.length > 0 && !usedFallback) {
    productsDocs = productsDocs.map(p => {
      let score = 0;
      const textToSearch = [
        p.title,
        p.description,
        p.category,
        p.brand,
        p.subCategory
      ].join(" ").toLowerCase();

      keywords.forEach(k => {
        const wordRegex = new RegExp(getKeywordRegexPattern(k), "i");
        if (wordRegex.test(textToSearch)) {
          score += 10;
        } else if (textToSearch.includes(k)) {
          score += 2;
        }

        // Extra weight for match in Title
        const titleRegex = new RegExp(getKeywordRegexPattern(k), "i");
        if (titleRegex.test(p.title || "")) {
          score += 15;
        }
      });
      return { ...p, _matchScore: score };
    });

    productsDocs.sort((a, b) => (b._matchScore || 0) - (a._matchScore || 0));
  }

  // Keep top 12 recommendations
  productsDocs = productsDocs.slice(0, 12);

  const normalized = normalizeProducts(productsDocs);
  const topTitles = normalized.slice(0, 3).map(p => p.title).join(", ");

  let reply = "";
  if (usedFallback) {
    reply = `I couldn't find exact matches for your request in our store right now, but check out these recommendations from our collection! Let me know if there's another specific outfit or style you are looking for.`;
  } else {
    // Tailored reply text
    const budgetSuffix = priceLimit ? ` under $${priceLimit}` : "";
    reply = `Based on your request, I found some great ${keywords.join("/")} options ${budgetSuffix} like ${topTitles} and more. Let me know if you would like to refine this by size or color!`;
  }

  return {
    reply,
    products: normalized,
    usedFallback,
  };
}

export async function getStylistReply({ message, history = [] }) {
  if (!openai) {
    console.warn("[ai] OpenAI not configured, using local database fallback.");
    return dbSearchFallback(message, history);
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.text })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      tools: [searchProductsTool],
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 300,
    });

    const choice = completion.choices[0];
    const toolCall = choice.message.tool_calls?.[0];

    let products = [];
    let usedFallback = false;

    if (toolCall && toolCall.function?.name === "search_products") {
      let args = {};
      try {
        args = JSON.parse(toolCall.function.arguments || "{}");
      } catch {
        args = {};
      }
      products = await runProductSearch(args);

      if (products.length === 0) {
        const fallbackDocs = await Product.find({}).limit(12).lean();
        products = normalizeProducts(fallbackDocs);
        usedFallback = true;
      }
    } else {
      // General question or greeting — populate recommendations panel with top products from DB
      const defaultDocs = await Product.find({}).limit(12).lean();
      products = normalizeProducts(defaultDocs);
      usedFallback = true;
    }

    let replyText = choice.message.content;

    if (!replyText && toolCall) {
      const followUp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          ...messages,
          choice.message,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(products.slice(0, 3).map((p) => p.title)),
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      });
      replyText = followUp.choices[0].message.content;
    }

    if (!replyText) {
      replyText = "I'm here to help — could you tell me a bit more about what you're looking for?";
    }

    return { reply: replyText, products, usedFallback };
  } catch (error) {
    const status = error.status || 500;
    if (status === 429 || status === 501 || error.code === "insufficient_quota") {
      console.warn("[ai] OpenAI API key quota limit exceeded (429), falling back to local database search.");
      return dbSearchFallback(message, history);
    }
    throw error;
  }
}