import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency, handleFlipkartRedirect } from "../utils/helpers";

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold">Your Cart is Empty</h3>
        <p >You have no items in your shopping cart yet.</p>
        <Link to="/products" className="btn btn-primary mt-3">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Shopping Cart</h2>

      <div className="row gy-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.image_url}
                              alt={item.name}
                              style={{ width: "50px", height: "50px", objectFit: "contain" }}
                            />
                            <div>
                              <h6 className="mb-0 text-truncate" style={{ maxWidth: "200px" }}>
                                {item.name}
                              </h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                          <div className="input-group input-group-sm" style={{ width: "100px" }}>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control text-center p-0"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold">{formatCurrency(item.price * item.quantity)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleFlipkartRedirect(item.flipkart_url)}
                              className="btn btn-warning btn-sm fw-semibold"
                            >
                              Buy on Flipkart
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="btn btn-outline-danger btn-sm"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-transparent d-flex justify-content-between py-3">
              <button onClick={clearCart} className="btn btn-outline-secondary btn-sm">
                Clear Cart
              </button>
              <Link to="/products" className="btn btn-link text-decoration-none btn-sm">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="fw-bold border-bottom pb-2">Order Overview</h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Fulfillment</span>
              <span className="text-success fw-bold">Redirect to Flipkart</span>
            </div>
            <hr />
            <p className="small text-muted mb-3">
              Note: AWANIL STORE directs checkout processing to Flipkart for actual order fulfillment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};