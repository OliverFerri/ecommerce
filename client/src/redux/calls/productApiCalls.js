import axios from "axios";
import { requestFailure, requestStart } from "../slices/userSlice";
import { getAllProducts } from "../slices/productSlice";

export const getProducts = async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/products`);
    dispatch(getAllProducts(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};
