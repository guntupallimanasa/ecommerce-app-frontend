import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";
import pageReducer from "./page.reducer";

const rootReducer  =combineReducers({
    authReducer,
    userReducer,
    orderReducer,
    productReducer,
    categoryReducer,
    pageReducer
})

export default rootReducer;