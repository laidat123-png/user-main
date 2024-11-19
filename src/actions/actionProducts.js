import * as types from '../constants/actionsType'; // Import các hằng số action type
import {
    isLoadingAll,
    isLoadingBookstore,
    isLoadingDetailP,
    isLoadingPC,
    isLoadingCmt
} from './actionLoading'; // Import các hàm thiết lập trạng thái loading
import callAPI from '../untils/callAPI'; // Import hàm callAPI để gọi API
import { toast } from 'react-toastify'; // Import thư viện toast để hiển thị thông báo
import { toastConfig } from '../constants/configToast'; // Import cấu hình toast

// Hàm lưu thông tin tất cả sản phẩm vào store
const fecthProduct = (products) => {
    return {
        type: types.GET_ALL_PRODUCT, // Loại action
        products // Thông tin sản phẩm
    }
}

// Hàm lưu thông tin tất cả loại sản phẩm vào store
const fetchTypeProduct = (typeProduct) => {
    return {
        type: types.GET_ALL_TYPE_PRODUCT, // Loại action
        typeProduct // Thông tin loại sản phẩm
    }
}

// Lấy tất cả sản phẩm từ API
export const fetchAPIRequest = (dispatch) => {
    dispatch(isLoadingAll(false)); // Bắt đầu quá trình tải tất cả sản phẩm, hiển thị loading
    const products = new Promise((resolve, reject) => {
        return callAPI("/products/all") // Gọi API để lấy tất cả sản phẩm
            .then(res => res.data) // Lấy dữ liệu từ phản hồi API
            .then(data => {
                if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                    dispatch(fecthProduct(data.products)); // Lưu thông tin sản phẩm vào store
                    resolve(data.products); // Giải quyết promise với dữ liệu sản phẩm
                }
            })
            .catch(err => {
                if (err) reject(err); // Từ chối promise nếu có lỗi
            })
    })
    // Lấy tất cả nhà xuất bản từ API
    const nxb = new Promise((resolve, reject) => {
        return callAPI("/tn/nxb") // Gọi API để lấy tất cả nhà xuất bản
            .then(res => res.data) // Lấy dữ liệu từ phản hồi API
            .then(data => {
                if (data.status === 'success') { // Kiểm tra trạng thái phản hồi
                    dispatch(fetchNXB(data.nxb)); // Lưu thông tin nhà xuất bản vào store
                    resolve(data.nxb) // Giải quyết promise với dữ liệu nhà xuất bản
                }
            })
            .catch(err => {
                console.log(err) // Ghi log lỗi để dễ dàng theo dõi
                reject(err); // Từ chối promise nếu có lỗi
            })
    })
    // Lấy tất cả bài viết từ API
    const posts = new Promise((resolve, reject) => {
        return callAPI("/post/all") // Gọi API để lấy tất cả bài viết
            .then(res => res.data) // Lấy dữ liệu từ phản hồi API
            .then(data => {
                if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                    resolve(data.posts) // Giải quyết promise với dữ liệu bài viết
                    dispatch(fetchPosts(data.posts)); // Lưu thông tin bài viết vào store
                }
            })
            .catch(err => {
                if (err) reject(err); // Từ chối promise nếu có lỗi
            })
    })
    // Lấy tất cả loại sản phẩm từ API
    const typeProduct = new Promise((resolve, reject) => {
        return callAPI("/tn/type") // Gọi API để lấy tất cả loại sản phẩm
            .then(res => res.data) // Lấy dữ liệu từ phản hồi API
            .then(data => {
                if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                    dispatch(fetchTypeProduct(data.types)) // Lưu thông tin loại sản phẩm vào store
                    resolve(data.types); // Giải quyết promise với dữ liệu loại sản phẩm
                }
            })
            .catch(err => reject(err)) // Từ chối promise nếu có lỗi
    })
    
    Promise.all([products, posts, typeProduct, nxb]) // Chờ tất cả các promise hoàn thành
        .then(result => {
            if (result) dispatch(isLoadingAll(true)); // Kết thúc quá trình tải tất cả sản phẩm, tắt loading
        })
        .catch(err => {
            console.log(err) // Ghi log lỗi để dễ dàng theo dõi
        })
}

// Tìm kiếm sản phẩm dựa trên một trường cụ thể
export const searchProductByField = (dispatch, value) => {
    dispatch(isLoadingBookstore(false)); // Bắt đầu quá trình tìm kiếm sản phẩm, hiển thị loading
    return callAPI("/products/search-field", "POST", value) // Gọi API để tìm kiếm sản phẩm
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(fetchProductSearchField(data.searchResult)); // Lưu kết quả tìm kiếm vào store
                if (data.searchResult.length === 0) dispatch(isProductNotFound(true)); // Nếu không tìm thấy sản phẩm, thiết lập trạng thái không tìm thấy sản phẩm
                else dispatch(isProductNotFound(false)); // Nếu tìm thấy sản phẩm, thiết lập trạng thái tìm thấy sản phẩm
                dispatch(isLoadingBookstore(true)); // Kết thúc quá trình tìm kiếm sản phẩm, tắt loading
            };
        })
}

// Hàm lưu thông tin bài viết vào store
const fetchPosts = (posts) => {
    return {
        type: types.GET_ALL_POST, // Loại action
        posts // Thông tin bài viết
    }
}

// Hàm lưu thông tin nhà xuất bản vào store
const fetchNXB = (nxb) => {
    return {
        type: types.GET_ALL_NXB, // Loại action
        nxb // Thông tin nhà xuất bản
    }
}

// Lấy danh sách các sản phẩm với phân trang
export const fetchProductByPageRequest = (dispatch, value) => {
    dispatch(isLoadingBookstore(false)); // Bắt đầu quá trình tải sản phẩm theo trang, hiển thị loading
    return callAPI(`/products?page=${value.page}&limit=${value.limit}`) // Gọi API để lấy sản phẩm theo trang
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(fetchProductByPage(data.products, data.totalPage)); // Lưu thông tin sản phẩm và tổng số trang vào store
                dispatch(isProductNotFound(false)); // Thiết lập trạng thái tìm thấy sản phẩm
            }
            dispatch(isLoadingBookstore(true)); // Kết thúc quá trình tải sản phẩm theo trang, tắt loading
        })
        .catch(err => console.log(err)) // Ghi log lỗi để dễ dàng theo dõi
}

// Hàm lưu thông tin sản phẩm tìm kiếm vào store
const fetchProductSearchField = (products) => {
    return {
        type: types.GET_PRODUCT_SEARCH_FIELD, // Loại action
        products // Thông tin sản phẩm
    }
}

// Hàm lưu thông tin sản phẩm theo trang vào store
const fetchProductByPage = (products, totalPage) => {
    return {
        type: types.GET_PRODUCT_BY_PAGE, // Loại action
        products, // Thông tin sản phẩm
        totalPage // Tổng số trang
    }
}

// Hàm lưu thông tin chi tiết một sản phẩm vào store
const getOneProduct = (product) => {
    return {
        type: types.GET_ONE_PRODUCT, // Loại action
        product // Thông tin sản phẩm
    }
}

// Lấy thông tin chi tiết một sản phẩm dựa trên id
export const getOneProductRequest = (dispatch, id) => {
    dispatch(isLoadingDetailP(false)); // Bắt đầu quá trình tải chi tiết sản phẩm, hiển thị loading
    return callAPI(`/products/${id}`) // Gọi API để lấy thông tin chi tiết sản phẩm
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(getOneProduct(data.product)); // Lưu thông tin chi tiết sản phẩm vào store
                dispatch(getProductRelated(data.product.types._id, data.product.publicCompany._id, data.product._id)); // Lấy sản phẩm liên quan
                dispatch({ type: types.GET_REVIEW, review: data.product.review }) // Lưu thông tin đánh giá sản phẩm vào store
                dispatch(getProductAlsoLike(data.product)); // Lấy sản phẩm tương tự
                dispatch(isLoadingDetailP(true)); // Kết thúc quá trình tải chi tiết sản phẩm, tắt loading
            }
        })
}

// Lọc các sản phẩm dựa trên giá cả
export const filterProductByPrice = (dispatch, price) => {
    dispatch(isLoadingBookstore(false)); // Bắt đầu quá trình lọc sản phẩm, hiển thị loading
    return callAPI("/products/filter-price", "POST", { reqPrice: price }) // Gọi API để lọc sản phẩm theo giá
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(fetchProductByPage(data.products, 0)); // Lưu thông tin sản phẩm vào store
                dispatch(isLoadingBookstore(true)); // Kết thúc quá trình lọc sản phẩm, tắt loading
                if (data.products.length === 0) dispatch(isProductNotFound(true)); // Nếu không tìm thấy sản phẩm, thiết lập trạng thái không tìm thấy sản phẩm
                else dispatch(isProductNotFound(false)); // Nếu tìm thấy sản phẩm, thiết lập trạng thái tìm thấy sản phẩm
            }
        })
        .catch(err => {
            console.log(err); // Ghi log lỗi để dễ dàng theo dõi
        })
}

// Hàm lưu thông tin đánh giá sản phẩm vào store
const addReview = (rv) => {
    return {
        type: types.ADD_REVIEW_PRODUCT, // Loại action
        rv // Thông tin đánh giá
    }
}

// Thêm một đánh giá cho sản phẩm
export const addReviewRequest = (dispatch, value, id) => {
    dispatch(isLoadingCmt(true)); // Bắt đầu quá trình thêm đánh giá, hiển thị loading
    return callAPI(`/products/review/${id}`, "POST", value, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
    })
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            value.userID = {};
            value.userID.image = sessionStorage.getItem("image"); // Lấy ảnh người dùng từ sessionStorage
            value.userID.firstName = sessionStorage.getItem("firstName"); // Lấy tên người dùng từ sessionStorage
            value.userID.lastName = sessionStorage.getItem("lastName"); // Lấy họ người dùng từ sessionStorage
            if (data.status === "success") dispatch(addReview(value)) // Nếu thành công, lưu thông tin đánh giá vào store
            dispatch(isLoadingCmt(false)); // Kết thúc quá trình thêm đánh giá, tắt loading
        })
        .catch(err => console.log(err)) // Ghi log lỗi để dễ dàng theo dõi
}

// Xóa một sản phẩm cụ thể khỏi giỏ hàng của người dùng
export const deleteProductInCartRequest = (dispatch, id) => {
    return callAPI(`/user/cart/${id}`, "DELETE", {}, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
    })
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(deleteProductInCart(id)); // Xóa sản phẩm khỏi giỏ hàng trong store
                dispatch(setSubTotalCart(data.subTotal)) // Cập nhật tổng tiền giỏ hàng
            }
        })
}

// Hàm xóa sản phẩm khỏi giỏ hàng trong store
export const deleteProductInCart = (id) => {
    return {
        type: types.DELETE_PRODUCT_IN_CART, // Loại action
        id // ID của sản phẩm
    }
}

// Hàm bật/tắt giỏ hàng
export const toggleCart = (boolean) => {
    return {
        type: types.TOGGLE_CART, // Loại action
        boolean // Trạng thái bật/tắt giỏ hàng
    }
}

// Hàm lưu thông tin giỏ hàng vào store
export const getCart = (carts) => {
    return {
        type: types.GET_CART, // Loại action
        carts // Thông tin giỏ hàng
    }
}

// Hàm thêm sản phẩm vào giỏ hàng trong store
export const addCart = (product, quantity, id) => {
    return {
        type: types.ADD_CART, // Loại action
        product, // Thông tin sản phẩm
        quantity, // Số lượng
        id // ID của sản phẩm
    }
}

// Hàm reset giỏ hàng trong store
export const resetCart = () => {
    return {
        type: types.RESET_CART // Loại action
    }
}

// Cập nhật giỏ hàng của người dùng
export const updateAllCartRequest = (dispatch, listCart) => {
    dispatch(isLoadingPC(true)); // Bắt đầu quá trình cập nhật giỏ hàng, hiển thị loading
    return callAPI("/user/cart/update-all", "POST", { newCart: listCart }, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
    })
        .then(res => res.data) // Lấy dữ liệu từ phản hồi API
        .then(data => {
            if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                dispatch(setSubTotalCart(data.subTotal)); // Cập nhật tổng tiền giỏ hàng
            } else {
                toast("Cập nhật giỏ hàng không thành công!", toastConfig); // Hiển thị thông báo lỗi
            }
            dispatch(isLoadingPC(false)); // Kết thúc quá trình cập nhật giỏ hàng, tắt loading
        })
        .catch(err => console.log(err)); // Ghi log lỗi để dễ dàng theo dõi
}

// Hàm cập nhật một sản phẩm trong giỏ hàng
export const updateOneCart = (product, quantity) => {
    return {
        type: types.UPDATE_ONE_CART, // Loại action
        product, // Thông tin sản phẩm
        quantity // Số lượng
    }
}

// Hàm thiết lập tổng tiền giỏ hàng
export const setSubTotalCart = (subTotal) => {
    return {
        type: types.SET_SUB_TOTAL_CART, // Loại action
        subTotal // Tổng tiền giỏ hàng
    }
}

// Thêm một sản phẩm vào giỏ hàng của người dùng
export const addProductToCartRequest = async (product, quantity) => {
    let id = product._id;
    const { data } = await callAPI("/user/cart", "POST", { product: id, quantity: quantity, price: product.price - (product.price * (product.sale > 0 ? product.sale / 100 : 1)) }, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Gửi token trong header
    })
    if (data.status === "success") return data; // Nếu thành công, trả về dữ liệu
    return []; // Nếu thất bại, trả về mảng rỗng
}

// Hàm lấy sản phẩm liên quan
const getProductRelated = (idTypes, idCompany, id) => {
    return {
        type: types.GET_PRODUCT_RELATED, // Loại action
        idTypes, // ID loại sản phẩm
        idCompany, // ID công ty
        id // ID sản phẩm
    }
}

// Hàm lấy sản phẩm tương tự
export const getProductAlsoLike = (boolean) => {
    return {
        type: types.GET_PRODUCT_ALSO_LIKE, // Loại action
        boolean // Trạng thái sản phẩm tương tự
    }
}

// Hàm thiết lập trạng thái không tìm thấy sản phẩm
const isProductNotFound = (boolean) => {
    return {
        type: types.PRODUCT_NOT_FOUND, // Loại action
        boolean // Trạng thái không tìm thấy sản phẩm
    }
}