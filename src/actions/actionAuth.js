
import { toast } from 'react-toastify';
import callAPI from '../untils/callAPI';
import * as types from '../constants/actionsType';
import { toastConfig } from '../constants/configToast';
import { getCart, resetCart, setSubTotalCart } from './actionProducts';



export const setUser = (user) => {
    return {
        type: types.SET_USER,
        user
    }
}

export const signIn = (history, dispatch, value) => {
    dispatch(isLoadingAuth(true));
    return callAPI("/auth/login", "POST", value)
        .then(res => res.data)
        .then(async data => { // Đổi thành async để có thể sử dụng await
            if (data.status === "success") {
                // Kiểm tra trạng thái tài khoản
                if (data.user.status === "không hoạt động" || data.user.status === "bị khóa") {
                    toast.warning("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ để được mở khóa.", toastConfig);
                    await signOut(dispatch);  // Đăng xuất
                    history.push("/");  // Chuyển hướng về trang đăng nhập
                    return;
                }

                // Đăng nhập thành công
                dispatch(setUser(data.user));
                dispatch(getCart(data.user.cart));
                dispatch(setSubTotalCart(data.subTotal));
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("firstName", data.user.firstName);
                sessionStorage.setItem("lastName", data.user.lastName);
                sessionStorage.setItem("image", data.user.image);
                sessionStorage.setItem("userID", data.user._id);

                // Gọi lại thông tin người dùng để cập nhật trạng thái
                await getCurrentUser(dispatch); // Lấy lại thông tin người dùng sau khi đăng nhập

                dispatch(isLoadingAuth(false));
                history.goBack(); // Trở về trang trước đó
            } else {
                toast.warning(data.messenger, toastConfig);
                dispatch(isLoadingAuth(false));
            }
        })
        .catch(error => {
            toast.error("Đã xảy ra lỗi trong quá trình đăng nhập!", toastConfig);
            dispatch(isLoadingAuth(false));
            console.error(error); // Ghi log lỗi để dễ dàng theo dõi
        });
};





export const signUp = (history, dispatch, value) => {
    dispatch(isLoadingAuth(true));
    return callAPI("/auth/register", "POST", value)
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                toast("Đăng ký tài khoản thành công!", toastConfig);
                dispatch(setUser(data.user));
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("firstName", data.user.firstName);
                sessionStorage.setItem("lastName", data.user.lastName);
                sessionStorage.setItem("image", data.user.image);
                sessionStorage.setItem("userID", data.user._id);
                dispatch(isLoadingAuth(false));

                history.goBack();
            } else {
                dispatch(isLoadingAuth(false));
                toast.warning(data.messenger, toastConfig);
            }
        })
}

export const getCurrentUser = (dispatch) => {
    if (sessionStorage.getItem("token")) {
        return callAPI("/auth", "GET", null, {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    if (data.user.status === "không hoạt động") {
                        toast.warning("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ để được mở khóa.", toastConfig);
                        signOut(dispatch);
                        window.location.href = "/Auth";  // Chuyển hướng đến trang đăng nhập
                        return;
                    }

                    dispatch(setUser(data.user));
                    dispatch(getCart(data.user.cart));
                    dispatch(setSubTotalCart(data.subTotal));
                    sessionStorage.setItem("userID", data.user._id);
                } else {
                    dispatch(setUser(null));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    return;
};




export const signOut = (dispatch) => {
    
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("image");
    sessionStorage.removeItem("userID");
    dispatch(setUser(null));
    dispatch(resetCart());
}

export const updateUserRequest = async (dispatch, formData) => {
    const { data } = await callAPI("/user", "POST", formData, {
        "Authorization": `${sessionStorage.getItem("token")}`
    })
    if (data) {
        dispatch(setUser(data.user))
        sessionStorage.setItem("firstName", data.user.firstName);
        sessionStorage.setItem("lastName", data.user.lastName);
        sessionStorage.setItem("image", data.user.image);
        sessionStorage.setItem("userID", data.user._id);
        return false;
    }
    return false;
}

const isLoadingAuth = (boolean) => {
    return {
        type: types.IS_LOADING_AUTH,
        boolean
    }
}