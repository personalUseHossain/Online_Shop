import React, { useState } from "react";
import { Link } from "react-router-dom";
//css
import "../CSS/Cart.css";

export default function Cart() {
  const [count, setCount] = useState(1);
  return (
    <div>
      <div className="cart-head">
        <h1 className="cart-text">Items</h1>
        <button>
          <Link to="/">Go Home</Link>
        </button>
      </div>
      <hr />
      <div className="table-container">
        <table className="cart-container">
          <thead>
            <tr>
              <th className="hide">ID</th>
              <th>Product Name</th>
              <th className="hide">Product Image</th>
              <th>Counter</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="hide">65466546</td>
              <td>Laptop Table For Word</td>
              <td className="hide">
                <img
                  style={{ width: "5rem" }}
                  src="https://static-01.daraz.com.bd/p/23ec89735de06418e0404525fde3b339.jpg"
                  alt="img"
                />
              </td>
              <td>
                <div className="counter">
                  <button onClick={() => setCount((prev) => prev - 1)}>
                    -
                  </button>
                  <p>{count}</p>
                  <button onClick={() => setCount((prev) => prev + 1)}>
                    +
                  </button>
                </div>
              </td>
              <td>$10</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginRight: "4rem" }}>Total: $10</p>
        <button style={{ marginRight: "4rem" }}>Checkout</button>
      </div>
    </div>
  );
}
