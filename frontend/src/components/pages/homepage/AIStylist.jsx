export const AIStylist = () => {
  return (
    <>
      <section className="bg-white py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-medium-gray border border-gray-200 px-4 py-2 rounded-full mb-10">
            AI Powered
          </span>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-[40%]" style={{opacity:1, transform: "none"}}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
                Your Personal<br></br>
                <span className="font-normal text-medium-gray">AI Stylist</span>
              </h2>
              <p className="text-medium-gray text-base leading-relaxed mt-8 max-w-sm">
                Chat with our intelligent fashion assistant. Get outfit
                recommendations, styling advice, size guidance, and discover
                pieces that match your unique aesthetic — all in real-time
                conversation.
              </p>
              <a
                href="/ai-stylist"
                className="inline-flex items-center gap-2 mt-8 text-charcoal font-medium text-sm group"
              >
                <span className="border-b border-charcoal pb-0.5">
                  Try AI Stylist
                </span>
                <i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
            <div
              className="lg:w-[55%] lg:ml-auto"
              style={{opacity:1, transform: "none"}}
            >
              <div className="flex gap-10 md:gap-16 mb-8 justify-end">
                <div className="text-right">
                  <p className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
                    94%
                  </p>
                  <p className="text-medium-gray text-xs uppercase tracking-wider mt-1">
                    Style Match
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
                    2M+
                  </p>
                  <p className="text-medium-gray text-xs uppercase tracking-wider mt-1">
                    Outfits Curated
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[480px]">
                <div className="absolute top-0 left-0 w-[55%] aspect-square rounded-2xl overflow-hidden">
                  <img
                    alt="AI curated fashion styling flat lay"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    src="https://readdy.ai/api/search-image?query=minimalist%20fashion%20flat%20lay%20styling%20session%20overhead%20view%20curated%20clothing%20items%20neutrals%20beige%20cream%20soft%20aesthetic%20editorial%20fashion%20photography%20clean%20composition&amp;width=500&amp;height=500&amp;seq=12&amp;orientation=squarish"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-[65%] aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    alt="Woman trying on clothes in boutique"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    src="https://readdy.ai/api/search-image?query=elegant%20woman%20trying%20on%20clothes%20in%20modern%20boutique%20mirror%20reflection%20soft%20natural%20lighting%20minimalist%20interior%20warm%20tones%20fashion%20editorial%20photography&amp;width=500&amp;height=650&amp;seq=13&amp;orientation=portrait"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
