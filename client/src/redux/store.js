import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import employeeReducer from "./auth/employeeSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ 
    user : userReducer,
    employee : employeeReducer,
 });
 
const persistConfig = {
    key : 'root',
    version : 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    })
});


export const persistor = persistStore(store);