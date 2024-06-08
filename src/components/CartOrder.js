import React from "react";
import "../css/CartOrder.css";
import { useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect } from "react";
const CartOrder = () => {
  const order = useSelector((state) => state.cart.order);
  const orderDate = new Date().toLocaleDateString();
console.log("order",order)

  useEffect(() => {
    console.log("Cart state on CartOrder page: ", order);
  }, [order]);

  // Calculate the subtotal
  const calculateSubtotal = () => {
    let subtotal = 0;
    order.forEach((item) => {
      subtotal += item.price * item.qty;
    });
    return subtotal;
  };

  return (
    <div className="order-container">
      <h1 className="heading-order">Your Order Cart</h1>
      <div className="order-date">Order Date: {orderDate}</div>
      {order.length > 0 ? (
        <div>
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
                    <FaRupeeSign />
                    {val.price}
                  </td>
                  <td>{val.qty}</td>
                  <td>
                    <FaRupeeSign />
                    {val.price * val.qty}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
          <div className="subtotal-container">
            <h2>
              Subtotal: <FaRupeeSign /> {calculateSubtotal()}
            </h2>
          </div>
        </div>
      ) : (
        <h2>No items in the cart.</h2>
      )}
    </div>
  );
};

export default CartOrder;
