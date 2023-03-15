import React, { Fragment, useEffect } from 'react';
import './productList.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from '../../actions/productActions';
import SideBar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  console.log(products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert.success("Product Deleted Successfully");
      // history.push('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">View product</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {products?.map((product) => {
              console.log(product);
              return (
                <tbody>
                  <tr>
                    <th scope="row">{product._id.substring(1, 10)}...</th>
                    <td>Larry{product.name}/</td>
                    <td>{product.stock}</td>

                    <td>
                      <Link to={`/product/${product._id}`}> View product</Link>
                    </td>
                    <td>
                      <Link to={`/product/${product._id}`}> Delete</Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
