import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

export const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchProducts: [],
    kw: "",
  },
  reducers: {
    getListProduct: (state) => {
      state.products = data;
    },

    getKw: (state, action) => {
      state.kw = action.payload;
    },

    getSearchProduct: (state) => {
      state.searchProducts = data.filter(
        (p) =>
          p.name.toLowerCase().includes(state.kw) ||
          p.type.toLowerCase().includes(state.kw)
      );
    },
  },
});

export const { getListProduct, getSearchProduct, getKw } = ProductsSlice.actions;
export const productsSelector = (state) => state.products;
export const searchProductSelector = (state) => state.searchProducts;
