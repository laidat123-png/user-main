import * as types from '../constants/actionsType';

export const isLoadingDetailP = (boolean) => {
    return {
        type: types.IS_LOADING_DETAIL_P,
        boolean
    }
}

export const isLoadingAll = (boolean) => {
    return {
        type: types.IS_LOADING_ALL,
        boolean
    }
}
export const isLoadingBookstore = (boolean) => {
    return {
        type: types.IS_LOADING_BOOKSTORE,
        boolean
    }
}

export const isLoadingPC = (boolean) => {
    return {
        type: types.IS_LOADING_PC,
        boolean
    }
}

export const isLoadingCmt = (boolean) => {
    return {
        type: types.IS_LOADING_CMT,
        boolean
    }
}

export const isLoadingCart = (boolean) => {
    return {
        type: types.IS_LOADING_CART,
        boolean
    }
}