import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./reducer/productSlice";
import ProductItem from "./components/ProductItem";
import Navbar from "./components/Navbar";
import Carts from "./components/Carts";
import CartOrder from "./components/CartOrder";
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
          <Route path="/cartorder" element={<CartOrder/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
