import * as types from '../constants/actionsType';
import {
    isLoadingAll,
    isLoadingBookstore,
    isLoadingDetailP,
    isLoadingPC,
    isLoadingCmt
} from './actionLoading';
import callAPI from '../untils/callAPI';
import { toast } from 'react-toastify';
import { toastConfig } from '../constants/configToast';
const fecthProduct = (products) => {
    return {
        type: types.GET_ALL_PRODUCT,
        products
    }
}
const fetchTypeProduct = (typeProduct) => {
    return {
        type: types.GET_ALL_TYPE_PRODUCT,
        typeProduct
    }
}

export const fetchAPIRequest = (dispatch) => {
    dispatch(isLoadingAll(false));
    const products = new Promise((resolve, reject) => {
        return callAPI("/products/all")
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    dispatch(fecthProduct(data.products));
                    resolve(data.products);
                }
            })
            .catch(err => {
                if (err) reject(err);
            })
    })
    const nxb = new Promise((resolve, reject) => {
        return callAPI("/tn/nxb")
            .then(res => res.data)
            .then(data => {
                if (data.status === 'success') {
                    dispatch(fetchNXB(data.nxb));
                    resolve(data.nxb)
                }
            })
            .catch(err => {
                console.log(err)
                reject(err);
            })
    })
    const posts = new Promise((resolve, reject) => {
        return callAPI("/post/all")
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    resolve(data.posts)
                    dispatch(fetchPosts(data.posts));
                }
            })
            .catch(err => {
                if (err) reject(err);
            })
    })
    const typeProduct = new Promise((resolve, reject) => {
        return callAPI("/tn/type")
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    dispatch(fetchTypeProduct(data.types))
                    resolve(data.types);
                }
            })
            .catch(err => reject(err))
    })
    Promise.all([products, posts, typeProduct, nxb])
        .then(result => {
            if (result) dispatch(isLoadingAll(true));
        })
        .catch(err => {
            console.log(err)
        })
}

export const searchProductByField = (dispatch, value) => {
    dispatch(isLoadingBookstore(false));
    return callAPI("/products/search-field", "POST", value)
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(fetchProductSearchField(data.searchResult));
                if (data.searchResult.length === 0) dispatch(isProductNotFound(true));
                else dispatch(isProductNotFound(false));
                dispatch(isLoadingBookstore(true));
            };
        })
}

const fetchPosts = (posts) => {
    return {
        type: types.GET_ALL_POST,
        posts
    }
}

const fetchNXB = (nxb) => {
    return {
        type: types.GET_ALL_NXB,
        nxb
    }
}

export const fetchProductByPageRequest = (dispatch, value) => {
    dispatch(isLoadingBookstore(false));
    return callAPI(`/products?page=${value.page}&limit=${value.limit}`)
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(fetchProductByPage(data.products, data.totalPage));
                dispatch(isProductNotFound(false));
            }
            dispatch(isLoadingBookstore(true));
        })
        .catch(err => console.log(err))
}

const fetchProductSearchField = (products) => {
    return {
        type: types.GET_PRODUCT_SEARCH_FIELD,
        products
    }
}

const fetchProductByPage = (products, totalPage) => {
    return {
        type: types.GET_PRODUCT_BY_PAGE,
        products,
        totalPage
    }
}


const getOneProduct = (product) => {
    return {
        type: types.GET_ONE_PRODUCT,
        product
    }
}


export const getOneProductRequest = (dispatch, id) => {
    dispatch(isLoadingDetailP(false));
    return callAPI(`/products/${id}`)
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(getOneProduct(data.product));
                dispatch(getProductRelated(data.product.types._id, data.product.publicCompany._id, data.product._id));
                dispatch({ type: types.GET_REVIEW, review: data.product.review })
                dispatch(getProductAlsoLike(data.product));
                dispatch(isLoadingDetailP(true));
            }
        })
}

export const filterProductByPrice = (dispatch, price) => {
    dispatch(isLoadingBookstore(false));
    return callAPI("/products/filter-price", "POST", { reqPrice: price })
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(fetchProductByPage(data.products, 0));
                dispatch(isLoadingBookstore(true));
                if (data.products.length === 0) dispatch(isProductNotFound(true));
                else dispatch(isProductNotFound(false));
            }
        })
        .catch(err => {
            console.log(err);
        })
}


const addReview = (rv) => {
    return {
        type: types.ADD_REVIEW_PRODUCT,
        rv
    }
}

export const addReviewRequest = (dispatch, value, id) => {
    dispatch(isLoadingCmt(true));
    return callAPI(`/products/review/${id}`, "POST", value, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
        .then(res => res.data)
        .then(data => {
            value.userID = {};
            value.userID.image = sessionStorage.getItem("image");
            value.userID.firstName = sessionStorage.getItem("firstName");
            value.userID.lastName = sessionStorage.getItem("lastName");
            if (data.status === "success") dispatch(addReview(value))
            dispatch(isLoadingCmt(false));
        })
        .catch(err => console.log(err))
}

export const deleteProductInCartRequest = (dispatch, id) => {
    return callAPI(`/user/cart/${id}`, "DELETE", {}, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(deleteProductInCart(id));
                dispatch(setSubTotalCart(data.subTotal))
            }
        })
}
export const deleteProductInCart = (id) => {
    return {
        type: types.DELETE_PRODUCT_IN_CART,
        id
    }
}

export const toggleCart = (boolean) => {
    return {
        type: types.TOGGLE_CART,
        boolean
    }
}

export const getCart = (carts) => {
    return {
        type: types.GET_CART,
        carts
    }
}

export const addCart = (product, quantity, id) => {
    return {
        type: types.ADD_CART,
        product,
        quantity,
        id
    }
}



export const resetCart = () => {
    return {
        type: types.RESET_CART
    }
}

export const updateAllCartRequest = (dispatch, listCart) => {
    dispatch(isLoadingPC(true));
    return callAPI("/user/cart/update-all", "POST", { newCart: listCart }, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
        .then(res => res.data)
        .then(data => {
            if (data.status === "success") {
                dispatch(setSubTotalCart(data.subTotal));
            } else {
                toast("Cập nhật giỏ hàng không thành công!", toastConfig);
            }
            dispatch(isLoadingPC(false));
        })
        .catch(err => console.log(err));
}

export const updateOneCart = (product, quantity) => {
    return {
        type: types.UPDATE_ONE_CART,
        product,
        quantity
    }
}

export const setSubTotalCart = (subTotal) => {
    return {
        type: types.SET_SUB_TOTAL_CART,
        subTotal
    }
}


export const addProductToCartRequest = async (product, quantity) => {
    let id = product._id;
    const { data } = await callAPI("/user/cart", "POST", { product: id, quantity: quantity, price: product.price - (product.price * (product.sale > 0 ? product.sale / 100 : 1)) }, {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    if (data.status === "success") return data;
    return [];
}


const getProductRelated = (idTypes, idCompany, id) => {
    return {
        type: types.GET_PRODUCT_RELATED,
        idTypes,
        idCompany,
        id
    }
}

export const getProductAlsoLike = (boolean) => {
    return {
        type: types.GET_PRODUCT_ALSO_LIKE,
        boolean
    }
}
const isProductNotFound = (boolean) => {
    return {
        type: types.PRODUCT_NOT_FOUND,
        boolean
    }
}