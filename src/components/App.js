import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../reducer/productSlice";
import ProductItem from "./ProductItem";
import Navbar from "./Navbar";
import Carts from "./Carts";
import CartOrder from "./CartOrder";
function App() {
  const dispatch =useDispatch()
  useEffect(() => {
    dispatch(fetchProducts());
  },[])

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<ProductItem  />}
          />
          <Route path="/carts" element={<Carts />} />
          <Route path="/cartoder" element={<CartOrder/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
