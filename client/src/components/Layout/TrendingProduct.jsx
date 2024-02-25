import React from "react";
import "./TrendingProduct.css";

const TrendingProduct = () => {
  return (
    <><h1 className="text-center">Top Products</h1>
      <div className="trending-product">
        <div className="trending-products"><img src="../../../public/images/smallCaraousel/card1.jpeg" alt="" /></div>
        <div className="trending-products"><img src="../../../public/images/smallCaraousel/card2.jpeg" alt="" /></div>
        <div className="trending-products"><img src="../../../public/images/smallCaraousel/card3.jpg" alt="" /></div>
        <div className="trending-products"><img src="../../../public/images/smallCaraousel/card4.jpg" alt="" /></div>
        <div className="trending-products"><img src="../../../public/images/smallCaraousel/card5.png" alt="" /></div>
      </div>
    </>
  );
};

export default TrendingProduct;
