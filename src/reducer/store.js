import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice"
const store = configureStore({
  reducer: {
    // reducer
    product: productReducer,
    cart:cartReducer
  }
});
export default store;
