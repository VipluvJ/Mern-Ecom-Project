import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
const Home = () => {
  const { listOfProducts } = useSelector((state) => state.allProducts);
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(cartItems);
  const sendToCart = (e, pId, pName, pBrand, pImg, pPrice) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: pId,
        name: pName,
        brand: pBrand,
        images: pImg,
        prices: pPrice,
      })
    );
  };

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
                  {cartItems?.find((item) => {
                    return item.Id === data._id;
                  }) ? (
                    <Link class="btn btn-outline-dark mt-auto mb-2">
                      Go to Cart
                    </Link>
                  ) : (
                    <Link
                      class="btn btn-outline-dark mt-auto mb-2"
                      onClick={(e) =>
                        sendToCart(
                          e,
                          data._id,
                          data.productName,
                          data.brand,
                          data.files[0],
                          data.price
                        )
                      }
                    >
                      Add to Cart
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
