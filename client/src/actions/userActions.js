import axios from "axios";

import { userSlice } from "@/features/userSlice";
const {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_REQUEST,
  LOGOUT_USER_FAIL,
} = userSlice.actions;

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(REGISTER_USER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
        "token":""
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/register`,
      JSON.stringify(userData),
      config,
    );
    console.log(data.user1)
    dispatch(REGISTER_USER_SUCCESS(data.user1));
  } catch (error) {
    dispatch(REGISTER_USER_FAIL(error.response.data));
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LOGIN_USER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/login`,
      JSON.stringify({
        email: email,
        password: password,
      }),
      config,
    );
    console.log(data.token)
    dispatch(LOGIN_USER_SUCCESS(data.token));
  } catch (error) {
    dispatch(LOGIN_USER_FAIL(error.response.data));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/profile`,
    );

    dispatch(LOAD_USER_SUCCESS(data.user1));
  } catch (error) {
    dispatch(LOAD_USER_FAIL(error.response.data));
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/logout`,
    );

    dispatch(LOGOUT_USER_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_USER_FAIL(error.response.data));
  }
};
