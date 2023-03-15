import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);