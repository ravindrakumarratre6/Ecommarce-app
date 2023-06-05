import "../css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../reducer/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addtoProduct,
  incrementQuantity,
  decrementQuantity,
} from "../reducer/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  console.log("state2", state);
  const navigate = useNavigate();
  const remove = (id) => {
    console.log("remove");
    dispatch(removeProduct(id));
    toast.error("Removed from cart");
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    state.cart.forEach((item) => {
      subtotal += item.price * item.qty;
      console.log(item.price);
    });
    console.log("sub", subtotal);
    return subtotal;
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/cartoder"); // Redirect to the checkout page
    } else {
      // Redirect the user to login
      loginWithRedirect();
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addtoProduct(item));
  };
  const incrementQty = (id) => {
    dispatch(incrementQuantity(id));
  };
  const decrementQty = (id) => {
    console.log("idw", id);
    dispatch(decrementQuantity(id));
  };
  return (
    <div className="cartcontainer">
      {Array.isArray(state.cart) && state.cart.length > 0 ? (
        <div>
          <h1 className="cartheading">Your Cart Item List</h1>
          {state.cart.map((val) => (
            <div className="cart" key={val.id}>
              <div className="imgs">
                <img src={val.img} alt="Image" />
              </div>
              <div className="heading">
                <h3>{val.title}</h3>
              </div>
              <div className="price">
                <p>
                  <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>
                  {val.price}
                </p>
              </div>
              <div className="btn">
                <button className="minus" onClick={() => decrementQty(val.id)}>-</button>
                <input
                  value={val.qty}
                  onChange={(e) => handleAddToCart(parseInt(e.target.value))}
                />
                <button className="plus" onClick={(e) => incrementQty(val.id)}>+</button>
              </div>
              <div>
                <i
                  className="fa-sharp fa-solid fa-trash  delete"
                  onClick={() => remove(val.id)}
                ></i>
              </div>
            </div>
          ))}
          <div>
            <h2 className="subtotal">
              Subtotal: <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>
              {calculateSubtotal()}/-
            </h2>
          </div>
          <div className="checkout">
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>

            {isAuthenticated ? (
          <button onClick={handleCheckout}>CheckOut</button>
        ) : (
          <>
            <button onClick={loginWithRedirect}>CheckOut</button>
            <p>Please login to proceed with the checkout.</p>
          </>
        )}
          </div>
        </div>
      ) : (
        <h1 className="no-cart">No items in the cart.</h1>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
