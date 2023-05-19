import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../reducer/productSlice";
import ProductItem from "./ProductItem";
import Navbar from "./Navbar";
import Carts from "./Carts";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(state.product.data, "state data");
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<ProductItem product={state.product.data} />}
          />
          <Route path="/carts/:id" element={<Carts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
