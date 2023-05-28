
import "../css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../reducer/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { addtoProduct,incrementQuantity,decrementQuantity} from "../reducer/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  console.log("state2", state);

  const remove = (id) => {
    console.log("remove");
    dispatch(removeProduct(id));
    toast.success("Removed from cart");
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    state.cart.forEach((item) => {
      subtotal += item.price * item.qty;
      console.log(item.price)
    });
    console.log("sub",subtotal)
    return subtotal; 
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      // Perform the checkout process

      toast.success(
        `Checkout successful! 
         ${user.name} 
        Your Item Delivered Sortly`
      );
    } else {
      // Redirect the user to login
      loginWithRedirect();
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addtoProduct(item));
  };
const incrementQty =(id)=>{
  dispatch(incrementQuantity(id))
}
const decrementQty =(id)=>{
  console.log("idw",id)
    dispatch(decrementQuantity(id))
}
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
                <p ><i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{val.price}</p>
              </div>
              <div className="btn">
                <button onClick={() => decrementQty(val.id)}>-</button>
                <input
                  value={val.qty}
                  onChange={(e) =>  handleAddToCart(parseInt(e.target.value))}
                />
                <button onClick={(e) => incrementQty(val.id)}>+</button>
              </div>
              <div>
                <button className="delete" onClick={() => remove(val.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div>
            <h2 className="subtotal">Subtotal: <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{calculateSubtotal()}/-</h2>
          </div>
          <div className="checkout">
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>

            {isAuthenticated ? (
              <Link to="/cartoder">
              <button onClick={()=>handleCheckout()}>CheckOut</button>
              </Link>
              
            ) : (
              <>
                <button>CheckOut</button>
                <p>Please login to proceed with the checkout.</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <h1 className="no-cart">No items in the cart.</h1>
      )}
      <Toaster />
    </div>
  );
};

export default Cart;
