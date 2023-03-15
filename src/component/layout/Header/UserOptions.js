import React, { Fragment, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {
  // const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = [
    { name: 'logout', func: logoutUser, role: user?.role },
    { name: 'profile', func: profile, role: user?.role },
  ];
  function logoutUser() {
    dispatch(logout());
  }
  function profile() {
    navigate('/account');
  }
  return (
    <Fragment>
      <div>
        {item.map((item) => {
          return (
            <div>
              <button onClick={item.func}>{item.name}</button>
            </div>
          );
        })}
        {user?.role === 'admin' ? (
          <button onClick={() => navigate('/admin/dashboard')}>
            admin page
          </button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default UserOptions;
