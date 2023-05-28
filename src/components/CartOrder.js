import React from "react";
import "../css/CartOrder.css";
import { useSelector } from "react-redux";

const CartOrder = () => {
  const order = useSelector((state) => state.cart.cart);
  return (
    <div className="order-container">
      <h1>Your Order Cart</h1>
      {order.map((val) => (
        <table key={val.id}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{val.title}</td>
              <td>
                <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>
                {val.price}
              </td>
              <td>{val.qty}</td>
              <td>
                <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>
                {val.price * val.qty}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                Total ={" "}
                <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>
                {val.price * val.qty}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default CartOrder;
