import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    order:[],
    totalProduct: 0,
  },
  reducers: {
    addToProduct: (state, action) => {
      state.cart.push(action.payload);
      state.totalProduct += 1;
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalProduct -= 1;
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalProduct=0
    },
    setOrder: (state, action) => {
      state.order = action.payload;
      console.log("state order",state.order)
    },
    clearOrder: (state) => {
      state.order = [];
      // state.totalProduct=0;
    
    }
    ,
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
      // state.product = product;
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product && product.qty > 1) {
        product.qty -= 1;
      }
      // state.product = product;
    },
  },
});

export const {
  addToProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  calculateSubtotal,
  isItemInCart,clearCart,setOrder,clearOrder
} = cartSlice.actions;
export default cartSlice.reducer;
