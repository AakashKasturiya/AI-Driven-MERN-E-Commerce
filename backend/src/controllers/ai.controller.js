import { getStylistReply } from "../services/aiStylist.service.js";

export const stylistChat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    const { reply, products, usedFallback } = await getStylistReply({
      message: message.trim(),
      history: Array.isArray(history) ? history : [],
    });

    return res.status(200).json({ success: true, reply, products, usedFallback });
  } catch (error) {
    const status = error.status || 500;

    if (status === 501) {
      return res.status(501).json({ success: false, message: "AI stylist not configured." });
    }

    // OpenAI quota/rate-limit — surface as 501 too, so your existing frontend
    // fallback (searchDummyProducts) kicks in instead of showing a raw API error
    if (status === 429) {
      console.error("[ai] OpenAI quota/rate limit hit:", error.message);
      return res.status(501).json({ success: false, message: "AI stylist temporarily unavailable." });
    }

    console.error("[ai] stylistChat error:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};