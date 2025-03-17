import axios from "axios";
import {
  getSingleUser,
  registerUser,
  requestFailure,
  requestStart,
  updateUser,
  userLogin,
} from "../slices/userSlice";
import { getToken, token } from "../../token";

export const login = async (dispatch, user) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/auth/login`,
      user
    );
    dispatch(userLogin(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};

export const registerNewUser = async (user, dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/auth/register`,
      user
    );
    dispatch(registerUser(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};

export const getCurrentUser = async (id, dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/users/find/${id}`,
      {
        headers: {
          token: "Bearer " + token,
        },
      }
    );
    dispatch(getSingleUser(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};

export const updateUserProfile = async (id, user, dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND}/api/users/${id}`,
      user,
      {
        headers: {
          token: "Bearer " + getToken(),
        },
      }
    );
    dispatch(updateUser(res.data));
  } catch (error) {
    dispatch(requestFailure());
    console.log(error);
  }
};
