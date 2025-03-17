import axios from "axios";
import { requestFailure, requestStart } from "../slices/userSlice";
import {
  createCart,
  getAllCarts,
  getUserCarts,
  updateCartItem,
} from "../slices/cartSlice";

export const addToCart = async (cart, dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/cart`,
      cart
    );
    dispatch(createCart(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};

//Add headers later when add security
export const getCart = async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/cart`);
    dispatch(getAllCarts(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};

export const getUserCart = async (userId, dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/cart/${userId}`
    );
    dispatch(getUserCarts(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};

//Add headers later when add security
export const updateCart = async (id, cart, dispatch) => {
  dispatch(requestStart());
  try {
    const updatedUser = await axios.put(
      `${import.meta.env.VITE_BACKEND}/api/cart/${id}`,
      cart
    );
    console.log("updated user: ", updatedUser);
    dispatch(updateCartItem({ id, cart }));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};
