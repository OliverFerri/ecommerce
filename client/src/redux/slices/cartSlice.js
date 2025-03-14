import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    quantity: 0,
    total: 0,
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

    // //Delete a product
    // deleteProduct: (state, action) => {
    //   state.isFetching = false;
    //   state.products.splice(
    //     state.products.findIndex((item) => item._id === action.payload),
    //     1
    //   );
    // },

    //Clear cart on logout
    clearCart: (state) => {
      state.carts = [];
    },

    //Add to cart
    createCart: (state, action) => {
      state.isFetching = false;
      state.quantity += 1;
      state.carts.push(action.payload);
      state.total +=
        action.payload.products[0].price * action.payload.products[0].quantity;
    },

    //Get all carts
    getAllCarts: (state, action) => {
      state.isFetching = false;
      state.carts = action.payload;
    },

    //Get user carts
    getUserCarts: (state, action) => {
      state.isFetching = false;
      state.carts = action.payload;
    },

    //Update a cart
    updateCartItem: (state, action) => {
      state.isFetching = false;

      // Find the index of the cart
      const cartIndex = state.carts.findIndex(
        (item) => item.userId === action.payload.userId
      );

      if (cartIndex !== -1) {
        // Create a new array with updated cart
        const updatedCarts = [...state.carts];
        updatedCarts[cartIndex] = action.payload;

        return {
          ...state,
          carts: updatedCarts,
        };
      }
      return state;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  clearCart,
  createCart,
  getUserCarts,
  getAllCarts,
  updateCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
