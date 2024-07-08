import { combineReducers } from "@reduxjs/toolkit";
// slices
import { baseApiSlice } from "./api/base-api";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import globalStateReducers from "./slices/global";
import authStateReducers from "./slices/auth";
import userDetailsReducer from "./slices/user-slice";
import transactionsFilterReducer from "./slices/transactions-filter";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "UC-",
  // whitelist: [],
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  globalState: persistReducer(rootPersistConfig, globalStateReducers),
  authState: persistReducer(rootPersistConfig, authStateReducers),
  userDetails: persistReducer(rootPersistConfig, userDetailsReducer),
  transactionsFilter: persistReducer(rootPersistConfig, transactionsFilterReducer),
});

export default rootReducer;
