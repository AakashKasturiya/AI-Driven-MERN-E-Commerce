import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/** Login || SignUp */
import { AuthPage } from "../pages/auth/AuthPage";

import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

/** User */
import { HomePage } from "../pages/user/HomePage";
import { ShopPage } from "../pages/user/ShopPage";
import { AiStylistPage } from "../pages/user/AiStylistPage";
// import { AIStylistPage } from "../pages/user/AIStylistPage";
import { CollectionPage } from "../pages/user/Collectionpage";
import { ProductDetailsPage } from "../pages/user/ProductDetailsPage";
import { AboutPage } from "../pages/user/AboutPage";
import { ProductsPage } from "../pages/products/ProductsPage";

import { UserLayout } from "../layouts/user/UserLayout";
import { CartPage } from "../pages/user/CartPage";
import { Wishlist } from "../pages/user/Wishlist";
import { CheckoutPage } from "../pages/user/CheckoutPage";
/** Admin */
import { AdminLayout } from "../layouts/admin/AdminLayout";
import { DashboardPage } from "../pages/admin/DashboardPage";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { AdminProductsDetails } from "../pages/admin/AdminProductsDetails";
import { UsersPage } from "../pages/admin/UsersPage";
import { AddProductPage } from "../pages/admin/AddProductPage";
import { EditProductPage } from "../pages/admin/EditProductPage";
import { OrdersPage } from "../pages/admin/OrderPage";



export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />

        {/* User Protected Routes - Main Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested User Routes */}
          <Route index element={<HomePage/>} />
          <Route path="shop" element={<ShopPage/>} />
          <Route path="ai-stylist" element={<AiStylistPage />} />
          {/* <Route path="ai-old-page" element={<AIStylistPage/>} /> */}
          <Route path="collections" element={<CollectionPage/>} />
          <Route path="products" element={<ProductsPage/>} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path="wishlist" element={<Wishlist/>} />
          <Route path="cart" element={<CartPage/>} />
          <Route path="checkout" element={<CheckoutPage/>} />
        </Route>

        
        
        {/* Admin Protected Routes - Admin Layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Nested Admin Routes */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
           <Route path="orders" element={<OrdersPage />} />

          <Route path="products" element={<AdminProductsPage />}>
          <Route path="add" element={<AddProductPage />} />
           <Route path="edit/:id" element={<EditProductPage />} />
          </Route>
          <Route path="product/:id" element={<AdminProductsDetails />} />
         
          
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
