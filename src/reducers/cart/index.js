import * as types from '../../constants/actionsType';

var initialState = []

export const cart = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case types.GET_CART:
            return [...action.carts];
        case types.ADD_CART:
            index = findIndexByID(action.product._id, state);
            if (index === -1) {
                state.push({
                    _id: action.id,
                    product: action.product,
                    quantity: action.quantity
                })
            }
            return [...state];
        case types.DELETE_PRODUCT_IN_CART:
            index = findIndexByID(action.id, state);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return [...state];
        case types.UPDATE_ONE_CART:
            index = findIndexByID(action.product._id, state);
            if (index !== -1) {
                state[index].quantity = action.quantity;
            }
            return [...state];
        case types.RESET_CART:
            return [];
        default: return state;
    }
}

function findIndexByID(id, arr) {
    let index = -1;
    arr.forEach((element, i) => {
        if (element.product._id === id) index = i;
    });
    return index;
}