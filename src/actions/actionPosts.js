import callAPI from '../untils/callAPI';
import * as types from '../constants/actionsType';
// Hàm lấy thông tin của một bài viết cụ thể từ API
export const getOnePostRequest = (dispatch, id) => {
    dispatch(isLoadingDT(true)); // Bắt đầu quá trình tải chi tiết bài viết, hiển thị loading
    return callAPI(`/post/${id}`, "GET") // Gọi API để lấy thông tin bài viết
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === 'success') { // Kiểm tra trạng thái phản hồi
                dispatch(getOnePost(data.post)); // Lưu thông tin bài viết vào store
                dispatch(getComment(data.post.comment)); // Lưu thông tin bình luận vào store
                dispatch(isLoadingDT(false)); // Kết thúc quá trình tải chi tiết bài viết, tắt loading
            }
        })
}
// Hàm thiết lập trạng thái loading cho chi tiết bài viết
const isLoadingDT = (boolean) => {
    return {
        type: types.IS_LOADING_DETAIL_B, // Loại action
        boolean // Trạng thái loading (true hoặc false)
    }
}
// Hàm lưu thông tin của một bài viết vào store
export const getOnePost = (post) => {
    return {
        type: types.GET_ONE_POST, // Loại action
        post // Thông tin bài viết
    }
}
// Hàm lưu thông tin bình luận vào store
const getComment = (comments) => {
    return {
        type: types.GET_COMMENT, // Loại action
        comments // Thông tin bình luận
    }
}
// Hàm thêm một bình luận vào một bài viết cụ thể
const addCmtPost = (cmt, id) => {
    return {
        type: types.ADD_CMT_POST, // Loại action
        cmt, // Thông tin bình luận
        id // ID của bài viết
    }
}
// Hàm thiết lập trạng thái loading cho bình luận
const isLoadingCmt = (boolean) => {
    return {
        type: types.IS_LOADING_CMT, // Loại action
        boolean // Trạng thái loading (true hoặc false)
    }
}
// Hàm thêm một bình luận vào một bài viết cụ thể
export const addCmtPostRequest = (dispatch, cmt, idPost) => {
    dispatch(isLoadingCmt(true)); // Bắt đầu quá trình thêm bình luận, hiển thị loading
    return callAPI(`/post/comment/${idPost}`, "POST", cmt, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
    })
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            cmt.author = {
                _id: `${sessionStorage.getItem("userID")}`, // Lấy ID người dùng từ sessionStorage
                image: `${sessionStorage.getItem("image")}`, // Lấy ảnh người dùng từ sessionStorage
                firstName: `${sessionStorage.getItem("firstName")}`, // Lấy tên người dùng từ sessionStorage
                lastName: `${sessionStorage.getItem("lastName")}`, // Lấy họ người dùng từ sessionStorage
            }
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(isLoadingCmt(false)); // Kết thúc quá trình thêm bình luận, tắt loading
                dispatch(addCmtPost(cmt, data.idCmt)); // Lưu thông tin bình luận vào store
            }
        })
        .catch(err => console.log(err)) // Ghi log lỗi để dễ dàng theo dõi
}
// Hàm trả lời một bình luận
const replyCmt = (replyCmt, idCmt) => {
    return {
        type: types.REPLY_COMMENT, // Loại action
        replyCmt, // Thông tin trả lời bình luận
        idCmt // ID của bình luận
    }
}
// Hàm trả lời một bình luận
export const replyCmtRequest = (dispatch, cmt, id) => {
    console.log(cmt);
    dispatch(isLoadingCmt(true)); // Bắt đầu quá trình trả lời bình luận, hiển thị loading
    return callAPI(`/post/replyCmt/${id}`, "POST", cmt, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
    })
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(replyCmt(data.replyCmt, id)); // Lưu thông tin trả lời bình luận vào store
                dispatch(isLoadingCmt(false)); // Kết thúc quá trình trả lời bình luận, tắt loading
            }
        })
        .catch(err => {
            console.log(err); // Ghi log lỗi để dễ dàng theo dõi
        })
}
// Hàm lưu thông tin bài viết theo trang vào store
const getPostByPage = (posts, totalPage) => {
    return {
        type: types.GET_POST_BY_PAGE, // Loại action
        posts, // Thông tin bài viết
        totalPage // Tổng số trang
    }
}
// Hàm lấy bài viết theo trang
export const getPostByPageRequest = (dispatch, value) => {
    dispatch(isLoadingDT(true)); // Bắt đầu quá trình tải bài viết theo trang, hiển thị loading
    return callAPI(`/post?page=${value.page}&limit=${value.limit}`) // Gọi API để lấy bài viết theo trang
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(getPostByPage(data.Posts, data.totalPage)); // Lưu thông tin bài viết và tổng số trang vào store
                dispatch(isLoadingDT(false)); // Kết thúc quá trình tải bài viết theo trang, tắt loading
            }
        })
        .catch(err => {
            console.log(err) // Ghi log lỗi để dễ dàng theo dõi
        })
}
// Hàm xóa một bình luận từ một bài viết
export const deleteCommentRequest = (dispatch, idCmt, idPost) => {
    return callAPI(`/post/${idPost}/comment/${idCmt}`, "DELETE") // Gọi API để xóa bình luận
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(deleteComment(idCmt, idPost)); // Xóa bình luận khỏi store
            }
        })
        .catch(err => {
            console.log(err); // Ghi log lỗi để dễ dàng theo dõi
        })
}
// Hàm xóa bình luận khỏi store
export const deleteComment = (idCmt, idPost) => {
    return {
        type: types.DELETE_CMT, // Loại action
        idCmt, // ID của bình luận
        idPost // ID của bài viết
    }
}
// Hàm reset thông tin bài viết trong store
export const onResetPosts = () => {
    return {
        type: types.ON_RESET_POSTS // Loại action
    }
}