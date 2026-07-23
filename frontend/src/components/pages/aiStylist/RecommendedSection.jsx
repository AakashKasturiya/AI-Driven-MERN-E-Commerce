import { Link } from "react-router-dom";
export const RecommendedSection = ({ error, recommendedProducts }) => {

  console.log("recom:", recommendedProducts);

  return (
    <>
      <div className="p-6 xl:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Recommended For You
          </h2>
        </div>
        {error ? (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700">
            Failed to load recommendations. Please try again.
          </div>
        ) : null}

        {recommendedProducts.length ? (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {recommendedProducts.map((p) => (
              <div key={p.id} style={{ opacity: 1, transform: "none" }}>
                <div className="relative flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  {/* View Product */}
                  <div className="absolute inset-x-0 top-0 p-4">
                    <Link
                      to={`/product/${p.id}`}
                      className="w-full text-sm font-medium py-3 flex items-center justify-end gap-2"
                    >
                      <i className="ri-eye-line" />
                      View Product
                    </Link>
                  </div>
                  <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                    <img
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      src={p.thumbnail}
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-[10px] uppercase tracking-wider text-medium-gray font-medium">
                      {String(p.category || "")}
                    </p>
                    <h3 className="font-serif text-sm font-semibold text-charcoal mt-0.5 group-hover:text-coral transition-colors truncate">
                      {p.title}
                    </h3>
                    <p className="text-sm font-medium text-charcoal mt-1">
                      ${p.price}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <i className="ri-star-fill text-coral text-xs"></i>
                      <span className="text-xs text-medium-gray">
                        {Number(p.rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <i className="ri-t-shirt-line text-2xl text-medium-gray" />
            </div>
            <p className="text-sm font-medium text-charcoal">
              Start a conversation
            </p>
            <p className="text-xs text-medium-gray mt-1 max-w-xs mx-auto leading-relaxed">
              Ask your AI stylist for recommendations and matching pieces will
              appear here
            </p>
          </div>
        )}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-medium-gray mb-4">
            Style Tips
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <i className="ri-palette-line text-charcoal text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">
                  Color Theory
                </p>
                <p className="text-xs text-medium-gray mt-0.5">
                  Stick to 3 colors per outfit for a cohesive look
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <i className="ri-scissors-line text-charcoal text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">Fit First</p>
                <p className="text-xs text-medium-gray mt-0.5">
                  Tailoring transforms off-the-rack into custom-fit
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <i className="ri-stack-line text-charcoal text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">Layering</p>
                <p className="text-xs text-medium-gray mt-0.5">
                  Texture mixing (silk + wool) adds instant depth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
