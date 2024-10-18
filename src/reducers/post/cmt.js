import * as types from '../../constants/actionsType';

var initialState = [];

export const comment = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COMMENT:
            return [...action.comments];
        case types.ADD_CMT_POST:
            state.unshift({ _id: { ...action.cmt, reply: [], createdAt: Date.now(), _id: action.id } });
            return [...state];
        case types.REPLY_COMMENT:
            const cmt = state.filter(t => t._id._id === action.idCmt);
            const reply = {
                _idReply: {
                    ...action.replyCmt, author: {
                        firstName: `${sessionStorage.getItem("firstName")}`,
                        lastName: `${sessionStorage.getItem("lastName")}`,
                        image: `${sessionStorage.getItem("image")}`
                    }
                }
            }
            cmt[0]._id.reply.unshift(reply);
            return [...state];
        case types.DELETE_CMT:
            state = state.filter(cmt => cmt._id._id !== action.idCmt);
            return [...state];
        default: return [...state];
    }
}
