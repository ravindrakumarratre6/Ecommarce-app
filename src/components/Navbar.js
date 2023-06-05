import { useDispatch, useSelector } from "react-redux";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const totalProduct = useSelector((state) => state.cart.totalProduct);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  // const dispatch = useDispatch();

  // const changeHandler = (event) => {
  //   event.preventDefault();

  //   console.log(event.target.value);
  //   const val = event.target.value;
  //   console.log("val", val);
  //   console.log("e1");
  //   dispatch(updateProduct(val));
  //   console.log("e2");
  // };

  return (
    <div className="container">
      <ul className="nav" >
        <li style={{flex:2}}>
          {/* ecommerce navbar */}
          <Link to="/" className="ecom-nav">
            Ecommerce
          </Link>
        </li>
        {/* <li className="category">
          <select onChange={changeHandler}>
            <option value="all">Category</option>
            <option value="titan">Titan</option>
            <option value="lorem">Lorem</option>
          </select>
        </li> */}

        <li>
          {isAuthenticated && (
            <img
              src={user.picture}
              alt="Logo"
              style={{ borderRadius: "50%" }}
            />
          )}
        </li>
        <li>
          {isAuthenticated && <span className="user-name">{user.name}</span>}
        </li>
        {isAuthenticated ? (
          <li>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => loginWithRedirect()}>Log In</button>
          </li>
        )}
        <li className="value">
          <p className="total">{totalProduct}</p>
        </li>
        <li>
          <Link to="/carts" style={{ textDecoration: "none" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
              alt="Cart"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
