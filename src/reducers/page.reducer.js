import { pageConstants } from "../actions/constants";

const initialState = {
    pages: {},
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case pageConstants.CREATE_PAGE_SUCCESS:
            return state = {
                ...state,
                loading: false,
                // products: action.payload
            }
        case pageConstants.CREATE_PAGE_FAILURE: {
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        default: return state;
    }
}