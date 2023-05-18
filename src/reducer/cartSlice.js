import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProduct: 0,
  },
  reducers: {
    addtoProduct: (state, action) => {
      state.cart.push(action.payload);
      state.totalProduct += 1;
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalProduct -= 1;
    },
  },
});

export const { addtoProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;


