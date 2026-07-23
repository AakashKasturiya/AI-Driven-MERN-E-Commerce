export const Navigation = () => {
  return (
    <>
      <nav
        className="pt-24 md:pt-28 pb-4 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto text-xs text-medium-gray"
        style="opacity: 1;"
      >
        <div className="flex items-center gap-2">
          <a
            className="hover:text-charcoal transition-colors"
            href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706"
            data-discover="true"
          >
            Home
          </a>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <a
            className="hover:text-charcoal transition-colors"
            href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products"
            data-discover="true"
          >
            Shop
          </a>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <a
            className="hover:text-charcoal transition-colors"
            href="/preview/379a9a38-f7b6-4123-a266-d0d1f595b015/10117706/products?category=Tops"
            data-discover="true"
          >
            Tops
          </a>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <span className="text-charcoal">Silk Charmeuse Blouse</span>
        </div>
      </nav>
    </>
  );
};
