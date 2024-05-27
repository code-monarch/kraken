"use client";
import { SERVICE_ACCOUNT_API_KEY } from "@/lib/constants";
import LocalStore from "@/lib/helper/storage-manager";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    serviceAccountKey?: string;
}

const initialState: IAuthState = {
    serviceAccountKey: '',
};

export const authStateSlice = createSlice({
    name: "authState",
    initialState,
    reducers: {
        setServiceAccountKey: (state, action: PayloadAction<string>) => {
            state.serviceAccountKey = action.payload;
            LocalStore.setItem({ key: SERVICE_ACCOUNT_API_KEY, value: action.payload })
            return state;
        },
    },
});

export const { setServiceAccountKey } = authStateSlice.actions;

export default authStateSlice.reducer;
