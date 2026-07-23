import Swal from "sweetalert2";

export const CartCard = ({item, update, remove}) =>{
   
    const deleteCartItem = async () => {
  const result = await Swal.fire({
    title: "Remove Item?",
    text: "Are you sure you want to remove this item from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Remove",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await remove(item._id);

    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "Product removed from cart.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: error.response?.data?.message || "Something went wrong.",
    });
  }
};

    return(
        <>
        <div
              className="flex gap-4 md:gap-6 pb-8 mb-8 border-b border-gray-100"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="w-24 h-28 md:w-32 md:h-40 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                <img
                  alt={item.product.title}
                  className="w-full h-full object-cover object-top"
                  src={item.product.thumbnail}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
                      {item.product.brand}
                    </span>
                    <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mt-0.5">
                      {item.product.title}
                    </h3>
                  </div>
                  <button  onClick={deleteCartItem}
                    className="w-8 h-8 flex items-center justify-center text-medium-gray hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove item"
                  >
                    <i className="ri-delete-bin-line text-lg" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-2 text-sm text-medium-gray">
                  <span>Rating: <i className="ri-star-fill text-yellow-400"></i> {item.product.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => item.quantity > 1 && update(item._id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <i className="ri-subtract-line" />
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-charcoal border-x border-gray-200">
                        {item.quantity}
                    </span>
                    <button onClick={() =>update(item._id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity">
                      <i className="ri-add-line" />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-charcoal text-base">
                        ${item.product.discountPrice}
                    </span>
                    <span className="block text-sm text-medium-gray line-through">
                       ${item.product.price} 
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}