import * as types from '../../constants/actionsType';

var initialState = {
    loadingbs: false,
    loadingdt: false,
    loadingall: false,
    loadingcmt: false,
    loadingdtb: false,
    loadingcart: false,
    loadingpc: false,
    loadingauth: false
}

export const loading = (state = initialState, action) => {
    switch (action.type) {
        case types.IS_LOADING_BOOKSTORE:
            return { ...state, loadingbs: action.boolean };
        case types.IS_LOADING_DETAIL_P:
            return { ...state, loadingdt: action.boolean };
        case types.IS_LOADING_ALL:
            return { ...state, loadingall: action.boolean };
        case types.IS_LOADING_CMT:
            return { ...state, loadingcmt: action.boolean };
        case types.IS_LOADING_DETAIL_B:
            return { ...state, loadingdtb: action.boolean };
        case types.IS_LOADING_CART:
            return { ...state, loadingcart: action.boolean };
        case types.IS_LOADING_PC:
            return { ...state, loadingpc: action.boolean };
        case types.IS_LOADING_AUTH:
            return { ...state, loadingauth: action.boolean };
        default: return state;
    }
}
