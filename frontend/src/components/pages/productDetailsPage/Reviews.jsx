import { Link } from "react-router-dom";
import { useState } from "react";
import { useTimeFormate } from "../../../hooks/useTimeFormate";
import { useCategory } from "../../../hooks/useCategory";

export const Reviews = ({product}) => {
  const [reviewsToggle, setReviewsToggle] = useState(false);

  const formatRelativeDate = useTimeFormate;

  const { products } = useCategory(product.category);

  const startingFourProducts = (products || [])
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, 4);

  return (
    <>
      <div className="mt-20">
        <div className="flex items-center gap-6 border-b border-gray-100 mb-8">
          <button
            onClick={() => setReviewsToggle(false)}
            className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${reviewsToggle ? "text-medium-gray border-transparent hover:text-charcoal" : "text-charcoal border-charcoal"}`}
          >
            {/* Reviews ({product.reviews?.length || 0}) */}
          </button>
          <button
            onClick={() => setReviewsToggle(true)}
            className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${reviewsToggle ? "text-charcoal border-charcoal" : "text-medium-gray border-transparent hover:text-charcoal"}`}
          >
            You May Also Like
          </button>
        </div>

        {reviewsToggle ? (

        <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            style={{ opacity: 1, transform: "none" }}
          >
            {startingFourProducts?.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="text-left group shadow-sm rounded-xl border border-1 border-gray-200 overflow-hidden">
              <div className=" aspect-[2/2] bg-orange-50   overflow-hidden mb-3">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  src={product.thumbnail}
                />
              </div>
              <div className="p-4">
              <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
                {product.category}
              </span>
              <p className="font-serif text-sm font-semibold text-charcoal mt-0.5 group-hover:text-coral transition-colors truncate">
                {product.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-charcoal font-medium">${product.price}</span>
              </div>
              </div>
            </Link>
            ))}
          </div>

        ) : (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ opacity: 1, transform: "none" }}
          >
            {/* {product.reviews.map((review) => (
              <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-semibold">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
                    {review.reviewerName}
                  </span>
                </div>
                <span className="text-xs text-medium-gray">{formatRelativeDate(review.date)}</span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <i key={idx} className="text-xs ri-star-fill text-coral"></i>
                ))}
              </div>
              <p className="text-sm text-medium-gray leading-relaxed">
                {review.comment}
              </p>
            </div>
            ))} */}
          </div>
        )}
      </div>
    </>
  );
};
