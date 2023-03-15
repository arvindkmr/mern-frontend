import React, { Fragment, useEffect, useState } from 'react';
import './Home.css';
import ProductCard from './ProductCart';
import MetaData from '../layout/MetaData.js';
import { getProduct } from '../../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  const notify = () => {
    toast.error('Error Occurred !');
  };
  useEffect(() => {
    if (error) {
      toast.error(`${error}`);
      // dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Arvind Baloda- Ecom - MERN stack" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <button onClick={notify}>Notify</button>;
          <ToastContainer />
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
