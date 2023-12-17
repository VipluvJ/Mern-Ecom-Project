import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { useLoginMutation } from "../store/usersApiSlice";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Admin] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Admin({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      console.log(error.data.message || error);
    }
  };

  return (
    <div class="container pt-3 py-4" id="custom-cards">
      <div class="row row-cols-1 row-cols-lg-2 align-items-stretch g-4 py-5">
        <div class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{ backgroundImage: "url(unsplash-photo-1.jpg)" }}
          >
            <div class="d-flex flex-column h-100 p-5 pb-3 text-center text-white text-shadow-1">
              <h3 class="pb-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                Manage Users
              </h3>
              <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">
                  <img
                    src="https://github.com/twbs.png"
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    class="rounded-circle border border-white"
                  />
                </li>
                <li>
                  <button type="button" class="btn btn-primary">
                    Total Users <span class="badge text-bg-secondary">4</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{ backgroundImage: "url(unsplash-photo-2.jpg)" }}
          >
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-center text-shadow-1">
              <h3 class="pb-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                Manage Products
              </h3>
              <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">
                  <img
                    src="https://github.com/twbs.png"
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    class="rounded-circle border border-white"
                  />
                </li>
                <li class="d-flex align-items-center me-3">
                  <button type="button" class="btn btn-primary">
                    Total Products{" "}
                    <span class="badge text-bg-secondary">4</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{ backgroundImage: "url(unsplash-photo-3.jpg)" }}
          >
            <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
              <h3 class="pb-5 mt-5 mb-4 display-6 text-center  lh-1 fw-bold">
                Manage Orders
              </h3>
              <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">
                  <img
                    src="https://github.com/twbs.png"
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    class="rounded-circle border border-white"
                  />
                </li>
                <li class="d-flex align-items-center me-3">
                  <button type="button" class="btn btn-primary">
                    Total Orders <span class="badge text-bg-secondary">4</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{ backgroundImage: "url(unsplash-photo-1.jpg)" }}
          >
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 class="pb-5 mt-5 mb-4 display-6 text-center  lh-1 fw-bold">
                Manage Categories
              </h3>
              <ul class="d-flex list-unstyled mt-auto">
                <li class="me-auto">
                  <img
                    src="https://github.com/twbs.png"
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    class="rounded-circle border border-white"
                  />
                </li>
                <li class="d-flex align-items-center me-3">
                  <button type="button" class="btn btn-primary">
                    Total Categories{" "}
                    <span class="badge text-bg-secondary">4</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
