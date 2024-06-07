import "../css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  addToProduct,
  incrementQuantity,
  decrementQuantity,
  removeProductData
} from "../reducer/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FaRupeeSign } from "react-icons/fa";
import { useState,useEffect} from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
const [redirectToCheckout, setRedirectToCheckout] = useState(false);
  const navigate = useNavigate();
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

    useEffect(() => {
      if (redirectToCheckout) {
        dispatch(removeProductData()); // Clear cart data
        navigate("/cartorder", { state: { redirectToCheckout: true } }); // Redirect to the checkout page
      }
    }, [redirectToCheckout]);

    const handleCheckout = () => {
      if (isAuthenticated) {
        setRedirectToCheckout(true); // Set flag to true to redirect and clear cart data
      } else {
        loginWithRedirect();
      }
    };

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
