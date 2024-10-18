import * as types from '../../constants/actionsType';

var initialState = [];

export const review = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_REVIEW_PRODUCT:
            state.unshift(action.rv);
            return [...state];
        case types.GET_REVIEW:
            return action.review;
        default: return [...state];
    }
}
