import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../../api/products/index";

const initialState = {
  pending: false,
  success: false,
  failed: false,
  message: "",
  data: [],
};

export const getProduct = createAsyncThunk("product", async () => {
  const res = await productApi.getData();
  return res.data.$values;
});
export const getProductById = createAsyncThunk(
  "Get Product By Id",
  async (params) => {
    const res = await productApi.getProductById(params);
    return res.data;
  }
);

const products = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [getProduct.pending]: (state) => {
      state.pending = true;
      state.success = false;
      state.failed = false;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.pending = false;
      state.failed = true;
      state.message = action.error.message;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.pending = false;
      state.success = true;
      state.data = action.payload;
    },
    [getProductById.rejected]: (state, action) => {
      state.pending = false;
      state.failed = true;
      state.message = action.error.message;
    },
  },
});

export default products.reducer;
