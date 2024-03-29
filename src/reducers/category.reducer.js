import { categoryConstants } from "../actions/constants";
import axios from '../helpers/axios';

const initialState = {
    categories: [],
    error: null,
    loading: false
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ]
    }

    for (let cate of categories) {

        if (cate._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            }
            myCategories.push({
                ...cate,
                children: cate.children.length > 0 ? [...cate.children, newCategory] : [newCategory]
            })
        } else {
            myCategories.push({
                ...cate,
                children: cate.children ? buildNewCategories(parentId, cate.children, category) : []
            })
        }

    }
    return myCategories;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE: {
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            const { parentId } = action.payload.category;
            console.log('>>>action.payload.category', action.payload.category)
            return state = {
                ...state,
                categories: buildNewCategories(parentId, state.categories, action.payload.category),
                loading: false,
            }
        case categoryConstants.ADD_NEW_CATEGORIES_FALIURE: {
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case categoryConstants.UPDATE_CATEGORIES_REQUEST: {
            return state = {
                ...state,
                loading: true,
            }
        }
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS: {
            return state = {
                ...state,
                loading: false,
            }
        }
        case categoryConstants.UPDATE_CATEGORIES_FAILURE: {
            return state = {
                ...state,
                error: action.payload.error,
                loading: false,

            }
        }
        case categoryConstants.DELETECATEGORIES_REQUEST: {
            return state = {
                ...state,
                loading: true,
            }
        }
        case categoryConstants.DELETECATEGORIES_SUCCESS: {
            return state = {
                ...state,
                loading: false,
            }
        }
        case categoryConstants.DELETECATEGORIES_FAILURE: {
            return state = {
                ...state,
                error: action.payload.error,
                loading: false,

            }
        }

        default: return state;
    }
}