import React, { useState, useEffect } from "react";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import "./Homepage.css";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout.jsx";
import { AiOutlineReload } from "react-icons/ai";

import "../../public/images/smallCaraousel/card1.jpeg";
import { addToCart } from "../features/cartSlice.jsx";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.allCart.items);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* main carousel start */}
      <div className="container-fluid mt-5">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="../../../public/images/Crousel/Crousel1.webp"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="../../../public/images/Crousel/Crousel2.webp"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="../../../public/images/Crousel/Crousel3.webp"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="../../../public/images/Crousel/Crousel4.webp"
                alt="Second slide"
              />
            </div>

            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="../../../public/images/Crousel/Crousel5.webp"
                alt="Second slide"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* main carousel end */}

      {/* card with carousel start */}
      <section className="pt-3 pb-5 electronics-slider">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 ">
              <h3 className="mb-1 text-right">Electronics </h3>
            </div>
            <div className="col-6 text-right">
              <a
                className=" left-arrow btn btn-primary mb-3 mr-1"
                href="#carouselExampleIndicators2"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-arrow-left" />
              </a>
              <a
                className="btn btn-primary mb-3 right-arrow "
                href="#carouselExampleIndicators2"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-arrow-right" />
              </a>
            </div>
            <div className="col-12">
              <div
                id="carouselExampleIndicators2"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid h-50"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=560&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=7c625ea379640da3ef2e24f20df7ce8d"
                          />
                          <div className="card-body">
                            <NavLink className="text-center">
                              Best of shavers
                            </NavLink>
                            <br></br>
                            <NavLink className="text-align-center">
                              From 1880{" "}
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=42b2d9ae6feb9c4ff98b9133addfb698"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              Best of Electronics
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">From 2890 </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=3d2e8a2039c06dd26db977fe6ac6186a"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              world chairs
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">From 2594 </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1532771098148-525cefe10c23?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=3f317c1f7a16116dec454fbc267dd8e4"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              Refrizerator
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">
                              From 10954{" "}
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1532715088550-62f09305f765?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=ebadb044b374504ef8e81bdec4d0e840"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              Electronics
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">From 1880 </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=0754ab085804ae8a3b562548e6b4aa2e"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              Best of shavers
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">From 2330 </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=ee8417f0ea2a50d53a12665820b54e23"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              Smartes Watches
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">From 3880 </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=8ac55cf3a68785643998730839663129"
                          />
                          <div className="card-body">
                            <NavLink className="card-title">
                              TV & acceseries
                            </NavLink>
                            <br></br>
                            <NavLink className="card-title">from 5932 </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img
                            className="img-fluid"
                            alt="100%x280"
                            src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMyMDc0fQ&s=5ee4fd5d19b40f93eadb21871757eda6"
                          />
                          <div className="card-body">
                            <NavLink className="text-center">
                              Smarts Coolers
                            </NavLink>
                            <br></br>
                            <NavLink className="text-center">
                              From 1380{" "}
                            </NavLink>
                          </div>
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

      {/* end card with carousel  */}

      {/* dynamic Products start */}
      <div className="container-fluid row mt-2 mb-4">
        <div className="col-md-2 mt-5">
          <h4 className="text-center">Filter By Categories</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>

        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className=" dynamic-porduct">
            {products?.map((p, id) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">Rs :{p.price}</h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    {/* <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button> */}
                    <Button className="dynamic-button">
                      <NavLink to={`/product/${p.slug}`} className="  ">
                        ADD TO CART
                      </NavLink>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* dynamic products end */}
    </Layout>
  );
};

export default Homepage;
