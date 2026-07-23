export const SmarterFashion = () => {
  return (
    <>
      <section
        className="bg-beige py-20 md:py-28 px-6 md:px-12 lg:px-16"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-14 md:mb-20">
            <div className="md:w-48">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-medium-gray leading-relaxed">
                VELORA<br></br>INTELLIGENCE
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight md:text-center md:flex-1">
              Smarter Fashion<br></br>
              <span className="italic font-normal">Every Day</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div
              className="bg-charcoal rounded-2xl p-6 md:p-8 min-h-[320px] md:min-h-[380px] flex flex-col"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-auto">
                <span className="text-white text-sm font-bold">01</span>
              </div>
              <div>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-white mt-4">
                  Style DNA Analysis
                </h3>
                <p className="text-sm mt-3 leading-relaxed opacity-70 text-white">
                  Our AI studies your preferences, body type, and style history
                  to create your unique fashion profile.
                </p>
              </div>
            </div>
            <div
              className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] md:min-h-[380px] flex flex-col"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-auto">
                <span className="text-charcoal text-sm font-bold">02</span>
              </div>
              <div>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-charcoal mt-4">
                  Smart Fit Predictor
                </h3>
                <p className="text-sm mt-3 leading-relaxed opacity-70 text-charcoal">
                  No more guessing sizes. Our algorithm predicts your perfect
                  fit across brands with 94% accuracy.
                </p>
              </div>
            </div>
            <div
              className="bg-beige rounded-2xl p-6 md:p-8 min-h-[320px] md:min-h-[380px] flex flex-col"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-auto">
                <span className="text-charcoal text-sm font-bold">03</span>
              </div>
              <div>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-charcoal mt-4">
                  Trend Forecast Engine
                </h3>
                <p className="text-sm mt-3 leading-relaxed opacity-70 text-charcoal">
                  Stay ahead of fashion curves with AI-powered trend predictions
                  tailored to your personal style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
