import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import "../../css/addproduct.css";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Bottles",
    price: "",
    original_price: "",
    badge: "",
    availability: "In Stock",
    stock: "10",
    capacity: "",
    material: "",
    country_of_origin: "India",
    color: "",
    description: "",
    image_url: "",
    gallery_images: [],
    flipkart_url: "",
    rating: "4.5",
    is_featured: false,
    hide_image: false,
  });

  const [primaryImage, setPrimaryImage] = useState(null);
  const [galleryImage2, setGalleryImage2] = useState(null);
  const [galleryImage3, setGalleryImage3] = useState(null);

  const [primaryPreview, setPrimaryPreview] = useState("");
  const [galleryPreview2, setGalleryPreview2] = useState("");
  const [galleryPreview3, setGalleryPreview3] = useState("");

  // -----------------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------------
  // HANDLE PRIMARY IMAGE
  // -----------------------------------

  const handlePrimaryImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPrimaryImage(file);
    setPrimaryPreview(URL.createObjectURL(file));
  };

  // -----------------------------------
  // HANDLE GALLERY IMAGE 2
  // -----------------------------------

  const handleGalleryImage2 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setGalleryImage2(file);
    setGalleryPreview2(URL.createObjectURL(file));
  };

  // -----------------------------------
  // HANDLE GALLERY IMAGE 3
  // -----------------------------------

  const handleGalleryImage3 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setGalleryImage3(file);
    setGalleryPreview3(URL.createObjectURL(file));
  };

  // -----------------------------------
  // UPLOAD IMAGE TO SUPABASE
  // -----------------------------------

  const uploadImage = async (file) => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 10)}.${fileExt}`;

    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // -----------------------------------
  // SUBMIT PRODUCT
  // -----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!primaryImage) {
      alert("Please upload the primary product image.");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      // Upload primary image
      const primaryImageUrl = await uploadImage(primaryImage);

      // Upload gallery image 2
      const galleryUrl2 = await uploadImage(galleryImage2);

      // Upload gallery image 3
      const galleryUrl3 = await uploadImage(galleryImage3);

      const galleryImages = [
        galleryUrl2,
        galleryUrl3,
      ].filter(Boolean);

      // -----------------------------------
      // PRODUCT PAYLOAD
      // -----------------------------------

      const payload = {
        name: form.name.trim(),

        description: form.description.trim(),

        price: parseFloat(form.price),

        original_price: form.original_price
          ? parseFloat(form.original_price)
          : null,

        category: form.category,

        badge: form.badge || null,

        availability: form.availability,

        stock: parseInt(form.stock, 10) || 0,

        capacity: form.capacity || null,

        material: form.material || null,

        country_of_origin: form.country_of_origin || null,

        color: form.color || null,

        rating: parseFloat(form.rating) || 0,

        image_url: primaryImageUrl,

        gallery_images: galleryImages,

        flipkart_url: form.flipkart_url || null,

        is_featured: form.is_featured,

        hide_image: form.hide_image,
      };

      const { error } = await supabase
        .from("products")
        .insert([payload]);

      if (error) {
        throw error;
      }

      alert("Product added successfully!");

      navigate("/admin/products");

    } catch (error) {
      console.error("Add product error:", error);

      alert(
        "Error adding product:\n" +
        (error.message || "Something went wrong")
      );

    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="add-product-page">

      <div className="add-product-wrapper">

        {/* HEADER */}

        <div className="add-product-header">

          <div>
            <h2>Product Details</h2>
            <p>
              Add a new product to your store
            </p>
          </div>

          <Link
            to="/products"
            className="view-shop-btn"
          >
            VIEW SHOP
          </Link>

        </div>

        {/* FORM */}

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              BASIC INFORMATION
          ========================== */}

          <div className="form-section">

            <div className="section-title">
              Basic Information
            </div>

            <div className="form-grid">

              {/* PRODUCT NAME */}

              <div className="form-group full-width">

                <label>
                  Product Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Velora Pro 500ml"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* CATEGORY */}

              <div className="form-group">

                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Premium, Eco"
                  value={form.category}
                  onChange={handleChange}
                />

              </div>

              {/* BADGE */}

              <div className="form-group">

                <label>Badge</label>

                <input
                  type="text"
                  name="badge"
                  placeholder="e.g. BESTSELLER"
                  value={form.badge}
                  onChange={handleChange}
                />

              </div>

              {/* SELLING PRICE */}

              <div className="form-group">

                <label>
                  Selling Price (₹) <span>*</span>
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="2499"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* ORIGINAL PRICE */}

              <div className="form-group">

                <label>Original Price / MRP (₹)</label>

                <input
                  type="number"
                  name="original_price"
                  placeholder="2999"
                  min="0"
                  value={form.original_price}
                  onChange={handleChange}
                />

              </div>

              {/* STOCK */}

              <div className="form-group">

                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                />

              </div>

              {/* AVAILABILITY */}

              <div className="form-group">

                <label>Availability Status</label>

                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                >
                  <option value="In Stock">
                    In Stock
                  </option>

                  <option value="Out of Stock">
                    Out of Stock
                  </option>

                  <option value="Coming Soon">
                    Coming Soon
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* =========================
              PRODUCT SPECIFICATIONS
          ========================== */}

          <div className="form-section">

            <div className="section-title">
              Product Specifications
            </div>

            <div className="form-grid">

              {/* CAPACITY */}

              <div className="form-group">

                <label>Capacity</label>

                <input
                  type="text"
                  name="capacity"
                  placeholder="e.g. 750ml, 1000ml"
                  value={form.capacity}
                  onChange={handleChange}
                />

              </div>

              {/* MATERIAL */}

              <div className="form-group">

                <label>Material</label>

                <input
                  type="text"
                  name="material"
                  placeholder="e.g. Premium Grade Stainless Steel"
                  value={form.material}
                  onChange={handleChange}
                />

              </div>

              {/* COUNTRY */}

              <div className="form-group">

                <label>Country of Origin</label>

                <input
                  type="text"
                  name="country_of_origin"
                  placeholder="e.g. Made in India"
                  value={form.country_of_origin}
                  onChange={handleChange}
                />

              </div>

              {/* COLOR */}

              <div className="form-group">

                <label>Color</label>

                <select
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Color
                  </option>

                  <option value="Black">
                    Black
                  </option>

                  <option value="White">
                    White
                  </option>

                  <option value="Blue">
                    Blue
                  </option>

                  <option value="Red">
                    Red
                  </option>

                  <option value="Green">
                    Green
                  </option>

                  <option value="Silver">
                    Silver
                  </option>

                  <option value="Gold">
                    Gold
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* RATING */}

              <div className="form-group">

                <label>Rating (0 - 5)</label>

                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* =========================
              DESCRIPTION
          ========================== */}

          <div className="form-section">

            <div className="section-title">
              Product Description
            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                name="description"
                rows="5"
                placeholder="Describe product features, materials, benefits..."
                value={form.description}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* =========================
              IMAGE UPLOAD
          ========================== */}

          <div className="form-section">

            <div className="section-title">
              Product Images
            </div>

            <p className="upload-info">
              Upload JPG, JPEG, PNG or WEBP images.
              Images will be stored securely in Supabase Storage.
            </p>

            <div className="image-upload-grid">

              {/* PRIMARY IMAGE */}

              <div className="image-upload-box">

                <label className="upload-label">
                  Primary Image <span>*</span>
                </label>

                <label className="upload-area">

                  {primaryPreview ? (

                    <img
                      src={primaryPreview}
                      alt="Primary preview"
                    />

                  ) : (

                    <div className="upload-placeholder">

                      <div className="upload-icon">
                        +
                      </div>

                      <strong>
                        Upload Primary Image
                      </strong>

                      <small>
                        Click to choose image
                      </small>

                    </div>

                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handlePrimaryImage}
                    hidden
                  />

                </label>

              </div>

              {/* GALLERY IMAGE 2 */}

              <div className="image-upload-box">

                <label className="upload-label">
                  Gallery Image 2
                </label>

                <label className="upload-area">

                  {galleryPreview2 ? (

                    <img
                      src={galleryPreview2}
                      alt="Gallery preview 2"
                    />

                  ) : (

                    <div className="upload-placeholder">

                      <div className="upload-icon">
                        +
                      </div>

                      <strong>
                        Upload Image
                      </strong>

                      <small>
                        Optional
                      </small>

                    </div>

                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleGalleryImage2}
                    hidden
                  />

                </label>

              </div>

              {/* GALLERY IMAGE 3 */}

              <div className="image-upload-box">

                <label className="upload-label">
                  Gallery Image 3
                </label>

                <label className="upload-area">

                  {galleryPreview3 ? (

                    <img
                      src={galleryPreview3}
                      alt="Gallery preview 3"
                    />

                  ) : (

                    <div className="upload-placeholder">

                      <div className="upload-icon">
                        +
                      </div>

                      <strong>
                        Upload Image
                      </strong>

                      <small>
                        Optional
                      </small>

                    </div>

                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleGalleryImage3}
                    hidden
                  />

                </label>

              </div>

            </div>

            {/* HIDE IMAGE */}

            <div className="checkbox-row">

              <input
                type="checkbox"
                id="hideImage"
                name="hide_image"
                checked={form.hide_image}
                onChange={handleChange}
              />

              <label htmlFor="hideImage">
                Hide image on homepage
              </label>

            </div>

          </div>

          {/* =========================
              PURCHASE URL
          ========================== */}

          <div className="form-section">

            <div className="section-title">
              Purchase Information
            </div>

            <div className="form-group">

              <label>
                Flipkart / Buy Now Link
              </label>

              <input
                type="url"
                name="flipkart_url"
                placeholder="https://www.flipkart.com/product..."
                value={form.flipkart_url}
                onChange={handleChange}
              />

              <small className="field-help">
                Add the external purchase link for this product.
              </small>

            </div>

          </div>

          {/* =========================
              FEATURED
          ========================== */}

          <div className="featured-box">

            <input
              type="checkbox"
              id="featuredCheck"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleChange}
            />

            <div>

              <label htmlFor="featuredCheck">
                Show on Homepage
              </label>

              <small>
                Display this product in the featured section.
              </small>

            </div>

          </div>

          {/* =========================
              SUBMIT
          ========================== */}

          <button
            type="submit"
            className="add-product-btn"
            disabled={loading}
          >

            {loading
              ? uploading
                ? "UPLOADING IMAGES..."
                : "SAVING PRODUCT..."
              : "ADD PRODUCT TO SHOP"
            }

          </button>

        </form>

      </div>

    </div>
  );
};