import { createSlice } from "@reduxjs/toolkit";
import {
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_DETAILS,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL,
  SLIDER_PRODUCTS_FAIL,
  SLIDER_PRODUCTS_REQUEST,
  SLIDER_PRODUCTS_SUCCESS,
} from "@/constants/productConstants";

export const productSlice = createSlice({
  name: "product",
  initialState: { products: [] },
  reducers: {
    [ADMIN_PRODUCTS_FAIL]: () => { },
    [ADMIN_PRODUCTS_REQUEST]: () => { },
    [ADMIN_PRODUCTS_SUCCESS]: () => { },
    [ALL_PRODUCTS_FAIL]: (state, action) => {
      state.loading = false
      state.error = action.payload
      console.log("fail")
    },
    [ALL_PRODUCTS_REQUEST]: (state) => {
      state.loading = true;
    },
    [ALL_PRODUCTS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
    [SLIDER_PRODUCTS_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [SLIDER_PRODUCTS_REQUEST]: (state) => {
      state.loading = true;
      state.products = [];
    },
    [SLIDER_PRODUCTS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
  },
});

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    productInfo: {
      _id: "",
      name: "",
      description: "",
      price: 0,
      kv: [{ val: 0, img: [""] }],
      weight: [0],
      category: "",
      min_quantity: 0,
      image_url: [""],
      reviews: [{ name: "", date: "", comment: "", rating: 5, _id: "", }],
      rating: 0,
      overview_img:[""]
    }
  },
  reducers: {
    [PRODUCT_DETAILS_REQUEST]: (state) => {
      state.loading = true;
    },
    [PRODUCT_DETAILS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.productInfo = action.payload;
    },
    [PRODUCT_DETAILS_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [REMOVE_PRODUCT_DETAILS]: (state) => {
      state.product = {};
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
  },
});

export const newReviewSlice = createSlice({
  name: "newReview",
  initialState: {},
  reducers: {
    [NEW_REVIEW_REQUEST]: (state) => {
      state.loading = true;
    },
    [NEW_REVIEW_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [NEW_REVIEW_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [NEW_REVIEW_RESET]: (state) => {
      state.success = false;
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
  },
});

export const newProductSlice = createSlice({
  name: "newProduct",
  initialState: { product: {} },
  reducers: {
    [NEW_PRODUCT_REQUEST]: (state) => {
      state.loading = true;
    },
    [NEW_PRODUCT_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    [NEW_PRODUCT_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [NEW_PRODUCT_RESET]: (state) => {
      state.success = false;
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
  },
});

export const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: { product: {} },
  reducers: {
    [UPDATE_PRODUCT_REQUEST]: () => { },
    [UPDATE_PRODUCT_FAIL]: () => { },
    [DELETE_PRODUCT_REQUEST]: (state) => {
      state.loading = true;
    },
    [UPDATE_PRODUCT_SUCCESS]: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    [DELETE_PRODUCT_SUCCESS]: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    [DELETE_PRODUCT_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [UPDATE_PRODUCT_RESET]: (state) => {
      state.isUpdated = false;
    },
    [DELETE_PRODUCT_RESET]: (state) => {
      state.isDeleted = false;
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
  },
});

export const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: { reviews: [] },
  reducers: {
    [ALL_REVIEWS_REQUEST]: (state) => {
      state.loading = true;
    },
    [ALL_REVIEWS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    [ALL_REVIEWS_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
  },
});

// export const reviewReducer = (state = {}, { type, payload }) => {
//   switch (type) {
//     case DELETE_REVIEW_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_REVIEW_SUCCESS:
//       return {
//         loading: false,
//         isDeleted: payload,
//       };
//     case DELETE_REVIEW_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: payload,
//       };
//     case DELETE_REVIEW_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
