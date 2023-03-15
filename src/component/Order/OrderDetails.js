import React, { Fragment, useEffect, useState } from 'react';
import './orderDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { newReview, getAllReviews } from '../../actions/productActions';

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const [productID, setProductID] = useState();

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [review, setReview] = useState('');

  const submitReview = (productId) => {
    const myForm = new FormData();
    myForm.set('productId', productID);
    myForm.set('review', review);
    dispatch(newReview(myForm));
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setProductID(id)
  };
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch,  error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <p component="h1">Order #{order && order._id}</p>
              <p>Shipping Info</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order?.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <p>Payment</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === 'succeeded'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <p>Order Status</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <p>Order Items:</p>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => {
                    
                    return (
                      <div key={item.product}>
                        {/* <img src={item.image} alt="Product" /> */}
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{' '}
                        <span>
                          {item.quantity} X ₹{item.price} ={' '}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                        <Button
                          style={{ marginLeft: '20px' }}
                          variant="primary"
                          onClick={() => handleShow(item.product)}
                          className="submitReview"
                        >
                          Submit Review
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <textarea
                              type="text"
                              name="name"
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                              placeholder="Type review here"
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={submitReview}
                            >
                              Submit review
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
