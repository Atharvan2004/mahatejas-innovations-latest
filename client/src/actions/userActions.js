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
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_REQUEST,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERRORS,
} = userSlice.actions;

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(REGISTER_USER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/user/register",
      JSON.stringify(userData),
      config,
    );

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
      "/user/login",
      JSON.stringify({
        email: email,
        password: password,
      }),
      config,
    );

    dispatch(LOGIN_USER_SUCCESS(data.user1));
  } catch (error) {
    dispatch(LOGIN_USER_FAIL(error.response.data));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());

    const { data } = await axios.get("/user/profile");

    dispatch(LOAD_USER_SUCCESS(data.user1));
  } catch (error) {
    dispatch(LOAD_USER_FAIL(error.response.data));
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/user/logout");

    dispatch(LOGOUT_USER_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_USER_FAIL(error.response.data));
  }
};

// Update User
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put("/api/v1/me/update", userData, config);

    dispatch(UPDATE_PROFILE_SUCCESS(data.success));
  } catch (error) {
    dispatch(UPDATE_PROFILE_FAIL(error.response.data));
  }
};

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(UPDATE_PASSWORD_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/password/update",
      passwords,
      config,
    );

    dispatch(UPDATE_PASSWORD_SUCCESS(data.success));
  } catch (error) {
    dispatch(UPDATE_PASSWORD_FAIL(error.message));
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(FORGOT_PASSWORD_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/password/forgot", email, config);

    dispatch(FORGOT_PASSWORD_SUCCESS(data.message));
  } catch (error) {
    dispatch(FORGOT_PASSWORD_FAIL(error.message));
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(RESET_PASSWORD_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config,
    );

    dispatch(RESET_PASSWORD_SUCCESS(data.success));
  } catch (error) {
    dispatch(RESET_PASSWORD_FAIL(error.message));
  }
};

// Get All Users ---ADMIN
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(ALL_USERS_REQUEST());
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch(ALL_USERS_SUCCESS(data.users));
  } catch (error) {
    dispatch(ALL_USERS_FAIL(error.message));
  }
};

// Get User Details ---ADMIN
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(USER_DETAILS_REQUEST());
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch(USER_DETAILS_SUCCESS(data.user));
  } catch (error) {
    dispatch(USER_DETAILS_FAIL(error.message));
  }
};

// Update User Details ---ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(UPDATE_USER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config,
    );

    dispatch(UPDATE_USER_SUCCESS(data.success));
  } catch (error) {
    dispatch(UPDATE_USER_FAIL(error.message));
  }
};

// Delete User ---ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(DELETE_USER_REQUEST());
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch(DELETE_USER_SUCCESS(data.success));
  } catch (error) {
    dispatch(DELETE_USER_FAIL(error.message));
  }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
