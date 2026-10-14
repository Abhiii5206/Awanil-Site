
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../services/supabase";
import { ProductCard } from "../components/ProductCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import "../css/home.css";
import heroBottle from "../img/main_img.png";

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
        console.error(
          "Error loading featured products:",
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="home-page">

      {/* ==========================================
          FLOATING BACKGROUND
      =========================================== */}

      <div className="home-bg-orb orb-one"></div>
      <div className="home-bg-orb orb-two"></div>
      <div className="home-bg-orb orb-three"></div>


      {/* ==========================================
          HERO SECTION
      =========================================== */}

      <section className="premium-hero">

        <div className="hero-grid"></div>

        <div className="container position-relative">

          <div className="row align-items-center min-vh-75 gy-5">

            {/* LEFT CONTENT */}

            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            >

              {/* Badge */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="premium-badge">
                  <span className="badge-dot"></span>
                  PREMIUM COLLECTION 2026
                </span>
              </motion.div>


              {/* Heading */}

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                }}
              >
                Hydration.
                <br />

                <span className="gradient-text">
                  Reimagined.
                </span>
              </motion.h1>


              {/* Description */}

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                }}
              >
                Premium stainless steel, thermal and copper
                bottles engineered for people who refuse to
                compromise on style, performance and quality.
              </motion.p>


              {/* Buttons */}

              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.7,
                }}
              >

                <Link
                  to="/products"
                  className="hero-primary-btn"
                >
                  <span>Explore Collection</span>
                  <span className="arrow">→</span>
                </Link>

                <Link
                  to="/about"
                  className="hero-secondary-btn"
                >
                  Discover AWANIL
                </Link>

              </motion.div>


              {/* TRUST STATS */}

              <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.8,
                }}
              >

                <div className="hero-stat">
                  <strong>100%</strong>
                  <span>BPA Free</span>
                </div>

                <div className="stat-divider"></div>

                <div className="hero-stat">
                  <strong>24H</strong>
                  <span>Temperature</span>
                </div>

                <div className="stat-divider"></div>

                <div className="hero-stat">
                  <strong>5★</strong>
                  <span>Premium Quality</span>
                </div>

              </motion.div>

            </motion.div>


            {/* RIGHT IMAGE */}

            <motion.div
              className="col-lg-6"
              initial={{
                opacity: 0,
                scale: 0.75,
                x: 80,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              <div className="hero-product-stage">

                {/* Glow */}

                <div className="product-glow"></div>


                {/* Rotating Ring */}

                <motion.div
                  className="hero-ring ring-one"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="hero-ring ring-two"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />


                {/* Product Image */}

                <motion.div
                  className="hero-product-image"
                  animate={{
                    y: [-12, 12, -12],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.06,
                    rotate: 3,
                  }}
                >

                  <img
                    src={heroBottle}
                    alt="AWANIL Premium Bottle"
                  />

                </motion.div>


                {/* Floating Labels */}

                <motion.div
                  className="floating-card floating-card-one"
                  animate={{
                    y: [-8, 8, -8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="floating-icon">❄</span>
                  <div>
                    <strong>24 Hours</strong>
                    <small>Cold Retention</small>
                  </div>
                </motion.div>


                <motion.div
                  className="floating-card floating-card-two"
                  animate={{
                    y: [8, -8, 8],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="floating-icon">✓</span>
                  <div>
                    <strong>Premium Steel</strong>
                    <small>Built to Last</small>
                  </div>
                </motion.div>

              </div>

            </motion.div>

          </div>

        </div>


        {/* Scroll Indicator */}

        <motion.div
          className="scroll-indicator"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line"></div>
        </motion.div>

      </section>


      {/* ==========================================
          FEATURED PRODUCTS
      =========================================== */}

{/* FEATURED PRODUCTS */}
<section className="featured-section">
  <div className="container">

    <motion.div
      className="featured-heading"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div>
        <span className="section-eyebrow">
          CURATED FOR YOU
        </span>

        <h2>
          Featured <span>Collection</span>
        </h2>

        <p>
          Discover our most loved premium hydration essentials.
        </p>
      </div>

      <Link to="/products" className="view-products-btn">
        View All Products <span>→</span>
      </Link>
    </motion.div>

    {loading ? (
      <div className="py-5">
        <LoadingSpinner />
      </div>
    ) : featuredProducts.length === 0 ? (
      <p>No featured products available.</p>
    ) : (
      <div className="products-grid">
        {featuredProducts.map((product, index) => (
          <motion.article
            className="store-product-card"
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={`/products/${product.id}`}
              className="product-image-wrapper"
            >
              {product.badge && (
                <span className="product-badge">
                  {product.badge}
                </span>
              )}

              {Number(product.original_price) > Number(product.price) && (
                <span className="discount-badge">
                  -{Math.round(
                    ((Number(product.original_price) - Number(product.price)) /
                      Number(product.original_price)) * 100
                  )}%
                </span>
              )}

              <img
                src={product.image_url || "https://via.placeholder.com/700x700?text=No+Image"}
                alt={product.name}
                loading="lazy"
              />

              <div className="image-overlay">View Product</div>
            </Link>

            <div className="product-details">
              <div className="product-category">
                {product.category || "Bottles"}
              </div>

              <Link
                to={`/products/${product.id}`}
                className="product-name"
              >
                {product.name}
              </Link>

              <p className="product-description">
                {product.description || "Premium quality product."}
              </p>

              <div className="product-rating">
                <div className="stars">
                  <span>★</span>
                  <span>{Number(product.rating || 0).toFixed(1)}</span>
                </div>
                <span className="rating-text">Premium Quality</span>
              </div>

              <div className="product-specs">
                {product.capacity && <span>{product.capacity}</span>}
                {product.material && <span>{product.material}</span>}
              </div>

              <div className="product-price-row">
                <div>
                  <span className="product-price">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </span>

                  {Number(product.original_price) > Number(product.price) && (
                    <span className="product-mrp">
                      ₹{Number(product.original_price).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <span className={
                  Number(product.stock) > 0
                    ? "stock-status"
                    : "stock-status out"
                }>
                  {Number(product.stock) > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="product-actions">
                <Link
                  to={`/products/${product.id}`}
                  className="view-product-btn"
                >
                  View Details
                </Link>

                {/* <Link
                  to={`/products/${product.id}`}
                  className="add-cart-btn"
                >
                  🛒 Add
                </Link> */}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    )}
  </div>
</section>


      {/* ==========================================
          BRAND STATEMENT
      =========================================== */}

      <section className="brand-statement">

        <div className="container">

          <motion.div
            className="brand-statement-inner"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <span className="section-eyebrow">
              THE AWANIL STANDARD
            </span>

            <h2>
              Designed for your
              <span> everyday adventure.</span>
            </h2>

            <p>
              From your first sip in the morning to your
              final workout of the day, AWANIL brings
              premium design and dependable performance
              into every moment.
            </p>

            <Link
              to="/products"
              className="statement-btn"
            >
              Shop Premium Collection →
            </Link>

          </motion.div>

        </div>

      </section>

    </div>
  );
};

