import React, { useState, useEffect } from "react";
import axios from "axios";
import Information from "../Information";

export default function Clothing(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clothing")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="products">
      {data.map((elem, index) => {
        return <Information elem={elem} addToCart={props.addToCart} />;
      })}
    </div>
  );
}
