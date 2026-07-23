import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";

function App() {

  return (
    <WishlistProvider>
      <CartProvider>
        <CheckoutProvider>
          <AppRoutes />
        </CheckoutProvider>
      </CartProvider>
    </WishlistProvider>
  )
}

export default App
