export const AIHeader = () => {
  return (
    <>
      <div className="px-6 md:px-10 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm flex items-center gap-4 shrink-0">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center">
            <i className="ri-sparkling-line text-white text-lg" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h1 className="font-serif text-lg font-semibold text-charcoal">
            VELORA AI Stylist
          </h1>
          <p className="text-xs text-medium-gray">
            Online — Ready to style you
          </p>
        </div>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-medium-gray bg-gray-50 px-3 py-1.5 rounded-full">
            94% Style Match
          </span>
        </div>
      </div>
    </>
  );
};
