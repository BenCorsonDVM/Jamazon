import React, { useState, useEffect } from "react";
import axios from "axios";
import Information from "../Information";

export default function Products(props) {
  const [data, setData] = useState([]);

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setData(shuffleArray(res.data));
    });
  }, []);

  return (
    <div className="products">
      {data.map((elem, index) => {
        return <Information elem={elem} addToCart={props.addToCart} />;
      })}
    </div>
  );
}
