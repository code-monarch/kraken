"use client";
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  isPaginationClicked?: boolean;
}

const initialState: IGlobalState = {
  isPaginationClicked: false,
};

export const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setPaginationClicked: (state, action: PayloadAction<boolean>) => {
      state.isPaginationClicked = action.payload;
      return state;
    },
  },
});

export const { setPaginationClicked } = globalStateSlice.actions;

export default globalStateSlice.reducer;
