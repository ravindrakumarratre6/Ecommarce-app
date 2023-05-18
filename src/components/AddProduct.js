import { useState } from "react";
import "../css/Addproduct.css";
import { addProduct } from "../reducer/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const AddProduct = () => {
  const dispatch = useDispatch();
  const state =useSelector(state=>state)
  console.log("Add",state.product.data.length)
  // product  length
  const id = state.product.data[state.product.data.length-1].id+1;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");
  const [rating,setRating] =useState("")
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({id:id,title: title, price: price, descrition: text, img: img })
    );
    toast.success("Add Product Successfully");
    navigate("/");
  };

  return (
    <div className="add-container">
      {/* add heading */}
      <h2 className="add-heading">Add a Product</h2>
      {/* form input */}
      <form className="input-container" onSubmit={HandleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
         <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
        />
        <input
          type="imge"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="img"
        />
        <input type="submit" value="Add Product" className="add-btn" />
      </form>
      <Toaster />
    </div>
  );
};
export default AddProduct;
