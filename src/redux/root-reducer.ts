import { combineReducers } from "@reduxjs/toolkit";
// slices
import { baseApiSlice } from "./api/base-api";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import globalStateReducers from "./slices/global";
import authStateReducers from "./slices/auth";
import userDetailsReducer from "./slices/user-slice";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

export function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}
const storage = typeof window !== "undefined"
  ? createWebStorage("local")
  : createPersistStore();

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  globalState: persistReducer(rootPersistConfig, globalStateReducers),
  authState: persistReducer(rootPersistConfig, authStateReducers),
  userDetails: persistReducer(rootPersistConfig, userDetailsReducer),
});

export default rootReducer;
