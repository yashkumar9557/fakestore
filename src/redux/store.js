import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"; 
import notificationReducer from "./reducers/notification";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducers: persistedReducer,
    notification: notificationReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);
export { store, persistor };
