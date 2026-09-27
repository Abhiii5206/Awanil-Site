import React from "react";
import  { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";


import { Dashboard } from "./pages/admin/Dashboard";
import { ManageProducts } from "./pages/admin/ManageProducts";
import { AddProduct } from "./pages/admin/AddProduct";
import { EditProduct } from "./pages/admin/EditProduct";

export default function App() {

  const [theme, setTheme] = useState( localStorage.getItem("theme") || "dark" );

  const toggleTheme = () => { setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark" ); };

  useEffect(() => {  document.body.classList.remove( "dark-theme", "light-theme" );
    document.body.classList.add( `${theme}-theme` );
    localStorage.setItem("theme", theme); }, [theme]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          </Route>

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <div className="container py-5 text-center">
                <h3>404 - Page Not Found</h3>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}