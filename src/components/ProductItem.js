import "../css/Productitem.css";
import { useDispatch, useSelector } from "react-redux";
import { addtoProduct } from "../reducer/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const ProductItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(products, "products");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleAddToCart = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    console.log("isItemInCart", isItemInCart);
    if (isItemInCart) {
      toast.error("Item already in cart");
    } else {
      dispatch(addtoProduct(item));
      toast.success("Added to cart");
    }

    navigate("./");
  };

  const AddButton = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    console.log("isItemInCart", isItemInCart);
    if (isItemInCart) {
      return "Already Cart";
    } else {
      return "Add to Cart";
    }
  };
  const changeHandler = (event) => {
    const val = event.target.value;
    setSelectedCategory(val);
  };

  const filteredProducts = selectedCategory === "all" ? products : products.filter(item => item.category === selectedCategory);
  return (
    <div className="product-container">
      <div className="first">
        
        <div className="category">
        <h3>filter</h3>
          <div>
          <input
            type="radio"
            id="all"
            name="category"
            value="all"
            checked={selectedCategory === "all"}
            onChange={changeHandler}
          />
          <label htmlFor="all">All Category</label>
          </div><div>
          <input
            type="radio"
            id="titan"
            name="category"
            value="titan"
            checked={selectedCategory === "titan"}
            onChange={changeHandler}
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
            onChange={changeHandler}
          />
          <label htmlFor="lorem">Lorem</label>
          </div>
        </div>
      </div>
      <div className="second">
      {filteredProducts.map((item) => (
        <div className="cart-container" key={item.id}>
          <div>
            <div className="cart-img">
              <img src={item.img} alt="Image" />
            </div>
            <div className="cart-heading">
              <h5>{item.title}</h5>
            </div>
            <div className="cart-value">
              <div className="price">
                Price : <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>
                {item.price}
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
