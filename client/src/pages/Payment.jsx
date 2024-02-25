import axios from "axios";
import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import Checkout from "./Checkout.jsx";


const Payment = () => {


  return (
    <Layout>
      <div className="container-fluid">
        <div className="container d-flex align-item-center justify-content-center h-100vh"
        
        >
          <Checkout
          amount={7000}
            checkoutHandler={checkoutHandler}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
