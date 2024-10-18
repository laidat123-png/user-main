
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
        .catch(err => {
            console.log(err)
        })
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(setUser(data.user));
                dispatch(getCart(data.user.cart));
                dispatch(setSubTotalCart(data.subTotal));
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("firstName", data.user.firstName);
                sessionStorage.setItem("lastName", data.user.lastName);
                sessionStorage.setItem("image", data.user.image);
                sessionStorage.setItem("userID", data.user._id);
                dispatch(isLoadingAuth(false));

                history.goBack();
            } else {
                toast.warning(data.messenger, toastConfig)
                dispatch(isLoadingAuth(false));

            }
        })
}

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
                    dispatch(setUser(data.user));
                    dispatch(getCart(data.user.cart));
                    dispatch(setSubTotalCart(data.subTotal));
                    sessionStorage.setItem("userID", data.user._id);
                }
                else dispatch(setUser(null));
            })
            .catch(err => {
                console.log(err);
            })
    }
    return;
}


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