import React from "react";
import "./orderSuccess.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
    
      <p>Your Order has been Placed successfully </p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
