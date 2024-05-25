/* eslint-disable no-param-reassign */
import { ADMIN_ROLE, TWO_FA_PREFERENCE, USER_EMAIL, ADMIN_ID, USER_PHONE } from "@/lib/constants";
import LocalStore from "@/lib/helper/storage-manager";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserSlice {
  phoneNumber?: string;
  email?: string;
  adminId?: string;
  adminRole?: string;
  sms2fa?: boolean;
  google2fa?: boolean;
}

const initialState: IUserSlice = {
  phoneNumber: "",
  email: "",
  adminId: "",
  adminRole: "",
  sms2fa: false,
  google2fa: false,
};

// Some User details to store in Local Storage
export type IUserdetails = Pick<
  IUserSlice,
  "email" | "phoneNumber" | "adminId"
>;

// Profile 2FA security Preferences. To be stored in Local storage
export type I2FApref = Pick<Required<IUserSlice>, "sms2fa" | "google2fa">;

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      LocalStore.setItem({ key: USER_EMAIL, value: state.email! })
    },

    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
      LocalStore.setItem({ key: USER_PHONE, value: state.phoneNumber! })
    },
    setAdminId: (state, action) => {
      state.adminId = action.payload;
      LocalStore.setItem({ key: ADMIN_ID, value: state.adminId! })
    },
    setAdminRole: (state, action) => {
      state.adminRole = action.payload;
      LocalStore.setItem({ key: ADMIN_ROLE, value: state.adminRole! });
    },

    // set2FaPreference Action
    set2FaPreference: (state, action: PayloadAction<I2FApref>) => {
      state.google2fa = action.payload.google2fa;
      state.sms2fa = action.payload.sms2fa;
      const securityPreference = JSON.stringify({
        google2FA: state.google2fa,
        sms2FA: state.sms2fa,
      });
      LocalStore.setItem({ key: TWO_FA_PREFERENCE, value: securityPreference });
    },
    // set2FaPreference Action End
  },
});

export const {
  setEmail,
  setPhoneNumber,
  setAdminId,
  set2FaPreference,
  setAdminRole,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
