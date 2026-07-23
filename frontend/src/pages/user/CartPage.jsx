import { CartCard } from "../../components/pages/cartPage/CartCard";
import { CartHeader } from "../../components/pages/cartPage/CartHeader";
import { EmptyCart } from "../../components/pages/cartPage/EmptyCart";
import { useCart } from "../../hooks/useCart";
import { CartSummary} from "../../components/pages/cartPage/CartSummary";

export const CartPage = () => {
  const {
    items,
    loading,
    update,
    remove,
  } = useCart();

  if (loading) {
    return (
      <main className="pt-24 md:pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-medium-gray">Loading cart...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 md:pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <div className="mb-10">
        <CartHeader items={items} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            items.map((item) => (
              <CartCard
                key={item._id}
                item={item}
                update={update}
                remove={remove}
              />
            ))
          )}
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </main>
  );
};