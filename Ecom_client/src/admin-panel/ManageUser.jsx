import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useManageuserMutation,
  useUpdateUserMutation,
} from "../store/usersApiSlice";
import AdminListLayout from "./AdminListLayout";
import UserListLayout from "./UserListLayout";

const ManageUser = () => {
  const { userList } = useSelector((state) => state.allusers);
  const [filteredUsers, setFilteredUsers] = useState([]);

  //   const [_id, setId] = useState("");
  //   const [deleted, setDeleted] = useState("");
  //   const [btnName, setBtnName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [UpdateUser] = useUpdateUserMutation();
  const [UserList] = useManageuserMutation();

  let filterData = userList;

  // filterWrapper=()
  //   const filterUser = (user) => {
  //     setFilteredUsers(
  //       filterData.filter((data) => {
  //         return data.deleted === true;
  //       })
  //     );
  //   };

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);
  const filteredList = filteredUsers.filter((data) => {
    return data.deleted === false && data.isAdmin === false;
  });
  const adminList = filteredUsers.filter((data) => {
    return data.isAdmin === true;
  });
  console.log(filteredList);
  //   const restoreUser = async (e, identity) => {
  //     e.preventDefault();
  //     console.log();
  //     setId(identity);

  //     try {
  //       const res = await UpdateUser({
  //         _id: id,
  //         deleted: false,
  //       }).unwrap();
  //       dispatch(getAllUser({ ...res }));
  //     } catch (error) {}
  //   };

  return (
    <div className="container ">
      <div class="mt-5 row row-cols-1 row-cols-md-3 g-4">
        <AdminListLayout adminList={adminList} />
        <UserListLayout filteredList={filteredList} />
      </div>
    </div>
  );
};

export default ManageUser;
