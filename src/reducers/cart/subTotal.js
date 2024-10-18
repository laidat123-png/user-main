import * as types from '../../constants/actionsType';

var initialState = 0;

export const subTotal = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SUB_TOTAL_CART:
            state = action.subTotal;
            return state;
        default: return state;
    }
}
