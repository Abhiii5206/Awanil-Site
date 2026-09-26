import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, rotateX: 8, rotateY: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="card h-100 product-card-3d border-0 text-white"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Dynamic 3D Image Wrapper */}
      <div className="card-img-wrapper" style={{ transform: "translateZ(30px)" }}>
        <img
          src={product.image_url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="card-img-top product-img"
        />
        <div className="card-glass-overlay"></div>
      </div>

      <div className="card-body d-flex flex-column" style={{ transform: "translateZ(40px)" }}>
        <span className="badge bg-primary-gradient mb-2 w-fit">{product.category}</span>
        <h5 className="card-title text-truncate fw-bold">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1 text-truncate-2">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="price-tag-3d">${product.price}</span>
          <Link
            to={`/products/${product.id}`}
            className="btn btn-primary-3d rounded-pill px-3 py-2 btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};