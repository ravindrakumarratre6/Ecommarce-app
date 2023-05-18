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
const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoding: false,
    data: [],
    isError: false,
    totalProduct:0,
    totalAmount:0
  },
  reducers: {
    // addproduct actions
    addProduct: (state, action) => {
     state.data.push(action.payload);
     state.totalProduct +=1
    },

    // removeproduct action
    removeProduct:(state,action)=>{
      const filterRemove =state.data.filter((item)=>item.id !== action.payload)
       console.log("filterRemove",filterRemove)
        state.data = filterRemove
        state.totalProduct -=1
      // console.log(action.payload); 
    },
    
    // editproduct action
    // editProduct:(state,action)=>{
    //   const findElement = state.data.findIndex(item=>item.id === action.payload.id)
    //   state.data[findElement] = {...state.data,...action.payload}
    //   console.log("findElement",findElement)
    //   console.log("action payload",action.payload)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoding = false;
      // state.data.push(action.payload)
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("isError", action.payload);
      state.isError = true;
    });
  },
});
export const { addProduct,removeProduct} = productSlice.actions;
export default productSlice.reducer;
