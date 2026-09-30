import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../css/products.css";
import {
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Star,
  Package,
  X,
} from "lucide-react";
import { supabase } from "../services/supabase";
import { LoadingSpinner } from "../components/LoadingSpinner";
import "../css/products.css";

const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "Velora Pro 500ml",
    description:
      "Premium stainless steel bottle with a sleek design, leak-proof lid and excellent insulation.",
    price: 799,
    original_price: 1199,
    category: "Bottles",
    badge: "BESTSELLER",
    availability: "In Stock",
    stock: 25,
    capacity: "500ml",
    material: "Stainless Steel",
    country_of_origin: "India",
    color: "Black",
    rating: 4.8,
    image_url:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    is_featured: true,
  },
  {
    id: "demo-2",
    name: "Awanil Steel Bottle",
    description:
      "Minimal premium bottle designed for everyday office, gym and travel use.",
    price: 999,
    original_price: 1499,
    category: "Bottles",
    badge: "POPULAR",
    availability: "In Stock",
    stock: 18,
    capacity: "750ml",
    material: "Premium Steel",
    country_of_origin: "India",
    color: "Silver",
    rating: 4.7,
    image_url:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=900&q=85",
    is_featured: true,
  },
  {
    id: "demo-3",
    name: "Hydro Max 1L",
    description:
      "Large capacity hydration bottle with a durable body and modern premium finish.",
    price: 1299,
    original_price: 1799,
    category: "Bottles",
    badge: "NEW",
    availability: "In Stock",
    stock: 12,
    capacity: "1000ml",
    material: "Stainless Steel",
    country_of_origin: "India",
    color: "Blue",
    rating: 4.6,
    image_url:
      "https://images.unsplash.com/photo-1625708458528-802ec79b1ed1?auto=format&fit=crop&w=900&q=85",
    is_featured: false,
  },
  {
    id: "demo-4",
    name: "Eco Flow Bottle",
    description:
      "Lightweight everyday bottle with an eco-friendly design and comfortable grip.",
    price: 599,
    original_price: 899,
    category: "Bottles",
    badge: "ECO",
    availability: "In Stock",
    stock: 30,
    capacity: "600ml",
    material: "Eco Polymer",
    country_of_origin: "India",
    color: "Green",
    rating: 4.5,
    image_url:
      "https://images.unsplash.com/photo-1544003484-3cd181d17917?auto=format&fit=crop&w=900&q=85",
    is_featured: false,
  },
  {
    id: "demo-5",
    name: "Thermo Elite 750ml",
    description:
      "Double-wall insulated bottle designed to keep your beverages at the desired temperature.",
    price: 1499,
    original_price: 1999,
    category: "Bottles",
    badge: "PREMIUM",
    availability: "In Stock",
    stock: 8,
    capacity: "750ml",
    material: "Grade 304 Steel",
    country_of_origin: "India",
    color: "Gold",
    rating: 4.9,
    image_url:
      "https://images.unsplash.com/photo-1550505198-4e0a0b870a7d?auto=format&fit=crop&w=900&q=85",
    is_featured: true,
  },
  {
    id: "demo-6",
    name: "Urban Travel Bottle",
    description:
      "Compact travel bottle with a premium matte finish and easy-carry design.",
    price: 699,
    original_price: 999,
    category: "Bottles",
    badge: "SALE",
    availability: "In Stock",
    stock: 20,
    capacity: "650ml",
    material: "Stainless Steel",
    country_of_origin: "India",
    color: "White",
    rating: 4.4,
    image_url:
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=900&q=85",
    is_featured: false,
  },
];

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          throw error;
        }

        /*
          If Supabase has products,
          show those products.

          If table is empty,
          show demo products.
        */
        setProducts(
          data && data.length > 0
            ? data
            : DEMO_PRODUCTS
        );
      } catch (err) {
        console.error(
          "Error fetching products:",
          err.message
        );

        // Demo products if Supabase request fails
        setProducts(DEMO_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ------------------------------------------
  // GET CATEGORIES
  // ------------------------------------------

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // ------------------------------------------
  // FILTER + SEARCH + SORT
  // ------------------------------------------

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // Search
    const searchValue = search
      .trim()
      .toLowerCase();

    if (searchValue) {
      result = result.filter((product) => {
        return (
          product.name
            ?.toLowerCase()
            .includes(searchValue) ||
          product.category
            ?.toLowerCase()
            .includes(searchValue) ||
          product.description
            ?.toLowerCase()
            .includes(searchValue) ||
          product.material
            ?.toLowerCase()
            .includes(searchValue)
        );
      });
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    sortBy,
  ]);

  // ------------------------------------------
  // DISCOUNT
  // ------------------------------------------

  const getDiscount = (
    price,
    originalPrice
  ) => {
    if (
      !originalPrice ||
      Number(originalPrice) <= Number(price)
    ) {
      return null;
    }

    return Math.round(
      ((Number(originalPrice) -
        Number(price)) /
        Number(originalPrice)) *
        100
    );
  };

  // ------------------------------------------
  // CLEAR FILTER
  // ------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("newest");
  };

  return (
    <div className="products-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="products-hero">

        <div className="products-hero-content">

          <span className="products-eyebrow">
            AWANIL STORE
          </span>

          <h1>
            Premium Hydration
            <span> Collection</span>
          </h1>

          <p>
            Discover premium bottles designed
            for everyday life, travel and
            performance.
          </p>

        </div>

      </section>

      {/* =================================
          MAIN
      ================================= */}

      <div className="products-container">

        {/* =================================
            TOOLBAR
        ================================= */}

        <div className="products-toolbar">

          <div className="catalog-info">

            <h2>Our Collection</h2>

            <p>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              available
            </p>

          </div>

          <button
            className="mobile-filter-btn"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

        </div>

        {/* =================================
            FILTER PANEL
        ================================= */}

        <div
          className={`products-filters ${
            showFilters
              ? "filters-open"
              : ""
          }`}
        >

          <div className="search-box">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={15} />
              </button>
            )}

          </div>

          <div className="category-filters">

            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          <div className="sort-box">

            <label>Sort by</label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="newest">
                Newest First
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="name">
                Name: A-Z
              </option>
            </select>

          </div>

        </div>

        {/* =================================
            ACTIVE FILTER
        ================================= */}

        {(search ||
          category !== "All" ||
          sortBy !== "newest") && (

          <div className="active-filter-row">

            <span>
              Showing filtered results
            </span>

            <button
              onClick={clearFilters}
            >
              Clear filters
            </button>

          </div>

        )}

        {/* =================================
            PRODUCTS
        ================================= */}

        {loading ? (

          <div className="products-loading">
            <LoadingSpinner />
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="empty-products">

            <div className="empty-icon">
              <Package size={34} />
            </div>

            <h3>
              No products found
            </h3>

            <p>
              Try changing your search or
              category filter.
            </p>

            <button
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="products-grid">

            {filteredProducts.map(
              (product) => {

                const discount =
                  getDiscount(
                    product.price,
                    product.original_price
                  );

                return (
                  <article
                    className="store-product-card"
                    key={product.id}
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/products/${product.id}`}
                      className="product-image-wrapper"
                    >

                      {product.badge && (
                        <span className="product-badge">
                          {product.badge}
                        </span>
                      )}

                      {discount && (
                        <span className="discount-badge">
                          -{discount}%
                        </span>
                      )}

                      <img
                        src={
                          product.image_url ||
                          "https://via.placeholder.com/700x700?text=No+Image"
                        }
                        alt={product.name}
                        loading="lazy"
                      />

                      <div className="image-overlay">
                        View Product
                      </div>

                    </Link>

                    {/* DETAILS */}

                    <div className="product-details">

                      <div className="product-category">
                        {product.category ||
                          "Bottles"}
                      </div>

                      <Link
                        to={`/products/${product.id}`}
                        className="product-name"
                      >
                        {product.name}
                      </Link>

                      <p className="product-description">
                        {product.description ||
                          "Premium quality product designed for everyday use."}
                      </p>

                      {/* RATING */}

                      <div className="product-rating">

                        <div className="stars">

                          <Star
                            size={14}
                            fill="currentColor"
                          />

                          <span>
                            {Number(
                              product.rating || 0
                            ).toFixed(1)}
                          </span>

                        </div>

                        <span className="rating-text">
                          Premium Quality
                        </span>

                      </div>

                      {/* SPECIFICATIONS */}

                      <div className="product-specs">

                        {product.capacity && (
                          <span>
                            {product.capacity}
                          </span>
                        )}

                        {product.material && (
                          <span>
                            {product.material}
                          </span>
                        )}

                      </div>

                      {/* PRICE */}

                      <div className="product-price-row">

                        <div>

                          <span className="product-price">
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          {product.original_price && (
                            <span className="product-mrp">
                              ₹
                              {Number(
                                product.original_price
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          )}

                        </div>

                        <span
                          className={
                            product.stock > 0
                              ? "stock-status"
                              : "stock-status out"
                          }
                        >
                          {product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>

                      </div>

                      {/* BUTTONS */}

                      <div className="product-actions">

                        <Link
                          to={`/products/${product.id}`}
                          className="view-product-btn"
                        >
                          View Details
                        </Link>

                        <button
                          className="add-cart-btn"
                          disabled={
                            product.stock <= 0
                          }
                        >
                          <ShoppingCart
                            size={16}
                          />

                          Add
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
};