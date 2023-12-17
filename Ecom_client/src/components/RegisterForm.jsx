import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { useRegisterMutation } from "../store/usersApiSlice";

const RegisterForm = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Register] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitRegisterHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await Register({
        name,
        email,
        password,
        address,
        phone,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      console.log(error.data || error);
    }
  };
  return (
    <div className="container store-landing" >
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
        <div className="register">
          <form className="register-form" onSubmit={submitRegisterHandler}>
            <div class="form-outline mb-3">
              <label class="form-label">Full Name</label>
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Email-ID</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Address</label>
              <input
                type="textarea"
                onChange={(e) => setAddress(e.target.value)}
                class="form-control form-control-lg"
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Number</label>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                class="form-control form-control-lg"
              />
            </div>

            <div class="d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-secondary rounded-pill m_button"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
