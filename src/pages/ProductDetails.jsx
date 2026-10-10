
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Package,
  Star,
  Minus,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

import { supabase } from "../services/supabase";
import { useCart } from "../context/CartContext";
import {
  formatCurrency,
  calculateDiscount,
  handleFlipkartRedirect,
} from "../utils/helpers";
import { LoadingSpinner } from "../components/LoadingSpinner";

import "../css/productdetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);
      setSelectedImage("");
      setQuantity(1);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (!active) return;

        setProduct(data);
        setSelectedImage(data.image_url || "");
      } catch (err) {
        console.error("Product details fetch error:", err);

        if (active) {
          setError(
            err.message || "Unable to load this product."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    let additionalImages = product.gallery_images || [];

    // Support JSON stored as either an array or a string.
    if (typeof additionalImages === "string") {
      try {
        additionalImages = JSON.parse(additionalImages);
      } catch {
        additionalImages = [additionalImages];
      }
    }

    if (!Array.isArray(additionalImages)) {
      additionalImages = [];
    }

    return [
      product.image_url,
      ...additionalImages,
    ].filter(
      (image, index, array) =>
        typeof image === "string" &&
        image.trim() !== "" &&
        array.indexOf(image) === index
    );
  }, [product]);

  if (loading) {
    return (
      <div className="pd-loading">
        <LoadingSpinner message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-page">
        <div className="pd-error">
          <Package size={42} />
          <h2>Product unavailable</h2>
          <p>
            {error || "This product could not be found."}
          </p>
          <button
            className="pd-primary-btn"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const stock = Math.max(0, Number(product.stock) || 0);
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.original_price) || 0;
  const rating = Number(product.rating) || 0;
  const discount = calculateDiscount(price, originalPrice);

  const availability =
    stock <= 0 || product.availability === "Out of Stock"
      ? "Out of Stock"
      : product.availability || "In Stock";

  const isAvailable =
    stock > 0 && availability === "In Stock";

  const handleAddToCart = () => {
    if (!isAvailable) return;

    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product.flipkart_url) {
      window.alert("Flipkart purchase link is not available for this product.");
      return;
    }

    handleFlipkartRedirect(product.flipkart_url);
  };

  return (
    <div className="pd-page">
      <div className="pd-container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <button onClick={() => navigate("/")}>Home</button>
          <span>/</span>
          <button onClick={() => navigate("/products")}>
            Products
          </button>
          <span>/</span>
          <span className="pd-current">
            {product.name}
          </span>
        </nav>

        {/* Back button */}
        <button
          className="pd-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {/* Main product section */}
        <section className="pd-product-layout">
          {/* Image gallery */}
          <div className="pd-gallery">
            <div className="pd-main-image">
              {product.badge && (
                <span className="pd-product-badge">
                  {product.badge}
                </span>
              )}

              {discount > 0 && (
                <span className="pd-discount-badge">
                  {discount}% OFF
                </span>
              )}

              {selectedImage ? (
                <img
                  key={selectedImage}
                  src={selectedImage}
                  alt={product.name}
                  className="pd-hero-image"
                />
              ) : (
                <div className="pd-image-placeholder">
                  <ImageIcon size={58} />
                  <span>Image unavailable</span>
                </div>
              )}
            </div>

            {galleryImages.length > 0 && (
              <div className="pd-thumbnails">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`pd-thumbnail ${
                      selectedImage === image ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === image}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="pd-image-caption">
              <CheckCircle2 size={15} />
              Product images from AWANIL STORE
            </div>
          </div>

          {/* Product information */}
          <div className="pd-information">
            <div className="pd-category-row">
              <span className="pd-category">
                {product.category || "General"}
              </span>

              {product.is_featured && (
                <span className="pd-featured">
                  <Star size={13} fill="currentColor" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating-row">
              <span className="pd-rating">
                <Star size={15} fill="currentColor" />
                {rating.toFixed(1)}
              </span>

              <span className="pd-rating-caption">
                Product rating
              </span>
            </div>

            <div className="pd-price-section">
              <div className="pd-price-row">
                <span className="pd-price">
                  {formatCurrency(price)}
                </span>

                {originalPrice > price && (
                  <span className="pd-original-price">
                    {formatCurrency(originalPrice)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="pd-discount-text">
                    {discount}% off
                  </span>
                )}
              </div>

              {originalPrice > price && (
                <p className="pd-tax-note">
                  You save {formatCurrency(originalPrice - price)}
                </p>
              )}
            </div>

            <div className={`pd-stock ${
              isAvailable ? "available" : "unavailable"
            }`}>
              {isAvailable ? (
                <CheckCircle2 size={17} />
              ) : (
                <Package size={17} />
              )}

              <div>
                <strong>{availability}</strong>
                <span>
                  {isAvailable
                    ? `${stock} unit${stock === 1 ? "" : "s"} available`
                    : "This product is currently unavailable"}
                </span>
              </div>
            </div>

            {product.description && (
              <div className="pd-description-section">
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            {/* Quantity */}
            {isAvailable && (
              <div className="pd-quantity-row">
                <span>Quantity</span>

                <div className="pd-quantity-control">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(stock, q + 1))
                    }
                    disabled={quantity >= stock}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pd-actions">
              <button
                type="button"
                className="pd-primary-btn"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <ShoppingCart size={19} />
                {isAvailable ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                type="button"
                className="pd-buy-btn"
                onClick={handleBuyNow}
                disabled={!product.flipkart_url}
                title={
                  product.flipkart_url
                    ? "Open the external purchase link"
                    : "No external purchase link provided"
                }
              >
                Buy Now
                <ExternalLink size={17} />
              </button>
            </div>

            <div className="pd-benefits">
              <div>
                <ShieldCheck size={21} />
                <span>
                  <strong>Quality</strong>
                  <small>Product details verified</small>
                </span>
              </div>

              <div>
                <Truck size={21} />
                <span>
                  <strong>Delivery</strong>
                  <small>Shipping details at checkout</small>
                </span>
              </div>

              <div>
                <RotateCcw size={21} />
                <span>
                  <strong>Returns</strong>
                  <small>Check store return policy</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Full product specifications */}
        <section className="pd-specifications">
          <div className="pd-section-heading">
            <span>PRODUCT INFORMATION</span>
            <h2>Specifications & Details</h2>
            <p>
              Explore the complete information available for this product.
            </p>
          </div>

          <div className="pd-spec-grid">
            <div className="pd-spec-item">
              <span>Product Name</span>
              <strong>{product.name || "—"}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Category</span>
              <strong>{product.category || "—"}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Product Badge</span>
              <strong>{product.badge || "No badge"}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Selling Price</span>
              <strong>{formatCurrency(price)}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Original Price / MRP</span>
              <strong>
                {originalPrice > 0
                  ? formatCurrency(originalPrice)
                  : "Not provided"}
              </strong>
            </div>

            <div className="pd-spec-item">
              <span>Rating</span>
              <strong>{rating.toFixed(1)} / 5</strong>
            </div>

            <div className="pd-spec-item">
              <span>Availability</span>
              <strong>{availability}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Available Stock</span>
              <strong>{stock} units</strong>
            </div>

            <div className="pd-spec-item">
              <span>Capacity</span>
              <strong>{product.capacity || "Not specified"}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Material</span>
              <strong>{product.material || "Not specified"}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Color</span>
              <strong>{product.color || "Not specified"}</strong>
            </div>

            <div className="pd-spec-item">
              <span>Country of Origin</span>
              <strong>
                {product.country_of_origin || "Not specified"}
              </strong>
            </div>

            <div className="pd-spec-item">
              <span>Homepage Featured</span>
              <strong>
                {product.is_featured ? "Yes" : "No"}
              </strong>
            </div>

            <div className="pd-spec-item">
              <span>Gallery Images</span>
              <strong>
                {Math.max(0, galleryImages.length - 1)} additional images
              </strong>
            </div>
          </div>

          {product.description && (
            <div className="pd-full-description">
              <h3>About this product</h3>
              <p>{product.description}</p>
            </div>
          )}
        </section>

        {/* Related navigation */}
        <section className="pd-bottom-banner">
          <div>
            <span>AWANIL STORE</span>
            <h2>Discover more products</h2>
            <p>
              Explore more products from our collection.
            </p>
          </div>

          <button
            type="button"
            className="pd-primary-btn"
            onClick={() => navigate("/products")}
          >
            Explore Collection
            <ArrowLeft className="pd-arrow-right" size={18} />
          </button>
        </section>
      </div>
    </div>
  );
};
