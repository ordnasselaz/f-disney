import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistAuthReducer } from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

export const rootReducer = combineReducers({
  login: persistAuthReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type RootState = ReturnType<typeof rootReducer>;

export let persistor = persistStore(store);
