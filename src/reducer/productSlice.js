import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk("fetchProduct", async () => {
  //  fetch api call
  const res = await fetch(
    "https://my-json-server.typicode.com/ravindrakumarratre6/ECOM/Products"
  );
  return res.json();
});


// productslice
console.log("e3")
const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoding: false,
    data: [],
    originaldata: [],
    isError: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoding = false;
      // state.data.push(action.payload)
      state.data = action.payload;
      state.originaldata = action.payload;

    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("isError", action.payload);
      state.isError = true;
    });
  },
});
console.log("e4")
export const {  } = productSlice.actions;
export default productSlice.reducer;
