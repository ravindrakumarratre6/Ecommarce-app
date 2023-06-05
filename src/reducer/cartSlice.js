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
    isItemInCart: (state, action) => {
      const existingItem = state.cart.some((product) => product.id === action.payload);
      return existingItem ? true : false;
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.qty += 1;
      }
      console.log("product", product);
      state.product = product;
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product && product.qty > 1) {
        product.qty -= 1;
      }
      state.product = product;
    },
  },
});

export const {
  addtoProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  calculateSubtotal,
  isItemInCart
} = cartSlice.actions;
export default cartSlice.reducer;
