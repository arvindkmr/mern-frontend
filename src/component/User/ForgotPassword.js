import React, { Fragment, useState, useEffect } from 'react';
import './ForgotPassword.css';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const [email, setEmail] = useState('');

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    navigate('/login')
    // dispatch(forgotPassword(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        <button className="forgotPasswordBtn"  onClick={forgotPasswordSubmit}>Back to Login</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
