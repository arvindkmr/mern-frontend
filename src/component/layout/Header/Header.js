import { useState, useEffect, useLayoutEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="header">
      <Link className="productCard" to={`/`}>
        Home
      </Link>
      <Link className="productCard" to={`/orders`}>
        orders
      </Link>
      <Link className="productCard" to={`/products`}>
        Products
      </Link>
      <Link className="productCard" to={`/search`}>
        <AiOutlineSearch />
      </Link>
      <Link className="productCard" to={`/login`}>
        Login
      </Link>
      <Link className="productCard" to={`/cart`}>
        
        <p>Cart Quanity : {cartItems?.reduce((acc, item) => acc + item.quantity,0)}</p>
        
      </Link>
    </div>
  );
};

// cartItems.reduce(acc, item)=> acc + (item.quantity* item.price)
export default Header;
