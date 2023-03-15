import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import WebFont from 'webfontloader';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import ForgotPassword from './component/User/ForgotPassword';
import Profile from './component/User/Profile';
import UpdatePassword from './component/User/UpdatePassword';
import UpdateProfile from './component/User/UpdateProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Cart from './component/Cart/Cart';
import NotFound from './component/layout/Not Found/NotFound';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import DashBoard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    store.dispatch(loadUser());
  }, []);
  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route
          exact
          path="/shipping"
          element={<ProtectedRoute component={Shipping} />}
        />
        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute component={ConfirmOrder} />}
        />
        <Route
          exact
          path="/process/payment"
          element={<ProtectedRoute component={Payment} />}
        />
        <Route
          exact
          path="/success"
          element={<ProtectedRoute component={OrderSuccess} />}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute component={MyOrders} />}
        />
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute component={OrderDetails} />}
        />
        <Route
          exact
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} component={DashBoard} />}
        />
        <Route
          exact
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} component={ProductList} />}
        />
        <Route
          exact
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
        />
        <Route
          exact
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />}
        />
        <Route
          exact
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} component={OrderList} />}
        />
        <Route
          exact
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
        />
        <Route
          exact
          path="/admin/users"
          elementusers={<ProtectedRoute isAdmin={true} component={UsersList} />}
        />
        <Route
          exact
          path="/admin/user/:id"
          elementusers={
            <ProtectedRoute isAdmin={true} component={UpdateUser} />
          }
        />
        <Route
          exact
          path="/admin/reviews"
          elementusers={
            <ProtectedRoute isAdmin={true} component={ProductReviews} />
          }
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            window.location.pathname === '/process/payment' ? null : (
              <NotFound />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
