import axios from "axios";

import { productSlice } from "@/features/productSlice";
import { productDetailsSlice } from "@/features/productSlice";

const {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
} = productSlice.actions;

const {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = productDetailsSlice.actions;

export const getProducts = (query) => async (dispatch) => {
  try {
    dispatch(ALL_PRODUCTS_REQUEST());

    const { product, type } = query;

    // from type extact the first word and use it as a route
    let url = `/api/${product}/${type.split(" ")[0]}/`;
    const { data } = await axios.get(url);

    dispatch(ALL_PRODUCTS_SUCCESS(data));
  } catch (error) {
    // idk why this isnt working needed a workaround
    // dispatch(ALL_PRODUCTS_FAIL(error.respsonse.data));
    dispatch(ALL_PRODUCTS_SUCCESS());
  }
};
export const getProductInfo = (id) => async (dispatch) => {
  try {
    dispatch(PRODUCT_DETAILS_REQUEST());

    let url = `http://localhost:3000/api/products/${id}`;

    const { data } = await axios.get(url);

    dispatch(PRODUCT_DETAILS_SUCCESS(data));
  } catch (error) {
    console.log("error", error);
    dispatch(PRODUCT_DETAILS_FAIL(error.respsonse.data));
    return [];
  }
};
// export const getProductInfo = (id) => async (dispatch) => {
//   try {
//     dispatch(PRODUCT_DETAILS_REQUEST());
//
//     let url = `/api/products/${id}`;
//
//     const { data } = await axios.get(url);
//
//     dispatch(PRODUCT_DETAILS_SUCCESS(data));
//   } catch (error) {
//     console.log("error", error);
//     dispatch(PRODUCT_DETAILS_FAIL(error.respsonse.data));
//     return [];
//   }
// };
