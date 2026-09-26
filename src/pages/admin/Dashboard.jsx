import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredCount: 0,
    outOfStockCount: 0,
    categoriesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: products, error } = await supabase.from("products").select("*");
        if (error) throw error;

        const totalProducts = products.length;
        const featuredCount = products.filter((p) => p.is_featured).length;
        const outOfStockCount = products.filter((p) => p.stock <= 0).length;
        const categories = new Set(products.map((p) => p.category));

        setStats({
          totalProducts,
          featuredCount,
          outOfStockCount,
          categoriesCount: categories.size,
        });
      } catch (err) {
        console.error("Error loading dashboard metrics:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Loading Admin Analytics..." />;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0">Admin Dashboard</h2>
          <p className="text-muted m-0">Overview of AWANIL STORE catalog</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/products" className="btn btn-outline-primary">
            Manage Products
          </Link>
          <Link to="/admin/products/add" className="btn btn-primary fw-bold">
            + Add Product
          </Link>
        </div>
      </div>

      <div className="row g-3 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-primary text-white">
            <h6 className="opacity-75">Total Products</h6>
            <h2 className="fw-bold mb-0">{stats.totalProducts}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-warning text-dark">
            <h6 className="opacity-75">Featured Items</h6>
            <h2 className="fw-bold mb-0">{stats.featuredCount}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-danger text-white">
            <h6 className="opacity-75">Out of Stock</h6>
            <h2 className="fw-bold mb-0">{stats.outOfStockCount}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-success text-white">
            <h6 className="opacity-75">Categories</h6>
            <h2 className="fw-bold mb-0">{stats.categoriesCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};