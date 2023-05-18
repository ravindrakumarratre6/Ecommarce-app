


import { useSelector } from "react-redux";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const totalProduct = useSelector((state) => state.cart.totalProduct);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="container">
      <ul className="nav">
        <li style={{ flex: 3 }}>
          {/* ecommerce navbar */}
          <Link to="/" className="ecom-nav">
            Ecommerce
          </Link>
        </li>
        <li>
          <img src="https://cdn-icons-png.flaticon.com/512/1184/1184438.png" alt="Logo" />
        </li>
        <li>
          {isAuthenticated && <span className="user-name">{user.name}</span>}
        </li>
        {isAuthenticated ? (
          <li>
            <button
              onClick={() =>
                logout({ returnTo: window.location.origin })
              }
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
          <Link to="/carts/:id" style={{ textDecoration: "none" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" alt="Cart" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
