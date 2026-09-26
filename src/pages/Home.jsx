import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { ProductCard } from "../components/ProductCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_featured", true)
          .limit(4);

        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error("Error loading featured products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section py-5 mb-5 bg-gradient-primary text-white rounded-3 shadow-sm">
        <div className="container py-4">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <span className="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold text-uppercase">
                Premium Collection
              </span>
              <h1 className="display-4 fw-extrabold mb-3">
                Discover Products <br />
                <span className="text-warning">You'll Love</span>
              </h1>
              <p className="lead mb-4 opacity-90">
                Explore our high-performance stainless steel, thermal, and copper hydration bottles engineered for your active lifestyle.
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-warning btn-lg px-4 fw-bold shadow">
                  Shop Now 🛒
                </Link>
                <Link to="/about" className="btn btn-outline-light btn-lg px-4">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
                alt="AWANIL Bottles Visual"
                className="img-fluid rounded-4 shadow-lg hero-img"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold m-0">Featured Products</h2>
            <p className="text-muted m-0">Handpicked premium items just for you</p>
          </div>
          <Link to="/products" className="btn btn-outline-primary btn-sm">
            View All Products →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {featuredProducts.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};