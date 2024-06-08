import "../css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  addToProduct,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setOrder,
  clearOrder,
} from "../reducer/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

    // useEffect(() => {
    //  // how clearchart
      
    //   console.log("Current cart state: ", state.cart);
    // }, []);

  const remove = (id) => {
    dispatch(removeProduct(id));
    toast.error("Removed from cart");
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    state.cart.forEach((item) => {
      subtotal += item.price * item.qty;
    });
    return subtotal;
  };

const handleCheckout = () => {
  if (isAuthenticated) {
    dispatch(setOrder(state.cart)); // Set the order data
    //  // Clear the cart
    // dispatch(clearOrder())
    dispatch(clearCart());
    navigate("/cartorder"); // Navigate to the CartOrder page
    toast.success("Thank you for your order!"); // Display success toast
  } else {
    loginWithRedirect();
  }
};

useEffect(() => {
  console.log("Current cart state: ", state.cart);
}, [state.cart]);


  const handleAddToCart = (item) => {
    dispatch(addToProduct(item));
  };

  const incrementQty = (id) => {
    dispatch(incrementQuantity(id));
  };

  const decrementQty = (id) => {
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
                <img src={val.img} alt={val.title} />
              </div>
              <div className="heading">
                <h3>{val.title}</h3>
              </div>
              <div className="price">
                {/* Using Font Awesome Icon */}
                <p>
                  {/* Using React Icon */}
                  <FaRupeeSign /> {val.price}
                </p>
              </div>
              <div className="btn">
                <button className="minus" onClick={() => decrementQty(val.id)}>
                  -
                </button>
                <input
                  value={val.qty}
                  onChange={(e) => handleAddToCart(parseInt(e.target.value))}
                />
                <button className="plus" onClick={() => incrementQty(val.id)}>
                  +
                </button>
              </div>
              <div>
                <i
                  className="fa-sharp fa-solid fa-trash delete"
                  onClick={() => remove(val.id)}
                ></i>
              </div>
            </div>
          ))}
          <div>
            <h2 className="subtotal">
              Subtotal: <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
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
