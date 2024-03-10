import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
// slices
import { baseApiSlice } from "./api/base-api";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import globalStateReducers from "./slices/global";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  globalState: globalStateReducers,
});

export default rootReducer;
