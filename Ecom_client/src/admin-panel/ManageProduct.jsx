import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteProductMutation } from "../store/productApiSlice";

const ManageProduct = (props) => {
  const idObj = useParams();
  const navigate = useNavigate();
  const { listOfProducts } = useSelector((state) => state.allProducts);
  const productDetails = listOfProducts.filter((data) => {
    return data._id === idObj.id;
  });
  const [RemoveProduct] = useDeleteProductMutation();
  const deleteProduct = async () => {
    if (listOfProducts[0].deleted === false) {
      try {
        const res = await RemoveProduct({
          _id: listOfProducts[0]._id,
          deleted: true,
        }).unwrap();
        //  dispatch(getAllUser({ ...res }));
      } catch (error) {}
    } else {
      try {
        const res = await RemoveProduct({
          _id: listOfProducts[0]._id,
          deleted: false,
        }).unwrap();
        //  dispatch(getAllUser({ ...res }));
      } catch (error) {}
    }
  };
  console.log(idObj.id);
  return (
    <div className="container ">
      {productDetails.map((data) => (
        <div class="card mt-5">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={data.files[0]}
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{data.brand}</h5>
                <p class="card-text">
                  <small class="text-body-secondary">{data.productName}</small>
                </p>
                <p class="card-text">{data.description}</p>
              </div>
              <Link
                class="btn btn-info"
                onClick={() => {
                  navigate(`/update-product/${data._id}`);
                }}
              >
                Update
              </Link>
              <Link
                class="btn btn-info"
                onClick={() => {
                  deleteProduct();
                }}
              >
                Remove
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProduct;
