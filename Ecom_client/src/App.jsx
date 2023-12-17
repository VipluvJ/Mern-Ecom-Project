import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAllCategoryMutation } from "./store/categoryApiSlice";
import { getAllCategory } from "./store/categorySlice";

function App() {
  const handleOnclick = (e) => {};
  const [AllCategory] = useAllCategoryMutation();
  const dispatch = useDispatch();

  const allCategories = async () => {
    try {
      const res = await AllCategory({}).unwrap();
      dispatch(getAllCategory({ ...res }));
      // console.log(listOfCategory);
      // navigate("/admin-user-list");
    } catch (error) {}
  };
  useEffect(() => {
    allCategories();
  }, []);

  return (
    <>
      <Header></Header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
          // width: "100%",
          backgroundImage: "url(bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
