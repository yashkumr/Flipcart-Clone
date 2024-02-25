import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Auth.jsx";
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cartSlice.jsx";

const Checkout = () => {
  const [auth, setAuth] = useAuth();

  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/getkey");
    const {
      data: { order },
    } = await axios.post("http://localhost:8000/api/checkout", {
      amount,
    });
    // console.log("hello");
    // console.log(order);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:8000/api/paymentverification",
      redirect: true,
      prefill: {
        name: "Vimlesh",
        email: "vimleshkumarvimlesh63@gmail.com",
        contact: "9335140873",
      },
      notes: {
        address: "Curlec Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <Layout>
      <div>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">CheckOut Now - {cart.length} items</h5>
                  </div>
                  <div className="card-body">
                    {cart?.map((data) => (
                      <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div
                            className="bg-image hover-overlay hover-zoom ripple rounded"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={`/api/v1/product/product-photo/${data._id}`}
                              className="w-100"
                              alt="Blue Jeans Jacket"
                            />
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p>
                            <strong> Product : {data.name}</strong>
                          </p>

                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-1 mb-2"
                            data-mdb-toggle="tooltip"
                            title="Remove item"
                            onClick={() => dispatch(removeItem(data._id))}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <button
                              className="btn btn-primary px-3 me-2"
                              onClick={
                                data.quantity <= 1
                                  ? () => dispatch(removeItem(data.id))
                                  : () =>
                                      dispatch(decreaseItemQuantity(data.id))
                              }
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <div className="form-outline w-50">
                              <input
                                id="form1"
                                min="0"
                                name="quantity"
                                readOnly
                                value={data.quantity}
                                type="number"
                                className="form-control text-center m-0"
                                onChange={() => null}
                              />
                              {/* <label className="form-label ml-2" for="form1">
                                Quantity
                              </label> */}
                            </div>

                            <button
                              className="btn btn-primary px-3 ms-2"
                              onClick={() =>
                                dispatch(increaseItemQuantity(data.id))
                              }
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>

                          <p className="text-start text-md-center">
                            <strong> Price: {data?.price}</strong>
                          </p>
                        </div>
                        <hr className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Checout Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Total Quantity
                        <span>{totalQuantity}</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>{totalPrice}</strong>
                        </span>
                      </li>
                    </ul>

                    {/* <Link to="/product/checkout">
                      <button
                        onClick={() => checkoutHandler(totalPrice)}
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Pay Now
                      </button>
                    </Link> */}

                    <div className="mt-2">
                      {auth?.user?.address ? (
                        <>
                          <div className="mb-3">
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                navigate("/dashboard/user/profile")
                              }
                            >
                              Update Address
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="mb-3">
                          {auth?.token ? (
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                navigate("/dashboard/user/profile")
                              }
                            >
                              Update Address
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                navigate("/login", {
                                  state: "/product/checkout",
                                })
                              }
                            >
                              Plase Login to checkout
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      {!auth?.token || !cart?.length ? (
                        ""
                      ) : (
                        <>
                         

                          <Link to="/product/checkout">
                      <button
                        onClick={() => checkoutHandler(totalPrice)}
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Pay Now
                      </button>
                    </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Checkout;
