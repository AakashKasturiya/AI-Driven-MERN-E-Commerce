export const Footer = () => {
  return (
    <>
      <footer className="bg-dark-bg text-white rounded-t-2xl mx-4 md:mx-6 mt-20">
        <div className="px-8 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="lg:col-span-1">
              <h3 className="font-serif text-2xl font-semibold mb-4">VELORA</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                AI-powered fashion discovery. Personalized recommendations,
                intelligent inventory, and your own virtual stylist.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
                Shop
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products"
                    data-discover="true"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products"
                    data-discover="true"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products"
                    data-discover="true"
                  >
                    Bestsellers
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products"
                    data-discover="true"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products"
                    data-discover="true"
                  >
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
                Help
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                    href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/about"
                    data-discover="true"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
                    Shipping &amp; Returns
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
                    Size Guide
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
                    FAQ
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
                    Contact
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Get AI-curated drops and exclusive offers.
              </p>
              <form className="flex items-center gap-2">
                <input
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/40 transition-colors"
                  type="email"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-white text-dark-bg rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <i className="ri-arrow-right-line text-lg"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              © 2026 VELORA. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <i className="ri-twitter-x-line text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <i className="ri-pinterest-line text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <i className="ri-tiktok-line text-lg"></i>
              </a>
            </div>
          </div>
          <div className="mt-8 overflow-hidden">
            <p className="font-serif text-[80px] md:text-[120px] lg:text-[160px] font-bold text-white/[0.03] leading-none tracking-tighter select-none whitespace-nowrap">
              VELORA
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
