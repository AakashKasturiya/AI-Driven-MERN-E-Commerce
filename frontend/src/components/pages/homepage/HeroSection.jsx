import { Link } from "react-router-dom"

export const HeroSection = () =>{
    return(
        <>
      <section className="relative bg-ivory min-h-screen">
        <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className="lg:w-1/2 pt-8 lg:pt-16">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-charcoal leading-[1.05] tracking-tight">
                Fashion
               <br></br>
                  <span className="italic font-normal">Reimagined</span>
               <br></br>
                By AI
              </h1>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-end lg:pt-32">
              <p className="text-medium-gray text-base md:text-lg leading-relaxed max-w-md">
                Discover clothing curated by intelligent algorithms that
                understand your style, your body, and your mood. Welcome to the
                future of personal fashion.
              </p>
              <Link to="/collections"
                className="inline-flex items-center gap-2 mt-6 text-charcoal font-medium text-sm group"
              >
                <span className="border-b border-charcoal pb-0.5">
                  Explore Collection
                </span>
                <i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-1"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-6 md:px-12 lg:px-16 mt-8 md:mt-12 pb-12">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden">
            <img
              alt="Fashion editorial - woman in minimalist beige outfit"
              className="w-full h-full object-cover object-top"
              loading="eager"
              src="https://readdy.ai/api/search-image?query=editorial%20fashion%20photography%20wide%20shot%20elegant%20woman%20in%20minimalist%20beige%20and%20cream%20outfit%20walking%20in%20sunlit%20white%20gallery%20space%20high%20fashion%20editorial%20style%20soft%20natural%20lighting%20cinematic%20composition&amp;width=1400&amp;height=600&amp;seq=11&amp;orientation=landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>
        </>
    )
}