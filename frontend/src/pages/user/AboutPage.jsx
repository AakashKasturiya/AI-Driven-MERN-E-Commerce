import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <>
      <main className="pt-16 md:pt-20">
        <section className="relative w-full h-[420px] md:h-[560px] flex items-center">
          <img
            alt="AI-Powered Fashion Discovery"
            title="MODA AI Style Studio - Personalized Fashion Recommendations"
            className="absolute inset-0 w-full h-full object-cover object-top"
            src="https://readdy.ai/api/search-image?query=An%20artistic%20abstract%20fashion%20technology%20concept%20image%20with%20flowing%20fabric%20shapes%20in%20warm%20earth%20tones%20merging%20with%20subtle%20digital%20data%20visualization%20patterns%2C%20soft%20golden%20lighting%20creating%20a%20futuristic%20yet%20warm%20atmosphere%2C%20elegant%20compositions%20showing%20the%20intersection%20of%20fashion%20and%20artificial%20intelligence%2C%20clean%20sophisticated%20aesthetic%20with%20organic%20and%20technological%20elements%20blending%20together&amp;width=1800&amp;height=1000&amp;seq=42&amp;orientation=landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/40"></div>
          <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">
            <div className="max-w-2xl">
              <p className="text-white/60 text-sm font-light tracking-widest uppercase mb-4">
                Artificial Intelligence
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-['Cormorant_Garamond'] font-semibold text-white leading-tight mb-4">
                Your Personal
                <br />
                AI Style Studio
              </h1>
              <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-lg">
                Take our quick style quiz and let our AI curate a collection
                that feels like it was handpicked just for you. No two
                recommendations are ever the same.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-stone-50 py-16 md:py-24">
          <div className="px-6 md:px-10 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-['Cormorant_Garamond'] font-semibold text-stone-900">
                How Our{" "}
                <span className="italic font-normal text-stone-500">
                  AI Style Engine
                </span>{" "}
                Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                  <i className="ri-question-answer-line text-xl md:text-2xl text-stone-700" />
                </div>
                <h4 className="text-sm font-semibold text-stone-900 mb-2">
                  Answer 4 Quick Questions
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Tell our AI about your style preferences — colors,
                  silhouettes, and what matters most to you.
                </p>
                <div className="hidden lg:block absolute top-8 -right-4 text-stone-300">
                  <i className="ri-arrow-right-line" />
                </div>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                  <i className="ri-brain-line text-xl md:text-2xl text-stone-700" />
                </div>
                <h4 className="text-sm font-semibold text-stone-900 mb-2">
                  AI Analyzes Your Style DNA
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Our recommendation engine processes your answers to build a
                  unique style profile just for you.
                </p>
                <div className="hidden lg:block absolute top-8 -right-4 text-stone-300">
                  <i className="ri-arrow-right-line" />
                </div>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                  <i className="ri-sparkling-line text-xl md:text-2xl text-stone-700" />
                </div>
                <h4 className="text-sm font-semibold text-stone-900 mb-2">
                  Get Personalized Picks
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Browse a curated collection of pieces handpicked by AI based
                  on your unique style signature.
                </p>
                <div className="hidden lg:block absolute top-8 -right-4 text-stone-300">
                  <i className="ri-arrow-right-line" />
                </div>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                  <i className="ri-refresh-line text-xl md:text-2xl text-stone-700" />
                </div>
                <h4 className="text-sm font-semibold text-stone-900 mb-2">
                  It Gets Smarter
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  The more you interact and shop, the better our AI understands
                  you. Your recommendations evolve with you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-16 md:py-24">
          <div className="px-6 md:px-10 max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-stone-100 text-stone-700 text-xs font-medium rounded-full mb-6">
              AI Style Studio
            </span>
            <h2 className="text-2xl md:text-4xl font-['Cormorant_Garamond'] font-semibold text-stone-900 leading-tight">
              Let Our AI Discover
              <br />
              Your{" "}
              <span className="italic font-normal text-stone-500">
                Style DNA
              </span>
            </h2>
            <p className="mt-4 text-stone-500 text-base leading-relaxed max-w-lg mx-auto">
              Answer four quick questions and our AI will analyze your
              preferences to curate a personalized collection just for you. It
              takes less than 60 seconds.
            </p>
            <Link to="/ai-stylist" class="mt-8 md:mt-10 inline-flex items-center bg-black rounded-full pl-6 pr-5 py-3 gap-3 group" style={{opacity: 1, transform: "none"}}>
            <span class="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
              <i class="ri-shopping-bag-line text-white text-sm"></i>
              </span>
              <span class="text-white text-sm font-medium uppercase tracking-wider">Start Shopping with AI</span>
              <i class="ri-arrow-right-up-line text-white text-lg ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
