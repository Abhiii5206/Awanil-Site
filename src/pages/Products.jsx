import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { ProductCard } from "../components/ProductCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from("products").select("*");

        if (category !== "All") {
          query = query.eq("category", category);
        }

        if (sortBy === "price-low") {
          query = query.order("price", { ascending: true });
        } else if (sortBy === "price-high") {
          query = query.order("price", { ascending: false });
        } else if (sortBy === "name") {
          query = query.order("name", { ascending: true });
        } else {
          query = query.order("created_at", { ascending: false });
        }

        const { data, error } = await query;
        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy]);

  // Client-side text search filtering
  const filteredProducts = products.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-4 gy-3">
        <div className="col-md-4">
          <h2 className="fw-bold m-0">Catalog</h2>
          <p className="text-muted m-0">Explore our hydration bottles collection</p>
        </div>

        {/* Filters */}
        <div className="col-md-8">
          <div className="row g-2">
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-sm-3">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Bottles">Bottles</option>
              </select>
            </div>
            <div className="col-sm-4">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light">
          <h5>No products match your criteria</h5>
          <p className="text-muted">Try resetting your search or filter keywords.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};