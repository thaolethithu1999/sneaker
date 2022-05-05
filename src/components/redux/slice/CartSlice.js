import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import data from "../../../data/data.json";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProduct: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],

    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      if (action.payload.size === "") {
        notification["warning"]({
          message: "Please choose size!",
        });
      } else {
        const proIndex = state.cartProduct.findIndex(
          (pro) => pro.key === action.payload.productId
        );
        console.log("pro check " + proIndex);

        const chooseSize = state.cartProduct.findIndex(
          (pro) =>
            pro.size.includes(action.payload.size) &&
            pro.key === action.payload.productId
        );
        console.log("size check" + chooseSize);

        if (proIndex >= 0 && chooseSize >= 0) {
          state.cartProduct[proIndex].quantity += 1;
          notification["success"]({
            message: "Your choice in cart now!",
          });
        } else if (
          (proIndex >= 0 && chooseSize < 0) ||
          (proIndex < 0 && chooseSize < 0) ||
          proIndex < 0
        ) {
          const product = data.find(
            (item) => item.key === action.payload.productId
          );
          state.cartProduct = [
            ...state.cartProduct,
            {
              ...product,
              size: action.payload.size,
              quantity: action.payload.quantity,
            },
          ];

          // state.cartTotalQuantity += parseInt(state.cartProduct.quantity)
          console.log("total quan: " + state.cartTotalQuantity);
          //state.cartProduct = [{...state.cartProduct, size: action.payload.size, quantity: action.payload.quantity}]
          notification["success"]({
            message: "Your choice in cart now!",
          });
          localStorage.setItem("cart", JSON.stringify(state.cartProduct));
        }

        //localStorage.setItem("cart", JSON.stringify(state.cartProduct));
      }
    },

    removeFromCart: (state, action) => {
      const newCart = state.cartProduct.filter(
        (product) => product.key !== action.payload
      );

      state.cartProduct = newCart;
    },

    removeAll: (state) => {
      state.cartProduct = [];
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
    },

    getTotal: (state, action) => {
      let { total, quantity } = state.cartProduct.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalAmount = total
      state.cartTotalQuantity = quantity
    },
  },
});

export const { addToCart, removeFromCart, removeAll, getTotal } = CartSlice.actions;
export const cartSelector = (state) => state.cartProduct;
