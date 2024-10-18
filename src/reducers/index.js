import { combineReducers } from 'redux';
import { products } from './products';
import { posts } from './post';
import { comment } from './post/cmt';
import { loading } from './loading';
import { review } from './products/review';
import { user } from './user'
import { active } from './cart/active'
import { cart } from './cart';
import { subTotal } from './cart/subTotal';
export const appReducers = combineReducers({
    products,
    posts,
    loading,
    review,
    user,
    comment,
    active,
    cart,
    subTotal
})