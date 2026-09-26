import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "Bottles",
    image_url: "",
    stock: "10",
    rating: "4.5",
    flipkart_url: "",
    is_featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        stock: parseInt(form.stock, 10),
        rating: parseFloat(form.rating),
      };

      const { error } = await supabase.from("products").insert([payload]);
      if (error) throw error;

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      alert("Error adding product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="fw-bold mb-4">Add New Product</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Price (INR)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    required
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Original Price (INR)</label>
                  <input
                    type="number"
                    name="original_price"
                    className="form-control"
                    value={form.original_price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={form.stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Rating (0 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    className="form-control"
                    value={form.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  className="form-control"
                  required
                  value={form.image_url}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Flipkart Purchase URL</label>
                <input
                  type="url"
                  name="flipkart_url"
                  className="form-control"
                  placeholder="https://www.flipkart.com/..."
                  value={form.flipkart_url}
                  onChange={handleChange}
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="is_featured"
                  className="form-check-input"
                  id="featuredCheck"
                  checked={form.is_featured}
                  onChange={handleChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="featuredCheck">
                  Show in Featured Products Section
                </label>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" disabled={loading} className="btn btn-primary fw-bold px-4">
                  {loading ? "Saving..." : "Save Product"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};