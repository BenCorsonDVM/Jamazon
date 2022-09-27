import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";

function Navbar(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/" className="logo-link">
          Jamazon
        </Link>
        <form className="search-form">
          <input
            id="navbar-input"
            placeholder="What jam do you need today?"
            value={searchInput}
            onChange={handleChange}
          ></input>
          <button id="navbar-search" type="submit">
            <SearchIcon className="search-icon" />
          </button>
        </form>
        <div className="cart-link">
          <Badge badgeContent={props.cart.length}>
            <Link to="/cart">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Link>
          </Badge>
        </div>
      </div>
      <div className="departments-nav">
        <Link to="/" className="link">
          All
        </Link>
        <Link to="/clothing" className="link">
          Clothing
        </Link>
        <Link to="/games" className="link">
          Games
        </Link>
        <Link to="/grocery" className="link">
          Grocery
        </Link>
        <Link to="/movies" className="link">
          Movies
        </Link>
        <Link to="/music" className="link">
          Music
        </Link>
        <Link to="/toys" className="link">
          Toys
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
