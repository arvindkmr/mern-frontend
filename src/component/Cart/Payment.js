import React, { Fragment, useEffect, useRef, useState } from 'react';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import './payment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createOrder, clearErrors } from '../../actions/orderAction';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const [cardNumber, setCardNumber] = useState();
  const [cardName, setCardName] = useState();
  const [cardCvv, setCardCvv] = useState();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // payBtn.current.disabled = true;
    dispatch(createOrder(order));
    navigate('/success')
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };
    //   const { data } = await axios.post(
    //     '/api/v1/payment/process',
    //     paymentData,
    //     config
    //   );
    // const client_secret = data.client_secret;

    // if (!stripe || !elements) return;

    // const result = await stripe.confirmCardPayment(client_secret, {
    //   payment_method: {
    //     card: elements.getElement(CardNumberElement),
    //     billing_details: {
    //       name: user.name,
    //       email: user.email,
    //       address: {
    //         line1: shippingInfo.address,
    //         city: shippingInfo.city,
    //         state: shippingInfo.state,
    //         postal_code: shippingInfo.pinCode,
    //         country: shippingInfo.country,
    //       },
    //     },
    //   },
    // });

    // if (result.error) {
    //   payBtn.current.disabled = false;

    //   alert.error(result.error.message);
    // } else {
    //   if (result.paymentIntent.status === "succeeded") {
    //     order.paymentInfo = {
    //       id: result.paymentIntent.id,
    //       status: result.paymentIntent.status,
    //     };

    //     history.push("/success");
    //   } else {
    //     alert.error("There's some issue while processing payment ");
    //   }
    // }
    // } catch (error) {
    //   payBtn.current.disabled = false;
    //   // alert.error(error.response.data.message);
    // }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <p>Card Info</p>
          <div>
            <input
              type="number"
              maxLength={5}
              placeholder="Enter card details"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="paymentInput"
            />
          </div>
          <div>
            <input
              type="text"
              maxLength={5}
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="paymentInput"
            />
          </div>
          <div>
            <input
              type="number"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
              className="paymentInput"
              placeholder="Enter CVV number"
            />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
