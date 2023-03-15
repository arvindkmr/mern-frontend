import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import { getProductDetails } from '../../actions/productActions.js';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader.js';
import Carousel from 'react-material-ui-carousel';
import MetaData from '../layout/MetaData';

import ReviewCard from './ReviewCard.js';
import { addItemsToCart } from '../../actions/cartAction';
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    // alert.success("Item Added To Cart");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item?.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    {quantity}
                    {/* <input readOnly type="number" value={quantity} style={{color:"black"}} /> */}
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => {
                  console.log(review);
                  
                  return <ReviewCard key={review._id} review={review} />;
                })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
