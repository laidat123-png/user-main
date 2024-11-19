import { toast } from 'react-toastify';
import callAPI from '../untils/callAPI';
import * as types from '../constants/actionsType';
import { toastConfig } from '../constants/configToast';
import { getCart, resetCart, setSubTotalCart } from './actionProducts';

// Action để thiết lập thông tin người dùng
export const setUser = (user) => {
    return {
        type: types.SET_USER,
        user
    }
}
// Hàm đăng nhập
export const signIn = (history, dispatch, value) => {
    dispatch(isLoadingAuth(true)); // Bắt đầu quá trình đăng nhập, hiển thị loading
    return callAPI("/auth/login", "POST", value) // Gọi API đăng nhập
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(async data => { // Đổi thành async để có thể sử dụng await
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                // Kiểm tra trạng thái tài khoản
                if (data.user.status === "không hoạt động" || data.user.status === "bị khóa") {
                    toast.warning("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ để được mở khóa.", toastConfig);
                    await signOut(dispatch);  // Đăng xuất
                    history.push("/");  // Chuyển hướng về trang đăng nhập
                    return;
                }
                // Đăng nhập thành công
                dispatch(setUser(data.user)); // Lưu thông tin người dùng vào store
                dispatch(getCart(data.user.cart)); // Lấy giỏ hàng của người dùng
                dispatch(setSubTotalCart(data.subTotal)); // Thiết lập tổng tiền giỏ hàng
                sessionStorage.setItem("token", data.token); // Lưu token vào sessionStorage
                sessionStorage.setItem("firstName", data.user.firstName); // Lưu tên vào sessionStorage
                sessionStorage.setItem("lastName", data.user.lastName); // Lưu họ vào sessionStorage
                sessionStorage.setItem("image", data.user.image); // Lưu ảnh vào sessionStorage
                sessionStorage.setItem("userID", data.user._id); // Lưu ID người dùng vào sessionStorage
                // Gọi lại thông tin người dùng để cập nhật trạng thái
                await getCurrentUser(dispatch); // Lấy lại thông tin người dùng sau khi đăng nhập
                dispatch(isLoadingAuth(false)); // Kết thúc quá trình đăng nhập, tắt loading
                history.goBack(); // Trở về trang trước đó
            } else {
                toast.warning(data.messenger, toastConfig); // Hiển thị thông báo lỗi
                dispatch(isLoadingAuth(false)); // Kết thúc quá trình đăng nhập, tắt loading
            }
        })
        .catch(error => {
            toast.error("Đã xảy ra lỗi trong quá trình đăng nhập!", toastConfig); // Hiển thị thông báo lỗi
            dispatch(isLoadingAuth(false)); // Kết thúc quá trình đăng nhập, tắt loading
            console.error(error);
        });
};
// Hàm đăng ký
export const signUp = (history, dispatch, value) => {
    dispatch(isLoadingAuth(true)); // Bắt đầu quá trình đăng ký, hiển thị loading
    return callAPI("/auth/register", "POST", value) // Gọi API đăng ký
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                toast("Đăng ký tài khoản thành công!", toastConfig); // Hiển thị thông báo thành công
                dispatch(setUser(data.user)); // Lưu thông tin người dùng vào store
                sessionStorage.setItem("token", data.token); // Lưu token vào sessionStorage
                sessionStorage.setItem("firstName", data.user.firstName);
                sessionStorage.setItem("lastName", data.user.lastName);
                sessionStorage.setItem("image", data.user.image);
                sessionStorage.setItem("userID", data.user._id);
                dispatch(isLoadingAuth(false));
                history.goBack(); // Trở về trang trước đó
            } else {
                dispatch(isLoadingAuth(false)); // Kết thúc quá trình đăng ký, tắt loading
                toast.warning(data.messenger, toastConfig);
            }
        })
}
// Hàm lấy thông tin người dùng hiện tại
export const getCurrentUser = (dispatch) => {
    if (sessionStorage.getItem("token")) { // Kiểm tra xem token có tồn tại trong sessionStorage không
        return callAPI("/auth", "GET", null, {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
        })
            .then(res => res.data) // Lấy dữ liệu từ phản hồi API
            .then(data => {
                if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                    if (data.user.status === "không hoạt động") { // Kiểm tra trạng thái tài khoản
                        toast.warning("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ để được mở khóa.", toastConfig);
                        signOut(dispatch); // Đăng xuất
                        window.location.href = "/Auth";  // Chuyển hướng đến trang đăng nhập
                        return;
                    }
                    dispatch(setUser(data.user)); // Lưu thông tin người dùng vào store
                    dispatch(getCart(data.user.cart)); // Lấy giỏ hàng của người dùng
                    dispatch(setSubTotalCart(data.subTotal)); // Thiết lập tổng tiền giỏ hàng
                    sessionStorage.setItem("userID", data.user._id); // Lưu ID người dùng vào sessionStorage
                } else {
                    dispatch(setUser(null)); // Nếu không thành công, thiết lập người dùng là null
                }
            })
            .catch(err => {
                console.log(err); // Ghi log lỗi để dễ dàng theo dõi
            });
    }
    return;
};
// Hàm đăng xuất
export const signOut = (dispatch) => {
    sessionStorage.removeItem("token"); // Xóa token khỏi sessionStorage
    sessionStorage.removeItem("firstName"); // Xóa tên khỏi sessionStorage
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("image"); 
    sessionStorage.removeItem("userID"); 
    dispatch(setUser(null)); // Thiết lập người dùng là null
    dispatch(resetCart()); // Đặt lại giỏ hàng
}
// Hàm cập nhật thông tin người dùng
export const updateUserRequest = async (dispatch, formData) => {
    const { data } = await callAPI("/user", "POST", formData, {
        "Authorization": `${sessionStorage.getItem("token")}` // Gửi token trong header
    })
    if (data) {
        dispatch(setUser(data.user)) // Lưu thông tin người dùng vào store
        sessionStorage.setItem("firstName", data.user.firstName); // Lưu tên vào sessionStorage
        sessionStorage.setItem("lastName", data.user.lastName); 
        sessionStorage.setItem("image", data.user.image); 
        sessionStorage.setItem("userID", data.user._id); 
        return false;
    }
    return false;
}
// Hàm thiết lập trạng thái loading cho quá trình xác thực
const isLoadingAuth = (boolean) => {
    return {
        type: types.IS_LOADING_AUTH,
        boolean
    }
}