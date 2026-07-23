import openai from "../config/openai.js";
import Product from "../models/product.model.js"; // confirm your actual filename

const SYSTEM_PROMPT = `You are VELORA's AI Fashion Stylist — warm, concise, and genuinely helpful.
You give real styling advice (occasion dressing, color theory, fit, layering, budget-conscious picks).
Keep replies to 2-4 sentences, conversational, never robotic.

Call the "search_products" tool ONLY when the user explicitly names a specific item, garment type,
or clear shopping intent (e.g. "find me a winter coat", "black dress under $100").
Do NOT call it for greetings ("hello", "hi"), general style questions, or vague chat.
When in doubt, do not call the tool — respond with text only.`;

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

async function runProductSearch({ keywords, category, minPrice, maxPrice }) {
  const filter = {};

  if (keywords) {
    const regex = new RegExp(keywords.split(/\s+/).filter(Boolean).join("|"), "i");
    filter.$or = [{ title: regex }, { description: regex }, { brand: regex }];
  }
  if (category) filter.category = new RegExp(category, "i");
  if (minPrice != null || maxPrice != null) {
    filter.price = {};
    if (minPrice != null) filter.price.$gte = minPrice;
    if (maxPrice != null) filter.price.$lte = maxPrice;
  }

  return Product.find(filter).limit(12).lean();
}

async function fallbackSearch(query) {
  const keywords = String(query || "").trim();
  const searchQuery = keywords ? keywords.split(/\s+/).filter(Boolean).join("|") : "";
  const regex = new RegExp(searchQuery || ".*", "i");

  const products = await Product.find(
    searchQuery
      ? {
          $or: [
            { title: regex },
            { description: regex },
            { brand: regex },
            { category: regex },
          ],
        }
      : {}
  )
    .limit(12)
    .lean();

  if (products.length) return products;

  return Product.find({}).limit(12).lean();
}

export async function getStylistReply({ message, history = [] }) {
  if (!openai) {
    const err = new Error("AI provider not configured");
    err.status = 501;
    throw err;
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.text })),
    { role: "user", content: message },
  ];

  let choice;
  let products = [];
  let usedFallback = false;
  let replyText = "";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      tools: [searchProductsTool],
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 300,
    });

    choice = completion.choices[0];
    const toolCall = choice.message.tool_calls?.[0];

    if (toolCall && toolCall.function?.name === "search_products") {
      let args = {};
      try {
        args = JSON.parse(toolCall.function.arguments || "{}");
      } catch {
        args = {};
      }
      products = await runProductSearch(args);
      usedFallback = products.length === 0;
    }

    replyText = choice.message.content || "Here are some options I found for you.";

    if (!replyText && choice?.message) {
      const followUp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          ...messages,
          choice.message,
          {
            role: "tool",
            tool_call_id: choice.message.tool_calls?.[0]?.id,
            content: JSON.stringify(products.slice(0, 3).map((p) => p.title)),
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      });
      replyText = followUp.choices[0].message.content;
    }
  } catch (error) {
    const status = error?.response?.status || error?.status;
    if (status === 429) {
      products = await fallbackSearch(message);
      usedFallback = true;
      replyText = `I hit a temporary AI limit, so I pulled some products directly from the catalog for "${message}".`;
    } else {
      throw error;
    }
  }

  return { reply: replyText, products, usedFallback };
}