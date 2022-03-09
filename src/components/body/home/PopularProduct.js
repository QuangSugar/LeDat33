import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fCurrency } from "../../utils/FormatCost";

const PopularProduct = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [proMain, setProMain] = useState([]);
  const [cateSelect, setCateSelect] = useState({ id: 0 });

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      let data = products.filter((item) => item.product.id === cateSelect.id);
      if (data) {
        setProMain(data);
      }
    }
  }, [products, cateSelect]);
  const getCategory = async () => {
    try {
      let res = await axios.get("https://localhost:44349/api/Categories");
      if (res && res.data) {
        setCategory(res.data.$values);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getProduct = async () => {
    try {
      let res = await axios.get("https://localhost:44349/api/Products");
      if (res && res.data) {
        setProducts(res.data.$values);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectCategory = (item) => {
    setCateSelect(item);
  };

  return (
    <div className="list-item-area pb-70">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="section-title">
              <h2>Most Popular Products</h2>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="list-item-top">
              <ul className="filter-menu">
                <li
                  className="filter active"
                  onClick={() => handleSelectCategory({ id: 0 })}
                  data-filter="all"
                >
                  All Item
                </li>
                {category &&
                  category.length > 0 &&
                  category.map((item, index) => {
                    if (cateSelect.id == item.id) {
                      return (
                        <li
                          key={index}
                          onClick={() => handleSelectCategory(item)}
                          className="filter active"
                          data-filter="all"
                        >
                          {item.name}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={index}
                          onClick={() => handleSelectCategory(item)}
                          className="filter"
                        >
                          {item.name}
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div id="Container" className="row pt-45">
          {proMain &&
            proMain.length > 0 &&
            proMain.map((item, index) => {
              return (
                <>
                  <div
                    className="col-lg-4 col-sm-6 mix rising"
                    style={{ display: "inline-block" }}
                    data-bound
                  >
                    <div className="list-item-card">
                      <div className="list-item-card-img">
                        <Link
                          className={"image-product"}
                          to={`/detail-products/${item.product.id}`}
                        >
                          <img
                            src={`https://localhost:44349/uploads/${item.image}`}
                            alt="Product Images"
                          />
                        </Link>
                        <ul className="list-item-card-action">
                          <li>
                            <a href="#">
                              <i className="bx bx-repost" />
                            </a>
                          </li>
                          <li>
                            <a href="wishlist.html">
                              <i className="bx bx-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="cart.html">
                              <i className="bx bx-cart" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="content">
                        <h3>
                          <Link to={`/detail-products/${item.product.id}`}>
                            {item.product.name}
                          </Link>
                        </h3>
                        <span>
                          {item.product.priceSale > 0 ? (
                            <>
                              {fCurrency(item.product.priceSale * 1000)} /{" "}
                              {item.product.dvt} / {item.product.weight}{" "}
                              <del>{fCurrency(item.product.price * 1000)}</del>
                            </>
                          ) : (
                            <>
                              {fCurrency(item.product.price * 1000)} /{" "}
                              {item.product.dvt} / {item.product.weight}{" "}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
