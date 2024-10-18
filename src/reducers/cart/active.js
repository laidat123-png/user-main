import * as types from '../../constants/actionsType';

var initialState = {
    activeCart: false
}

export const active = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_CART:
            return { ...state, activeCart: action.boolean };
        default: return state;
    }
}
