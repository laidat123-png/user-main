import callAPI from '../untils/callAPI';
import * as types from '../constants/actionsType';

export const getOnePostRequest = (dispatch, id) => {
    dispatch(isLoadingDT(true));
    return callAPI(`/post/${id}`, "GET")
        .then(res => res.data)
        .then(data => {
            if (data.status === 'success') {
                dispatch(getOnePost(data.post));
                dispatch(getComment(data.post.comment));
                dispatch(isLoadingDT(false));
            }
        })
}

const isLoadingDT = (boolean) => {
    return {
        type: types.IS_LOADING_DETAIL_B,
        boolean
    }
}

export const getOnePost = (post) => {
    return {
        type: types.GET_ONE_POST,
        post
    }
}

const getComment = (comments) => {
    return {
        type: types.GET_COMMENT,
        comments
    }
}
const addCmtPost = (cmt, id) => {
    return {
        type: types.ADD_CMT_POST,
        cmt,
        id
    }
}
const isLoadingCmt = (boolean) => {
    return {
        type: types.IS_LOADING_CMT,
        boolean
    }
}

export const addCmtPostRequest = (dispatch, cmt, idPost) => {
    dispatch(isLoadingCmt(true));
    return callAPI(`/post/comment/${idPost}`, "POST", cmt, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
        .then(res => res.data)
        .then(data => {
            cmt.author = {
                _id: `${sessionStorage.getItem("userID")}`,
                image: `${sessionStorage.getItem("image")}`,
                firstName: `${sessionStorage.getItem("firstName")}`,
                lastName: `${sessionStorage.getItem("lastName")}`,
            }
            if (data.status === "success") {
                dispatch(isLoadingCmt(false));
                dispatch(addCmtPost(cmt, data.idCmt));
            }
        })
        .catch(err => console.log(err))
}


const replyCmt = (replyCmt, idCmt) => {
    return {
        type: types.REPLY_COMMENT,
        replyCmt,
        idCmt
    }
}

export const replyCmtRequest = (dispatch, cmt, id) => {
    console.log(cmt);
    dispatch(isLoadingCmt(true));
    return callAPI(`/post/replyCmt/${id}`, "POST", cmt, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(replyCmt(data.replyCmt, id));
                dispatch(isLoadingCmt(false));
            }
        })
        .catch(err => {
            console.log(err);
        })
}

const getPostByPage = (posts, totalPage) => {
    return {
        type: types.GET_POST_BY_PAGE,
        posts,
        totalPage
    }
}

export const getPostByPageRequest = (dispatch, value) => {
    dispatch(isLoadingDT(true));
    return callAPI(`/post?page=${value.page}&limit=${value.limit}`)
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(getPostByPage(data.Posts, data.totalPage));
                dispatch(isLoadingDT(false));
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteCommentRequest = (dispatch, idCmt, idPost) => {
    return callAPI(`/post/${idPost}/comment/${idCmt}`, "DELETE")
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(deleteComment(idCmt, idPost));
            }
        })
        .catch(err => {
            console.log(err);
        })
}

export const deleteComment = (idCmt, idPost) => {
    return {
        type: types.DELETE_CMT,
        idCmt,
        idPost
    }
}

export const onResetPosts = () => {
    return {
        type: types.ON_RESET_POSTS
    }
}