import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useCart } from "../context/CartContext";
import { formatCurrency, calculateDiscount, handleFlipkartRedirect } from "../utils/helpers";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner message="Fetching item details..." />;

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error || "Product not found."}</div>
        <button onClick={() => navigate("/products")} className="btn btn-primary mt-2">
          Back to Products
        </button>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.original_price);

  return (
    <div className="container py-4">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4 btn-sm">
        ← Back
      </button>

      <div className="row gy-4">
        <div className="col-md-6 text-center">
          <div className="p-4 border rounded bg-light">
            <img
              src={product.image_url}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <h2 className="fw-bold mb-2">{product.name}</h2>
          
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-warning text-dark fs-6">⭐ {product.rating}</span>
            <span className="text-muted small">Verified AWANIL Product</span>
          </div>

          <div className="mb-3">
            <span className="display-6 fw-bold text-primary me-3">
              {formatCurrency(product.price)}
            </span>
            {product.original_price > product.price && (
              <span className="fs-5 text-muted text-decoration-line-through me-2">
                {formatCurrency(product.original_price)}
              </span>
            )}
            {discount > 0 && (
              <span className="badge bg-danger fs-6">{discount}% OFF</span>
            )}
          </div>

          <p className="text-muted mb-4">{product.description}</p>

          <div className="mb-3">
            <strong>Stock Status: </strong>
            {product.stock > 0 ? (
              <span className="text-success fw-bold">In Stock ({product.stock} left)</span>
            ) : (
              <span className="text-danger fw-bold">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <div className="d-flex align-items-center gap-3 mb-4">
              <label className="fw-bold">Quantity:</label>
              <div className="input-group style-qty" style={{ width: "130px" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="d-flex flex-column gap-2">
            <button
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock <= 0}
              className="btn btn-primary btn-lg w-100"
            >
              Add to Cart 🛒
            </button>

            <button
              onClick={() => handleFlipkartRedirect(product.flipkart_url)}
              className="btn btn-warning btn-lg fw-bold w-100"
            >
              BUY NOW ON FLIPKART 🛍️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};