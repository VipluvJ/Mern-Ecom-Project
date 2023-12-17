import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useManageProductMutation } from "../store/productApiSlice";
import { getProduct } from "../store/productSlice";
import {
  useLogoutMutation,
  useManageuserMutation,
} from "../store/usersApiSlice";
import { getAllUsers } from "../store/usersSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.allusers);
  const { listOfProducts } = useSelector((state) => state.allProducts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Logout] = useLogoutMutation();
  const [UserList] = useManageuserMutation();
  const [ProductList] = useManageProductMutation();

  const logoutHandler = async () => {
    try {
      if (userInfo === null) {
        navigate("/sign-In");
      } else {
        const res = await Logout().unwrap();
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error.data.message || error);
    }
  };

  const fetchAllUser = async () => {
    try {
      const res = await UserList({}).unwrap();
      dispatch(getAllUsers({ ...res }));
      console.log(userList);
      // navigate("/admin-user-list");
    } catch (error) {}
  };

  useEffect(() => {
    if (userInfo) {
      fetchAllUser();
    }
  }, []);

  

  const fetchAllProduct = useCallback(async () => {
    try {
      const res = await ProductList({}).unwrap();
      dispatch(getProduct({ ...res }));
      console.log(listOfProducts);
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);
  return (
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div class="container-fluid">
        <Link to="#" class="navbar-brand">
          Brand
        </Link>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse1"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse1">
          <div class="navbar-nav">
            <Link
              to="/"
              class="nav-item nav-link active"
              onClick={fetchAllProduct}
            >
              Home
            </Link>
            <a href="#" class="nav-item nav-link">
              About
            </a>
            <Link class="nav-item nav-link ">Products</Link>
            {userInfo?.user?.isAdmin === true ? (
              <Link
                to="/admin-user-list"
                class="nav-item nav-link active"
                onClick={(e) => fetchAllUser(e)}
              >
                Admin
              </Link>
            ) : null}
          </div>
          <form class="d-flex ms-auto">
            {/* <div class="input-group rounded"> */}
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
            {/* </div> */}
          </form>

          <button
            type="button"
            class="btn btn-outline-light"
            onClick={logoutHandler}
          >
            {userInfo ? "Sign-Out" : "Sign-In"}
          </button>
          <button
            type="button"
            class="btn btn-outline-light"
            onClick={() => {
              !userInfo ? navigate("/sign-up") : navigate("/");
            }}
          >
            {userInfo ? `Hello ${userInfo.user?.name}` : "Sign-Up"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
