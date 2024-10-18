import * as types from '../../constants/actionsType';

var initialState = {
    postAll: [],
    post: {},
    postsPage: [],
    totalPage: 1
};

export const posts = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_POST:
            return { ...state, postAll: action.posts };
        case types.GET_ONE_POST:
            return { ...state, post: action.post };
        case types.GET_POST_BY_PAGE:
            state.postsPage = action.posts;
            return { ...state, postsPage: action.posts, totalPage: action.totalPage };
        case types.ON_RESET_POSTS:
            state.postsPage = [];
            return { ...state };
        default: return { ...state };
    }
}
