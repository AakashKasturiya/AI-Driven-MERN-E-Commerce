import { Link } from "react-router-dom";

export const Discover = () => {
  return (
    <>
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="Fashion editorial - woman in flowing dress at golden hour"
            className="w-full h-full object-cover object-top"
            loading="lazy"
            src="https://readdy.ai/api/search-image?query=immersive%20fashion%20editorial%20photography%20woman%20in%20flowing%20neutral%20toned%20dress%20walking%20through%20warm%20sunlit%20golden%20hour%20field%20soft%20natural%20lighting%20cinematic%20wide%20shot%20high%20fashion%20editorial%20warm%20earth%20tones&amp;width=1400&amp;height=750&amp;seq=14&amp;orientation=landscape"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h2
            className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-widest leading-tight"
            style={{ opacity: 1, transform: "none" }}
          >
            Discover Your<br></br>Perfect Style
          </h2>
          <p
            className="text-white/80 text-sm md:text-base mt-4 md:mt-6 max-w-md leading-relaxed"
            style={{ opacity: 1, transform: "none" }}
          >
            Let our AI curate a wardrobe that feels uniquely you.
            <br className="hidden md:block"></br>Personalized, intelligent,
            effortless.
          </p>
          <Link to="/collections"
  
            className="mt-8 md:mt-10 inline-flex items-center bg-black rounded-full pl-6 pr-5 py-3 gap-3 group"
            style={{ opacity: 1, transform: "none" }}
          >
            <span className="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
              <i className="ri-shopping-bag-line text-white text-sm"></i>
            </span>
            <span className="text-white text-sm font-medium uppercase tracking-wider">
              Start Shopping
            </span>
            <i className="ri-arrow-right-up-line text-white text-lg ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </Link>
        </div>
      </section>
    </>
  );
};
