import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { formatCurrency } from "../../utils/helpers";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      alert("Error loading products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Manage Products</h2>
        <Link to="/admin/products/add" className="btn btn-primary fw-bold">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Flipkart URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={p.image_url} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                          <span className="fw-semibold">{p.name}</span>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td>{formatCurrency(p.price)}</td>
                      <td>
                        <span className={`badge ${p.stock > 0 ? "bg-success" : "bg-danger"}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td>
                        {p.flipkart_url ? (
                          <a href={p.flipkart_url} target="_blank" rel="noreferrer" className="small">
                            Link Set 🔗
                          </a>
                        ) : (
                          <span className="text-muted small">None</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/admin/products/edit/${p.id}`} className="btn btn-sm btn-outline-primary">
                            Edit
                          </Link>
                          <button onClick={() => handleDelete(p.id, p.name)} className="btn btn-sm btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};