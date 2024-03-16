import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import fetchedData from "./slices/fetchedData";
import evenOddPrime from "./slices/evenOddPrime";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userSlice,
  apiData: fetchedData,
  idSequence: evenOddPrime,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // blacklist: ['apiData', 'idSequence'],
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
