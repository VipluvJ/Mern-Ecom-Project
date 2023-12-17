import React from "react";
import { BsBoxes } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDelVal } from "../store/toggleDelSlice";
import { setIdVal } from "../store/toggleIdSlice";

const UserListLayout = ({ filteredList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(filteredList);
  // const passStatus = async (e,) => {
  //   console.log(!delVal);
  //   e.preventDefault();

  // };
  return (
    <>
      {filteredList.map((data) => (
        <div class="col ">
          <div class="card h-100 bg-dark user-manage">
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
                  onClick={(e) => {
                    setBtnName("adminToggle");
                    dispatch(setIdVal(data._id));
                    dispatch(setDelVal(data.isAdmin));
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
                  dispatch(setDelVal(data.deleted));
                  setBtnName("Delete");
                  // navigate("/admin-user-list");
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
          </div>
        </div>
      ))}
    </>
  );
};

export default UserListLayout;
