import "bootstrap/js/dist/carousel.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const GetAllProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const [productId, setProductId] = useState("");
  const { listOfProducts } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setSingleProduct(listOfProducts);
  }, [listOfProducts]);
  const productDetails = singleProduct.filter((data) => {
    return data._id === productId;
  });
  console.log(listOfProducts);
  console.log(productDetails);
  return (
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {listOfProducts.map((data) => (
          <div class="col mb-5">
            <div class="card h-100">
              <div
                class="badge bg-dark text-white position-absolute"
                style={{ top: "0.5rem", right: "0.5rem" }}
              >
                Sale
              </div>
              <div>
                <div>
                  <img class="card-img-top" src={data.files[0]} alt="..." />
                </div>
              </div>
              <div class="card-body p-4">
                <div class="text-center">
                  <h5 class="fw-bolder">{data.brand}</h5>
                  <div class="d-flex justify-content-center small text-warning mb-2">
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                  </div>
                  <span class="text-muted text-decoration-line-through">
                    $20.00
                  </span>
                  {data.price}
                </div>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent g-2">
                <div class="text-center">
                  <Link
                    class="btn btn-outline-dark mt-auto mb-2"
                    onClick={(e) => {
                      setProductId(data._id);

                      navigate(`/manage-product/${data._id}`);
                      console.log(e);
                    }}
                  >
                    Manage Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProduct;
