export const CartHeader = ({ items }) => {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-charcoal">
        Shopping Cart
      </h1>

      <p className="text-medium-gray mt-2">
        {items.length} item{items.length !== 1 ? "s" : ""} in your cart
      </p>
    </div>
  );
};