import React from "react";
import Homepage from "./pages/Homepage.jsx";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoute from "./components/Routes/Privates.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import Order from "./pages/user/Order.jsx";
import Profile from "./pages/user/Profile.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Products from "./pages/Admin/Products.jsx";

import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import CategoryProdcut from "./pages/CategoryProdcut.jsx";
import Users from "./pages/Admin/Users.jsx";

import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import ForgotPasssword from "./pages/Auth/ForgotPasssword.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx"
import Categories from "./pages/Categories.jsx";
import CartPage from "./components/cartPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<Search />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProdcut />} />
        <Route path="/product/checkout" element={<Checkout />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
       
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
