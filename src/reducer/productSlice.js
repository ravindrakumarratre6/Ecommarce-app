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
    updateProduct: (state, action) => {
      console.log("error1");
      const category = action.payload;

      console.log(typeof category, "cate");
      if (category === "all") {
        state.data = state.originaldata;
      } else {
        const updatedata = state.originaldata.filter((item) => item.category === category);
        console.log("udatedata",updatedata)
        state.data = updatedata;
      }
      console.log("error2");
    },
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
export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
