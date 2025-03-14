import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },

  reducers: {
    // Generic function for setting loading state
    requestStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    requestFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Get all products
    getAllProducts: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },

    //Delete a product
    deleteProduct: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },

    //Update a product
    updateProduct: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },

    //Add a product
    addProduct: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
  },
});

export const {
  requestStart,
  requestFailure,
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} = productSlice.actions;

export default productSlice.reducer;
