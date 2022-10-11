import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Departments/Products";
import Clothing from "./Components/Departments/Clothing";
import Games from "./Components/Departments/Games";
import Grocery from "./Components/Departments/Grocery";
import Movies from "./Components/Departments/Movies";
import Music from "./Components/Departments/Music";
import Toys from "./Components/Departments/Toys";
import Cart from "./Components/Cart";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    const { product_id, name, price, image } = newItem;

    let body = {
      product_id: product_id,
      name: name,
      price: price,
      image: image,
    };

    axios.post("http://localhost:5000/api/cart", body).then((res) => {
      setCart(res.data);
    });
  };

  const cartRequest = () => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => setCart(res.data));
  };

  useEffect(() => {
    cartRequest();
  }, []);

  return (
    <div>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route path="/clothing" element={<Clothing addToCart={addToCart} />} />
        <Route path="/games" element={<Games addToCart={addToCart} />} />
        <Route path="/grocery" element={<Grocery addToCart={addToCart} />} />
        <Route path="/movies" element={<Movies addToCart={addToCart} />} />
        <Route path="/music" element={<Music addToCart={addToCart} />} />
        <Route path="/toys" element={<Toys addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} cartRequest={cartRequest} />}
        />
      </Routes>
    </div>
  );
}

export default App;
