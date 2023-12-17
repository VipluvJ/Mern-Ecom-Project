import { createSlice } from "@reduxjs/toolkit";

const initialAllUserState = { userList: [] };
//   userList: localStorage.getItem("userList")
//     ? JSON.parse(localStorage.getItem("userList"))
//     : null,

const usersSlice = createSlice({
  name: "allusers",
  initialState: initialAllUserState,
  reducers: {
    getAllUsers: (state, action) => {
      state.userList = action.payload.user;
      console.log(state.userList);
      //   localStorage.setItem("userList", JSON.stringify(action.payload));
    },
    //     delUserList: (state) => {
    //       state.userList = null;
    //       localStorage.removeItem("userList");
    //     },
  },
});

export const { getAllUsers, delUserList } = usersSlice.actions;

export default usersSlice.reducer;
