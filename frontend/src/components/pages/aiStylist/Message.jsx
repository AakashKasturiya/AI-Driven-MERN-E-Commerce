export const Message = ({loading, messages, formatTime}) =>{
    return(
        <>
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 space-y-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                style={{ opacity: 1, transform: "none" }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    m.role === "user" ? "bg-gray-100" : "bg-charcoal"
                  }`}
                >
                  <i
                    className={`${
                      m.role === "user" ? "ri-user-3-line text-charcoal" : "ri-sparkling-line text-white"
                    } text-sm`}
                  />
                </div>
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3.5 border text-charcoal ${
                    m.role === "user"
                      ? "bg-charcoal text-white border-charcoal rounded-tr-sm"
                      : "bg-white border-gray-100 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {m.text}
                  </p>
                  <p
                    className={`text-[10px] mt-1.5 ${
                      m.role === "user" ? "text-white/70" : "text-medium-gray"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex gap-3 flex-row" style={{ opacity: 1, transform: "none" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-charcoal">
                  <i className="ri-sparkling-line text-white text-sm" />
                </div>
                <div className="max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3.5 bg-white border border-gray-100 text-charcoal rounded-tl-sm">
                  <p className="text-sm leading-relaxed whitespace-pre-line">Thinking…</p>
                  <p className="text-[10px] mt-1.5 text-medium-gray">{formatTime()}</p>
                </div>
              </div>
            ) : null}
          </div>
        </>
    )
}