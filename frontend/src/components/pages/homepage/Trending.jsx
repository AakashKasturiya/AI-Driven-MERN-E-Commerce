export const Trending = () => {
  return (
    <>
      <section className="bg-beige py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-medium-gray">
              Curated For You
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mt-3 leading-tight">
              Trending<br></br>
              <span className="italic font-normal">Now</span>
            </h2>
          </div>
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-charcoal font-medium text-sm group whitespace-nowrap"
          >
            <span className="border-b border-charcoal pb-0.5">View All</span>
            <i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-1"></i>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <div
            className="group cursor-pointer"
            style={{opacity: 1, transform: "none"}}
          >
            <div className="bg-morandi-pink rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  alt="Silk Charmeuse Blouse"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  src="https://readdy.ai/api/search-image?query=elegant%20silk%20charmeuse%20blouse%20in%20soft%20blush%20pink%20color%20on%20minimalist%20light%20pink%20background%20high%20end%20fashion%20product%20photography%20studio%20lighting%20clean%20composition&amp;width=600&amp;height=700&amp;seq=1&amp;orientation=portrait"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  New Arrival
                </span>
              </div>
              <div className="bg-white p-4 md:p-5">
                <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
                  Tops
                </span>
                <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mt-1 group-hover:text-coral transition-colors">
                  Silk Charmeuse Blouse
                </h3>
                <p className="text-charcoal font-medium mt-2">$189</p>
              </div>
            </div>
          </div>
          <div
            className="group cursor-pointer"
            style={{opacity: 1, transform: "none"}}
          >
            <div className="bg-morandi-mint rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  alt="Linen Wide-Leg Trousers"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  src="https://readdy.ai/api/search-image?query=minimalist%20linen%20wide%20leg%20trousers%20in%20sage%20green%20color%20flat%20lay%20on%20soft%20mint%20green%20background%20fashion%20product%20photography%20clean%20studio%20lighting&amp;width=600&amp;height=700&amp;seq=2&amp;orientation=portrait"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Bestseller
                </span>
              </div>
              <div className="bg-white p-4 md:p-5">
                <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
                  Bottoms
                </span>
                <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mt-1 group-hover:text-coral transition-colors">
                  Linen Wide-Leg Trousers
                </h3>
                <p className="text-charcoal font-medium mt-2">$245</p>
              </div>
            </div>
          </div>
          <div
            className="group cursor-pointer"
            style={{opacity: 1, transform: "none"}}
          >
            <div className="bg-morandi-gray rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  alt="Cashmere Turtleneck"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  src="https://readdy.ai/api/search-image?query=luxury%20cashmere%20turtleneck%20sweater%20in%20light%20heather%20gray%20folded%20neatly%20on%20soft%20light%20gray%20background%20high%20end%20fashion%20product%20photography%20studio%20lighting&amp;width=600&amp;height=700&amp;seq=3&amp;orientation=portrait"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Seasonal
                </span>
              </div>
              <div className="bg-white p-4 md:p-5">
                <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
                  Knitwear
                </span>
                <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mt-1 group-hover:text-coral transition-colors">
                  Cashmere Turtleneck
                </h3>
                <p className="text-charcoal font-medium mt-2">$320</p>
              </div>
            </div>
          </div>
          <div
            className="group cursor-pointer"
            style={{opacity: 1, transform: "none"}}
          >
            <div className="bg-morandi-warm rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  alt="Merino Wool Coat"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  src="https://readdy.ai/api/search-image?query=%20premium%20merino%20wool%20overcoat%20in%20camel%20tan%20color%20elegant%20drape%20on%20warm%20beige%20background%20fashion%20product%20photography%20clean%20studio%20lighting%20minimalist%20composition&amp;width=600&amp;height=700&amp;seq=4&amp;orientation=portrait"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Limited
                </span>
              </div>
              <div className="bg-white p-4 md:p-5">
                <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
                  Outerwear
                </span>
                <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mt-1 group-hover:text-coral transition-colors">
                  Merino Wool Coat
                </h3>
                <p className="text-charcoal font-medium mt-2">$485</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
