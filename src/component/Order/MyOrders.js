import React, { Fragment, useEffect } from 'react';
import './myOrders.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const handleorder = (id ) => {

    navigate(`/order/${id}`);
  };
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          {orders?.map((item) => {
            
            const { orderStatus, orderItems, _id } = item;
            {
            }
            return (
              <div style={{ display: 'flex', flex: 'column' }}>
                <p style={{ padding: '5px' }}>{_id}</p>
                <p style={{ padding: '5px' }}>{orderStatus}</p>
                <button onClick={() => handleorder(_id)}>
                  check order details {_id}
                </button>
              </div>
            );
          })}
          <p id="myOrdersHeading">{user.name}'s Orders</p>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
