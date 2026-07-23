import { ProductIncrmentDecrement } from "./ProductIncrmentDecrement";
import { AccordionDetails } from "./AccordionDetails";
import { useWishlistToggle } from "../../../hooks/useWishlistToggle";
import { useState } from "react";
import { Modal } from "../../common/Modal";

export const ProductDetail = ({ product }) => {
  const [isModal, setIsModal] = useState(false);

  // ✅ MongoDB _id
  const { isInWishlist, toggle } = useWishlistToggle(product?._id);

  const modalToggleHandler = () => {
    setIsModal(!isModal);
  };

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = product?.title
    ? `Check out this product: ${product.title}`
    : "";

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(`${shareTitle} ${pageUrl}`.trim());

  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const copyLink = async () => {
    if (!pageUrl) return;

    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = pageUrl;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="flex flex-col">

      <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium mb-2">
        {product?.brand}
      </span>

      <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-charcoal leading-tight mb-3">
        {product?.title}
      </h1>

      <div className="flex items-baseline gap-3 mb-6">
        <span className="font-serif text-2xl font-semibold text-charcoal">
          ${product?.price}
        </span>
      </div>

      <p className="text-sm text-medium-gray leading-relaxed mb-8">
        {product?.description}
      </p>

      <ProductIncrmentDecrement product={product} />

      <div className="flex items-center gap-4 mb-10">

        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-2 text-sm text-charcoal hover:text-coral transition-colors"
        >
          <i
            className={
              isInWishlist
                ? "ri-heart-fill text-red-500 text-lg"
                : "ri-heart-line text-lg"
            }
          />

          {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
        </button>

        <button
          type="button"
          onClick={modalToggleHandler}
          className="flex items-center gap-2 text-sm text-charcoal hover:text-coral transition-colors"
        >
          <i className="ri-share-line text-lg" />
          Share
        </button>

      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-10 flex items-start gap-3">
        <i className="ri-truck-line text-charcoal text-lg mt-0.5" />

        <div>
          <p className="text-sm font-medium text-charcoal">
            {product?.warrantyInformation}
          </p>

          <p className="text-xs text-medium-gray mt-0.5">
            {product?.shippingInformation}
          </p>
        </div>
      </div>

      <AccordionDetails product={product} />

      {/* {isModal && (
        <Modal
          modalToggleHandler={modalToggleHandler}
          copyLink={copyLink}
          whatsappUrl={whatsappUrl}
          twitterUrl={twitterUrl}
          facebookUrl={facebookUrl}
        />
      )} */}
    </div>
  );
};