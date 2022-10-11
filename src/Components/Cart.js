import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

function Cart(props) {
  const deleteFromCart = (newItem) => {
    axios
      .delete(`http://localhost:5000/api/cart/${newItem.cart_id}`)
      .then(() => {
        props.cartRequest();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="cart">
      <div className="cart-totals">
        {props.cart.length > 0 ? (
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            Your Total Is $
            {props.cart.reduce((a, e) => a + e.price, 0).toFixed(2)}
          </p>
        ) : null}
      </div>
      {props.cart.length > 0 ? (
        props.cart.map((elem, index) => {
          return (
            <div className="cart-card">
              <div className="cart-image-container">
                <img src={elem.image}></img>
              </div>
              <div className="name-container">
                <p>{elem.name}</p>
              </div>
              <div className="price-container">
                <p>${elem.price}</p>
              </div>
              <button
                className="cart-btn-container"
                onClick={() => deleteFromCart(elem)}
              >
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <h1 style={{ justifyContent: "center" }}>Your Cart Is Empty</h1>
      )}
    </div>
  );
}

export default Cart;
