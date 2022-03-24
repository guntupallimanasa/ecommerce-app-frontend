import axios from '../helpers/axios';
import { productConstants } from './constants';

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_REQUEST,
        })

        const res = await axios.post(`/product/create`, form)
        console.log('>>>res', res)
        if (res.status === 200) {
            const { products } = res.data;
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }

}