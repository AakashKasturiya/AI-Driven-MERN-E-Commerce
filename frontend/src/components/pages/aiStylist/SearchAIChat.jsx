export const SearchAIChat = ({onSubmit, input, loading, setInput, canSend}) =>{
    return(
        <>
        <div className="px-4 md:px-6 py-4 border-t border-gray-100 bg-white shrink-0">
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-100 focus-within:border-charcoal/30 transition-colors"
            >
              <i className="ri-sparkling-line text-medium-gray text-lg" />
              <input
                placeholder="Ask your AI stylist anything..."
                className="flex-1 bg-transparent text-sm text-charcoal placeholder-medium-gray outline-none"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!canSend}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  canSend
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-white text-medium-gray border-gray-200"
                }`}
              >
                Send
              </button>
            </form>
            <p className="text-center text-[10px] text-medium-gray mt-2">
              AI responses are generated based on your style profile and current
              trends
            </p>
          </div>
        </>
    )
}