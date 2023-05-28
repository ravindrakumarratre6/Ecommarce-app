import "../css/Productitem.css";
import "../css/Productcontainer.css";
import { useDispatch,useSelector } from "react-redux";
import { addtoProduct } from "../reducer/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  console.log(products,"products");

  const handleAddToCart = (item) => {
    dispatch(addtoProduct(item));
    toast.success("Added to cart");
    navigate("./");
  };

  return (
    <div className="product-container">
      {products.map((item) => (
        <div className="cart-container" key={item.id}>
          <div>
            <div className="cart-img">
              <img src={item.img} alt="Image" />
            </div>
            <div className="cart-heading">
              <h5>{item.title}</h5>
            </div>
            <div className="cart-value">
              <p>Price : <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{item.price}</p>
              <button
                className="addtobtn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <Toaster />
    </div>
  );
};

export default ProductItem;
