import "../css/Productitem.css";
import { useDispatch, useSelector } from "react-redux";
import { addToProduct } from "../reducer/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

const ProductItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const cartItems = useSelector((state) => state.cart.cart);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  // useEffect to retrieve data from localStorage on component mount
  // useEffect(() => {
  //   const storedCategory = localStorage.getItem("selectedCategory");
  //   const storedPriceRange = localStorage.getItem("priceRange");
  //   if (storedCategory) setSelectedCategory(storedCategory);
  //   if (storedPriceRange) setPriceRange(JSON.parse(storedPriceRange));
  // }, []);

  // useEffect to update localStorage whenever selectedCategory or priceRange changes
  // useEffect(() => {
  //   localStorage.setItem("selectedCategory", selectedCategory);
  //   localStorage.setItem("priceRange", JSON.stringify(priceRange));
  // }, [selectedCategory, priceRange]);

  const handleAddToCart = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      toast.error("Item already in cart");
    } else {
      dispatch(addToProduct(item));
      toast.success("Added to cart");
    }
    navigate("./");
  };

  const AddButton = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    return isItemInCart ? "Already in Cart" : "Add to Cart";
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const [minPrice, maxPrice] = value.split("-").map(Number);
    setPriceRange([minPrice, maxPrice]);
  };

  const filteredProducts = products.filter((item) => {
    const isCategoryMatch =
      selectedCategory === "all" || item.category === selectedCategory;
    const isPriceMatch =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return isCategoryMatch && isPriceMatch;
  });

  return (
    <div className="product-container">
      <div className="first">
        <div className="category">
          <h3 className="filter-heading">Filter</h3>
          <div>
            <input
              type="radio"
              id="all"
              name="category"
              value="all"
              checked={selectedCategory === "all"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="all">All Category</label>
          </div>
          <div>
            <input
              type="radio"
              id="titan"
              name="category"
              value="titan"
              checked={selectedCategory === "titan"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="titan">Titan</label>
          </div>
          <div>
            <input
              type="radio"
              id="lorem"
              name="category"
              value="lorem"
              checked={selectedCategory === "lorem"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="lorem">Lorem</label>
          </div>
          <div className="price-Range">
            <h4>Price Range</h4>
            <select onChange={handlePriceChange}>
              <option value="0-10000">All</option>
              <option value="0-500">0 - 500</option>
              <option value="500-1000">500 - 1000</option>
              <option value="1000-2000">1000 - 2000</option>
              <option value="2000-5000">2000 - 5000</option>
              <option value="5000-10000">5000 - 10000</option>
            </select>
          </div>
        </div>
      </div>
      <div className="second">
        {filteredProducts.map((item) => (
          <div className="cart-container" key={item.id}>
            <div>
              <div className="cart-img">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="cart-heading">
                <h5>{item.title}</h5>
              </div>
              <div className="cart-value">
                <div className="price">
                  Price : <FaRupeeSign /> {item.price}
                </div>
                <div className="addtobtn">
                  <button onClick={() => handleAddToCart(item)}>
                    {AddButton(item)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductItem;
