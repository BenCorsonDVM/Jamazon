require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "./src")));

const {
  viewCart,
  deleteFromCart,
  addToCart,
  allProducts,
  clothing,
  games,
  grocery,
  movies,
  music,
  toys,
  seed,
} = require("./controller");

app.get("/api/cart", viewCart);
app.delete("/api/cart/:id", deleteFromCart);
app.post("/api/cart", addToCart);
app.get("/api/products", allProducts);
app.get("/api/clothing", clothing);
app.get("/api/games", games);
app.get("/api/grocery", grocery);
app.get("/api/movies", movies);
app.get("/api/music", music);
app.get("/api/toys", toys);
app.post("/seed", seed);

app.listen(port, () => console.log(`Server running on ${port}`));
