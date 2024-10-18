import * as types from '../../constants/actionsType';
var initialState = {};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return { ...action.user };
        default: return state;
    }
}
