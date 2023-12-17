import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { useLoginMutation } from "../store/usersApiSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      console.log(error.data || error);
    }
  };

  return (
    <div className="container store-landing" style={{}}>
      <section
        style={{
          marginBottom: "1rem",
          display: "inline-flex",
          justifyContent: "center",
          // border: "2px solid #675C5B",
          width: "100%",
          gap: "4rem",
        }}
      >
        <form onSubmit={submitHandler}>
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example3cg">
              Email-ID
            </label>
            <input
              value={email}
              type="email"
              id="form3Example3cg"
              class="form-control form-control-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">
              Password
            </label>
            <input
              value={password}
              type="password"
              id="form3Example4cg"
              class="form-control form-control-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button class="btn btn-secondary rounded-pill m_button" type="submit">
            Log In
          </button>
        </form>

        {/* <!-- Button trigger modal --> */}
        {/* <button
        type="button"
        class="btn btn-secondary rounded-pill m_button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        SIGN IN
      </button>

      {/* <!-- Modal --> */}
        {/* <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="container modal-body">
              <div class="modal-body p-5 pt-0">
                <form class="">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control rounded-3"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control rounded-3"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <button
                    class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                    type="submit"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        {/* <button type="button" class="btn btn-outline-secondary m_button">
        SIGN UP
      </button> */}
      </section>
    </div>
  );
};

export default Login;
