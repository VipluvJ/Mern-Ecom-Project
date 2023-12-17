import React from "react";
import { BsBoxes } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { MdAdminPanelSettings, MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIdVal } from "../store/toggleIdSlice";

const AdminListLayout = ({ adminList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(adminList);

  // const passStatus = async (e, identity, delVal) => {
  //   console.log(!delVal);
  //   e.preventDefault();
  //   setDeleted(!delVal);
  //   setId(identity);
  // };
  return (
    <>
      {adminList.map((data) => (
        // <div type="button" class="btn btn-primary position-relative">

        <div class="col ">
          <div class="card h-100 bg-dark user-manage position-relative">
            <ul class="list-group list-group-flush  ">
              <li class="list-group-item bg-dark text-white ">
                <h5 class="card-title">{data.name}</h5>
              </li>
              <li
                class="list-group-item bg-dark text-white "
                style={{ borderBottom: "1px solid white" }}
              >
                {data.email}
              </li>
            </ul>
            <div class="card-body">
              <p class="card-text">
                {data.address}
                {data.phone}
              </p>
            </div>
            {/* <>{}</> */}
            <div class="set-admin d-flex justify-content-center  ">
              <div className="w-100">
                <button
                  type="button"
                  class=" btn btn-outline-secondary w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ border: "none" }}
                  value="adminToggle"
                  onClick={(e) => {
                    setBtnName("adminToggle");
                    dispatch(setIdVal(data._id));

                    navigate("/admin-user-list");
                  }}
                >
                  <small style={{ fontSize: "25px", color: "cyan" }}>
                    <GrUserAdmin />
                  </small>
                  <p style={{ fontSize: "16px", color: "white" }}>
                    Admin Toggle
                  </p>
                </button>
              </div>
            </div>
            <div class="set-admin d-flex justify-content-center ">
              <button
                type="button"
                class="btn btn-outline-secondary w-50"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ border: "none" }}
                value="Delete"
                onClick={(e) => {
                  dispatch(setIdVal(data._id));

                  setBtnName("Delete");
                  navigate("/admin-user-list");
                }}
              >
                <small style={{ fontSize: "25px", color: "red" }}>
                  <MdDeleteOutline />
                </small>
                <p style={{ fontSize: "16px", color: "white" }}>Delete User</p>
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary w-50"
                style={{ border: "none" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <small style={{ fontSize: "25px", color: "yellow" }}>
                  <BsBoxes />
                </small>
                <p style={{ fontSize: "16px", color: "white" }}>
                  Order History
                </p>
              </button>
            </div>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill "
              style={{
                width: "3rem",
                color: "#e53935",
                border: "0.2rem solid #34495e",
                backgroundColor: "#69f0ae",
                fontSize: "1rem",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
            >
              <MdAdminPanelSettings />

              <span class="visually-hidden">unread messages</span>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminListLayout;
