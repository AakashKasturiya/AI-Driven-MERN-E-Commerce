import { useMemo, useState } from "react";
import { askAiStylist } from "../../api/aiStylist";
import { getProducts } from "../../api/products";
import { RecommendedSection } from "../../components/pages/aiStylist/RecommendedSection";
import { AIHeader } from "../../components/pages/aiStylist/AIHeader";
import { Message } from "../../components/pages/aiStylist/Message";
import { QuickQuestions } from "../../components/pages/aiStylist/QuickQuestions";
import { SearchAIChat } from "../../components/pages/aiStylist/SearchAIChat";

export const AiStylistPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Welcome to VELORA AI Stylist! I'm here to be your personal fashion advisor. Ask me about outfits for any occasion, sizing help, trend insights, or building your dream wardrobe. What are we styling today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const buildAssistantReply = ({ query, products, usedFallback }) => {
    const items = Array.isArray(products) ? products : [];
    if (!items.length) {
      return `I couldn't find matching products for "${query}". Try describing the item (e.g. "black dress", "running shoes") or an occasion (e.g. "dinner party outfit").`;
    }

    const top = items.slice(0, 3);
    const titles = top.map((p) => p?.title).filter(Boolean);
    const titleLine = titles.length
      ? `Here are a few picks: ${titles.join(", ")}.`
      : "Here are a few picks for you.";
    return usedFallback
      ? `I interpreted "${query}" as a broad styling prompt, so I pulled some trending picks to get us started. ${titleLine} Tell me your budget + preferred colors and I'll narrow it down.`
      : `Based on "${query}", ${titleLine} I've shown matching items on the right — tell me your budget and preferred colors and I'll refine it.`;
  };

  const sendQuery = async (text) => {
    const query = String(text ?? "").trim();
    if (!query || loading) return;

    setError(null);
    setLoading(true);
    setInput("");

    const userMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      text: query,
      time: formatTime(),
    };

    // Build history from messages BEFORE this turn, so the backend gets prior context
    const historyForRequest = messages.map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMessage]);

    try {
      let aiReply = "";
      let products = [];
      let usedFallback = false;

      try {
        const aiRes = await askAiStylist(query, historyForRequest);
        aiReply = String(aiRes?.data?.reply || "").trim();
        products = Array.isArray(aiRes?.data?.products) ? aiRes.data.products : [];
        usedFallback = Boolean(aiRes?.data?.usedFallback);
      } catch (aiErr) {
        const status = aiErr?.response?.status;
        if (status && status !== 501) {
          throw aiErr;
        }

        const res = await getProducts({ search: query, limit: 12 });
        let dbProducts = Array.isArray(res?.data?.products) ? res.data.products : [];

        if (!dbProducts.length) {
          const fallbackRes = await getProducts({ limit: 12 });
          dbProducts = Array.isArray(fallbackRes?.data?.products)
            ? fallbackRes.data.products
            : [];
          usedFallback = true;
        }

        products = dbProducts.map((p) => ({
          id: p._id || p.id,
          title: p.title,
          thumbnail: p.thumbnail,
          price: p.discountPrice > 0 && p.discountPrice < p.price ? p.discountPrice : p.price,
          category: p.category,
          rating: p.rating ?? 4.5,
        }));

        aiReply = buildAssistantReply({ query, products, usedFallback });
      }

      setRecommendedProducts(products);

      const assistantMessage = {
        id: `a_${Date.now()}`,
        role: "assistant",
        text: aiReply || buildAssistantReply({ query, products, usedFallback }),
        time: formatTime(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      setError(e);
      const assistantMessage = {
        id: `a_${Date.now()}`,
        role: "assistant",
        text: "Something went wrong while fetching product recommendations. Please try again.",
        time: formatTime(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    void sendQuery(input);
  };

  return (
    <main className="pt-16 md:pt-20 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col min-w-0 lg:max-w-[60%] xl:max-w-[55%]">
        <AIHeader />
        <Message loading={loading} messages={messages} formatTime={formatTime} />
        <QuickQuestions sendQuery={sendQuery} />
        <SearchAIChat
          onSubmit={onSubmit}
          input={input}
          loading={loading}
          setInput={setInput}
          canSend={canSend}
        />
      </div>
      <div className="w-full lg:w-[40%] xl:w-[45%] border-t lg:border-t-0 lg:border-l border-gray-100 bg-white overflow-y-auto">
        <RecommendedSection error={error} recommendedProducts={recommendedProducts} />
      </div>
    </main>
  );
};