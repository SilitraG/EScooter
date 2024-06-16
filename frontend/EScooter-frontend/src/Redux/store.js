import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { userReducer } from "./User/user.reducer";


const rootReducers=combineReducers({
auth: authReducer,
user: userReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))