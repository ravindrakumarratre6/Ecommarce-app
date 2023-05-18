import { useDispatch, useSelector } from "react-redux";
import "../css/Editproduct.css";
import { editProduct} from "../reducer/productSlice";
import { useParams } from "react-router-dom";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Params editproduct ", id);
  const state =useSelector(state=>state)
  let item = state.product.data.find((c)=>c.id === +id)
  const [title, setTitle] = useState(item?.title);
  const [text, setText] = useState(item?.descrition);
  const [price, setPrice] = useState(item?.price);
  const [rating, setRating] = useState(item?.rating);
  const [img, setImg] = useState(item?.img);  
  const navigate = useNavigate();
  console.log(title,"title")
  const EditHandler = (e) => {
    e.preventDefault();
    const finalData = {
      id:parseInt(id),
      title: title,
      text: text,
      price: price,
      rating:rating,
      img: img,
    };
    dispatch(editProduct(finalData));
    toast.success("Edit Product Successfully");
    navigate("/");
  };
  return (
    <div className="container-edit">
      
      <h1 className="edit-heading">Edit Product</h1>
      <form className="editfrom" onSubmit={EditHandler}>
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={text}
          placeholder="decription"
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
         <input
          type="number"
          value={rating}
          placeholder="rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="img"
          value={img}
          placeholder="img"
          onChange={(e) => setImg(e.target.value)}
        />
        <div className="buttons">
          <input type="submit" value="save" className="save-btn" />
        </div>
      </form>
      <Toaster />
    </div>
  );
};
export default EditProduct;
