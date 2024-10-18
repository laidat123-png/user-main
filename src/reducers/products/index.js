import * as types from '../../constants/actionsType';

var initialState = {
    listProduct: [],
    product: {},
    review: [],
    productByPage: [],
    productsSale: [],
    productsPopular: [],
    productsNews: [],
    productTopRate: [],
    typeProduct: [],
    nxbProduct: [],
    productBox: [],
    productRelated: [],
    productAlsoLike: [],
    productNotFound: false,
    totalPage: 0
};


export const products = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_PRODUCT:
            action.products.map(product => {
                if (product.category.includes("Sale")) state.productsSale.push(product);
                if (product.category.includes("News")) state.productsNews.push(product);
                if (product.category.includes("Popular")) state.productsPopular.push(product);
                return;
            })
            state.productTopRate = action.products.sort((a, b) => b.averagedStars - a.averagedStars);
            state.productBox = action.products.filter((p, i) => i > action.products.length - 6);
            state.listProduct = action.products;
            return { ...state };
        case types.GET_ALL_TYPE_PRODUCT:
            state.typeProduct = action.typeProduct;
            return { ...state };
        case types.GET_PRODUCT_BY_PAGE:
            return { ...state, productByPage: action.products, totalPage: action.totalPage };
        case types.GET_ONE_PRODUCT:
            return { ...state, product: action.product };
        case types.GET_ALL_NXB:
            return { ...state, nxbProduct: action.nxb };
        case types.GET_PRODUCT_SEARCH_FIELD:
            return { ...state, productByPage: action.products, totalPage: 0 };
        case types.GET_PRODUCT_RELATED:
            state.productRelated = state.listProduct.filter(product => {
                return (
                    (product.types && product.types._id === action.idTypes) || 
                    (product.publicCompany && product.publicCompany._id === action.idCompany)
                ) && product._id !== action.id;
            });
            return { ...state };
        case types.GET_PRODUCT_ALSO_LIKE:
            if (action.boolean && state.listProduct.length > 4)  {
                let checkRandom = [];
                [...Array(4)].map(rd => {
                    do {
                        var getRandomNumber = Math.floor(Math.random() * state.listProduct.length);
                    } while (checkRandom.indexOf(getRandomNumber) > -1);
                    checkRandom.push(getRandomNumber);
                    return state.productAlsoLike.push(state.listProduct[getRandomNumber]);
                })
            } else {
                state.productAlsoLike = [];
            }
            return { ...state };
        case types.PRODUCT_NOT_FOUND:
            return { ...state, productNotFound: action.boolean };
        default: return { ...state };
    }
}
