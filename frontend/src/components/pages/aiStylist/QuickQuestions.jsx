export const QuickQuestions = ({ sendQuery }) => {
  const questions = [
    { label: "Show me men check shirts", query: "Show me men check shirt collection" },
    { label: "Dresses under $100 ", query: "Find a nice dress under $100" },
    { label: "Trendy sneakers & shoes", query: "Recommend some trendy shoes" },
    { label: "Watches under $300", query: "What are the best watches under $300?" },
    { label: "Casual styling shirts", query: "Casual shirts for styling" },
    { label: "Luxury jewellery items", query: "Show me luxury jewellery recommendations" }
  ];

  return (
    <>
      <div
        className="px-6 md:px-10 pb-3 shrink-0 animate-in"
        style={{ opacity: 1, transform: "none" }}
      >
        <p className="text-[10px] uppercase tracking-wider text-medium-gray mb-2.5">
          Quick questions
        </p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => void sendQuery(q.query)}
              className="px-3.5 py-2 bg-white border border-gray-200 rounded-full text-xs text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white transition-all duration-200 cursor-pointer"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};