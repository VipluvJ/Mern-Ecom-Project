import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CreateProduct from "./admin-panel/CreateProduct.jsx";
import GetAllProduct from "./admin-panel/GetAllProduct.jsx";
import ManageProduct from "./admin-panel/ManageProduct.jsx";
import ManageUser from "./admin-panel/ManageUser.jsx";
import UpdateProduct from "./admin-panel/updateProduct.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Home from "./components/Home";
import Login from "./components/Login.jsx";
import ProductCart from "./components/ProductCart.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import "./index.css";
import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <RegisterForm />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin-user-list",
        element: <ManageUser />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/all-product",
        element: <GetAllProduct />,
      },
      {
        path: "/manage-product/:id",
        element: <ManageProduct />,
      },
      {
        path: "/update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/product-cart",
        element: <ProductCart />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
