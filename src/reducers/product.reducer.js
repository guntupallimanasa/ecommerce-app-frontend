import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            return state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
        case productConstants.GET_ALL_PRODUCTS_FAILURE: {
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        default: return state;
    }
}