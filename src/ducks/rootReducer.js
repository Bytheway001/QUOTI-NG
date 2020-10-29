import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { cloudReducer } from "./cloudReducer";
import { compareReducer } from "./compareReducer";
import { quoteReducer } from "./quoteReducer";

export const rootReducer = combineReducers({
    quote:quoteReducer,
    auth:authReducer,
    app:appReducer,
    compare:compareReducer,
    cloud:cloudReducer
})
