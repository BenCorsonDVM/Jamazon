import React, { useState } from "react";

export default function Information({ elem, addToCart }) {
  const [descToggle, setDescToggle] = useState(false);
  const [cartButtonToggle, setCartButtonToggle] = useState(false);

  return (
    <div
      className="product-card"
      style={{ backgroundColor: descToggle ? "rgb(245, 245, 245)" : "white" }}
      onMouseEnter={() => setDescToggle(true)}
      onMouseLeave={() => setDescToggle(false)}
    >
      <div className="product-card-upper">
        <div className="prod-image-container">
          <img src={elem.image}></img>
        </div>
        <div className="product-info">
          {!descToggle ? <p style={{ fontSize: 22 }}>{elem.name}</p> : null}
          {descToggle ? (
            <p className="description">{elem.description}</p>
          ) : null}
          <p className="price">${elem.price}</p>
        </div>
      </div>
      <button
        onClick={() => addToCart(elem)}
        className="add-to-cart-btn"
        onMouseEnter={() => setCartButtonToggle(true)}
        onMouseLeave={() => setCartButtonToggle(false)}
        style={{ backgroundColor: cartButtonToggle ? "white" : null }}
      >
        Add to Cart
      </button>
    </div>
  );
}
