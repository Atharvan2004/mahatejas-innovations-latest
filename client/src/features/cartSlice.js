import {
  ADD_TO_CART,
  EMPTY_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "@/constants/cartConstants";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [{}],
    shippingInfo: {},
  },
  reducers: {
    [ADD_TO_CART]: (state, action) => {
      state.cartItems = action.payload;
    },
    [REMOVE_FROM_CART]: (state, action) => {
      state.cartItems = action.payload;
    },
    [FETCH_CART]: (state, action) => {
      state.cartItems = action.payload;
    },
    [EMPTY_CART]: (state) => {
      state.cartItems = [];
    },
    [SAVE_SHIPPING_INFO]: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});
