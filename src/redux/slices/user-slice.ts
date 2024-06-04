import {
  ADMIN_ROLE,
  TWO_FA_PREFERENCE,
  USER_EMAIL,
  ADMIN_ID,
  USER_PHONE,
  ADMIN_INFO,
  ADMIN_FIRSTNAME,
  ADMIN_LASTNAME,
  ADMIN_PHONENUMBER,
  ADMIN_EMAIL,
} from "@/lib/constants";
import LocalStore from "@/lib/helper/storage-manager";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserSlice {
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  email?: string;
  adminId?: string;
  adminRole?: string;
  sms2fa?: boolean;
  google2fa?: boolean;
}

const initialState: IUserSlice = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  email: "",
  adminId: "",
  adminRole: "",
  sms2fa: false,
  google2fa: false,
};

// Some User details to store in Local Storage
export type IAdminDetails = Pick<
  IUserSlice,
  "email" | "phoneNumber" | "firstname" | "lastname"
>;

// Profile 2FA security Preferences. To be stored in Local storage
export type I2FApref = Pick<Required<IUserSlice>, "sms2fa" | "google2fa">;

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setAdminId: (state, action) => {
      state.adminId = action.payload;
    },
    setAdminRole: (state, action) => {
      state.adminRole = action.payload;
    },
    setAdminInfo: (state, action: PayloadAction<IAdminDetails>) => {
      state.firstname = action.payload?.firstname;
      state.lastname = action.payload?.lastname;
      state.phoneNumber = action.payload?.phoneNumber;
      state.email = action.payload?.email;
    },

    // set2FaPreference Action
    set2FaPreference: (state, action: PayloadAction<I2FApref>) => {
      state.google2fa = action.payload?.google2fa;
      state.sms2fa = action.payload?.sms2fa;
    },
  },
});

export const {
  setEmail,
  setPhoneNumber,
  setAdminId,
  set2FaPreference,
  setAdminRole,
  setAdminInfo,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
