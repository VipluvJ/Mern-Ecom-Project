import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const ProductCart = () => {
  const { listOfProducts } = useSelector((state) => state.allProducts);
  const { cartItems } = useSelector((state) => state.cart);
  const [total, setTotal] = useState("");
  const dispatch = useDispatch();
  const keyPrice = cartItems.filter((item) => {
    return item.prodPrice;
  });

  useEffect(() => {
    const totalPrice = keyPrice.reduce((total, item) => {
      if (keyPrice.length >= 1) {
        return (total += item.prodPrice);
      } else {
        return (total = 0);
      }
    }, 0);
    setTotal(totalPrice);
    console.log(totalPrice);
  }, [cartItems]);

  const increasePricing = (cartProdId) => {
    const cartProducts = listOfProducts.find((data) => {
      return data._id === cartProdId;
    });
    dispatch(
      addToCart({
        clicked: "increase",
        identifier: cartProdId,
        prices: cartProducts.price,
      })
    );
  };
  const decreasePricing = (cartProdId) => {
    const cartProd = listOfProducts.find((data) => {
      return data._id === cartProdId;
    });
    dispatch(
      addToCart({
        clicked: "decrease",
        identifier: cartProdId,
        prices: cartProd.price,
      })
    );
  };

  const handlePayment = async (amount) => {
    try {
      const response = await axios.post("/api/orders/create-order", {
        products: cartItems.map((item) => ({
          productId: item.Id,
          quantity: item.quantity,
        })),
        amount,
      });
      const orderId = response.data.id;
      const options = {
        key: "rzp_test_3xE6Gnvj2oZoZD",
        amount: response.data.amount,
        currency: "INR",
        order_id: response.data.id,
        name: "Cart App",
        description: "Payment for Products",
        handler: async (response) => {
          // try {
          //   await axios.post("/api/orders/verify-payment", {
          //     razorpay_order_id: response.razorpay_order_id,
          //     razorpay_payment_id: response.razorpay_payment_id,
          //     razorpay_signature: response.razorpay_signature,
          //   });

          //   // Clear the cart after successful payment

          //   alert("Payment successful!");
          // }
          const data = {
            
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await axios.post("/api/orders/verify-payment", data);
          alert(result.data.msg);
          //  catch (error) {
          //   console.log("Error verifying payment", error);
          //   alert("Payment verification failed");
          // }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order", error.response.data);
    }
  };

  return (
    <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="card">
              <div class="card-body p-4">
                <div class="row">
                  <div class="col-lg-7">
                    <h5 class="mb-3">
                      <a href="#!" class="text-body">
                        <i class="fas fa-long-arrow-alt-left me-2"></i>Continue
                        shopping
                      </a>
                    </h5>
                    <hr />

                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p class="mb-1">Shopping cart</p>
                        <p class="mb-0">You have 4 items in your cart</p>
                      </div>
                      <div>
                        <p class="mb-0">
                          <span class="text-muted">Sort by:</span>{" "}
                          <a href="#!" class="text-body">
                            price <i class="fas fa-angle-down mt-1"></i>
                          </a>
                        </p>
                      </div>
                    </div>
                    {cartItems.map((data) => (
                      <div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={data.prodImg}
                                  class="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div class="ms-3">
                                <h5>{data.prodBrand}</h5>
                                <p class="small mb-0">{data.prodName}</p>
                              </div>
                            </div>
                            <div
                              class="d-flex  align-items-center \mb-2"
                              style={{ width: "200px" }}
                            >
                              <button
                                class="btn btn-primary px-3 me-2"
                                style={{ height: "2.5rem" }}
                                onClick={() => {
                                  decreasePricing(data.Id);
                                }}
                              >
                                <FaMinus />
                              </button>

                              <div class="form-outline">
                                {/* <input
                                id="form1"
                                min="0"
                                name="quantity"
                                value="1"
                                type="number"
                                class="form-control"
                                style={{
                                  width: "50px",
                                  outline: "none",
                                  border: "none",
                                }}
                              /> */}
                                <label
                                  class="form-label me-2 ms-2"
                                  for="typeName"
                                >
                                  {data.quantity}
                                </label>
                              </div>

                              <button
                                class="btn btn-primary px-3 ms-2"
                                style={{ height: "2.5rem" }}
                                onClick={() => {
                                  increasePricing(data.Id);
                                }}
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <div
                              class="d-flex flex-row align-items-center justify-content-center"
                              style={{ width: "100px" }}
                            >
                              <div>
                                <h5 class="mb-0">900</h5>
                              </div>
                              <Link
                                href="#!"
                                style={{
                                  color: "#cecece",
                                  marginLeft: "1rem",
                                }}
                              >
                                <FaTrashAlt />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div class="col-lg-5">
                    <div class="card bg-primary text-white rounded-3">
                      <div class="card-body">
                        <hr class="my-4" />

                        <div class="d-flex justify-content-between">
                          <p class="mb-2">Subtotal</p>
                          <p class="mb-2">$4798.00</p>
                        </div>

                        <div class="d-flex justify-content-between">
                          <p class="mb-2">Shipping</p>
                          <p class="mb-2">$20.00</p>
                        </div>

                        <div class="d-flex justify-content-between mb-4">
                          <p class="mb-2">Total(Incl. taxes)</p>
                          <p class="mb-2">$4818.00</p>
                        </div>

                        <button
                          type="button"
                          class="btn btn-info btn-block btn-lg"
                          onClick={() => handlePayment(total)}
                        >
                          <div class="d-flex justify-content-between">
                            <span>Pay {total} INR </span>
                            <span>
                              <i class="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCart;
