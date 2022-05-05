import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {
      key: null,
      type: "",
      productKey: "",
      name: "",
      img: {
        mainImg: "",
        arrImg: [],
      },
      size: [],
      stock: "",
      price: "",
    },
  },
  reducers: {
    getProductById: (state, action) => {
      state.product = data.find((product) => product.key === action.payload);
    },
  },
});

export const {getProductById} = ProductSlice.actions
export const productSelector = state => state.product
