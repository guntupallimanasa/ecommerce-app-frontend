import axios from '../helpers/axios';
import { categoryConstants } from './constants';

export const getAllCategory = () => {
    return async (dispatch) => {

        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
        })

        const res = await axios.get(`/category/getCategories`)
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}

export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST,
        })

        try {
            const res = await axios.post(`/category/create`, form)
            console.log('>>>>res', res)
            if (res.status === 201) {
                const { category } = res.data;
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
                    payload: { category }
                })
            } else {
                if (res.status === 400) {
                    dispatch({
                        type: categoryConstants.ADD_NEW_CATEGORIES_FALIURE,
                        payload: {
                            error: res.data.error
                        }
                    })
                }
            }
        } catch (error) {
            console.log('>>>error', error.response)
        }
    }
}


export const updateCategories = (form) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_REQUEST
        })
        const res = await axios.post(`/category/updateCategories`, form)

        if (res.status === 200) {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_SUCCESS
            })
            dispatch(getAllCategory())
        } else {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: res.data.error
            })
        }
    }
}


export const deleteCategoriesAction = (ids) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.DELETECATEGORIES_REQUEST
        })
        const res = await axios.post(`/category/deleteCategories`, {
            payload: {
                ids
            }
        })
        if (res.status === 200) {
            dispatch({
                type: categoryConstants.DELETECATEGORIES_SUCCESS
            })
            dispatch(getAllCategory())
        } else {
            dispatch({
                type: categoryConstants.DELETECATEGORIES_FAILURE,
                payload: res.data.error
            })
        }
    }
}