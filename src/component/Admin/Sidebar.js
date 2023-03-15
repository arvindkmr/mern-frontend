import React, { useEffect } from 'react';
import './sidebar.css';
import logo from '../../images/1.jpg';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  const params =useParams()
  useEffect(() => {
    // console.log("param changed")
  }, [params])
  
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="MainPhoto" />
      </Link>
      <Link to="/admin/dashboard">
        <p>Dashboard</p>
      </Link>

      <Link to="/admin/products">
        <div nodeId="2" label="All" />
        products
      </Link>

      <Link to="/admin/product">
        <div nodeId="3" label="Create" />
        create product
      </Link>

      <Link to="/admin/orders">
        <p>Orders</p>
      </Link>
      <Link to="/admin/users">
        <p>Users</p>
      </Link>
      <Link to="/admin/reviews">
        <p>Reviews</p>
      </Link>
    </div>
  );
};

export default Sidebar;
