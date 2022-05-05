import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

export const BillSlice = createSlice({
  name: "bill",
  initialState: {
    listBill: [],
  },
  reducers: {
    addListBill: (state, action) => {
      state.listBill.push(action.payload);
      notification["success"]({
        message: "Your orders is success! We'll call you in minutes to confirm! Thank you!",
      });
    },
  },
});

export const { addListBill } = BillSlice.actions;
