import React, { useState, useEffect } from "react";
import axios from "axios";
import Information from "../Information";

export default function Music(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/music")
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
