import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (loading===false && isAuthenticated === false) {
    return navigate('/login');
  }

  if (loading===false && isAdmin === true && user.role !== 'admin') {
    // console.log(user.role,isAdmin, "isAdmin")
    return navigate('/');
  }
  return <>{loading === false ? <Component {...rest} /> : null}</>;
};

export default ProtectedRoute;
