import { useState, useMemo } from "react";
import { askShoppingAssistant } from "../../../api/aiAssistant";

export const AiShoppingAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I can help you find products, check your order status, or add items to your cart. What do you need?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);
  const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendMessage = async (text) => {
    const query = String(text ?? "").trim();
    if (!query || loading) return;

    setInput("");
    setLoading(true);

    const userMessage = { id: `u_${Date.now()}`, role: "user", text: query, time: formatTime() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await askShoppingAssistant(
        query,
        messages.map((m) => ({ role: m.role, text: m.text }))
      );

      const { reply, actionsTaken } = res.data;

      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: "assistant", text: reply, time: formatTime() },
      ]);

      if (actionsTaken?.length) {
        actionsTaken.forEach((action) => {
          if (action.type === "add_to_cart") {
            // Hook into your real cart state/refresh here, e.g.:
            // dispatch(refreshCart()) or queryClient.invalidateQueries(['cart'])
            window.dispatchEvent(new CustomEvent("cart:updated"));
          }
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          text:
            err?.response?.status === 501
              ? "The shopping assistant isn't available right now."
              : "Something went wrong. Please try again.",
          time: formatTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-charcoal text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <i className={`${open ? "ri-close-line" : "ri-message-3-line"} text-xl`}></i>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[340px] max-h-[480px] bg-white rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center">
              <i className="ri-shopping-bag-3-line text-white text-sm" />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">Shopping Assistant</p>
              <p className="text-[10px] text-medium-gray">Ask about products, orders, cart</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
                    m.role === "user"
                      ? "bg-charcoal text-white rounded-tr-sm"
                      : "bg-gray-50 text-charcoal rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 text-charcoal rounded-2xl rounded-tl-sm px-3 py-2 text-xs">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="p-3 border-t border-gray-100 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading}
              className="flex-1 bg-gray-50 rounded-full px-3 py-2 text-xs outline-none"
            />
            <button
              type="submit"
              disabled={!canSend}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                canSend ? "bg-charcoal text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              <i className="ri-send-plane-fill text-xs"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};