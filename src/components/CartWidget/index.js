import "./index.css";
import { GrFormClose } from 'react-icons/gr';
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../actions/actionProducts";
import { formatNumber } from "../../helpers/formatNumber";
import { deleteProductInCartRequest } from "../../actions/actionProducts";
import { Link } from 'react-router-dom';
export const CartWidget = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.active.activeCart);
    const carts = useSelector(state => state.cart);
    return (
        <div className={`cartWidget-wrap ${isOpen ? "active" : ""}`}>
            <div className="cartWidget-heading">
                <p className="cartWidget-title">GIỎ HÀNG</p>
                <div className="cartWidget-close" onClick={() => dispatch(toggleCart(false))}>
                    <span>CLOSE</span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <ul className="cartWidget-body">
                {carts?.map(cart => {
                    return (
                        <li className="cartWidget-item" key={cart._id}>
                            <img src={cart.product.urls[0]?.url} alt={cart.product.title} />
                            <div className="cartWidget-item_info">
                                <div className="cartWidget-item_name">
                                    <Link to={`/Detail-product/${cart.product._id}`}>{cart.product.title}</Link>
                                    <span onClick={() => deleteProductInCartRequest(dispatch, cart.product._id)}>
                                        <GrFormClose
                                            fontSize="1.2rem"
                                        />
                                    </span>
                                </div>
                                <div className="cartWidget-item_price">
                                    <span>{cart.quantity} x</span>
                                    {cart.product.sale > 0 ? <span className="cartWidget-item_sale">{formatNumber(cart.product.price)}</span> : ""}
                                    {cart.product.sale < 0 ? <span>{formatNumber(cart.product.price)}</span> : <span>{formatNumber(cart.product.sale > 0 ? cart.product.price - (cart.product.price * cart.product.sale / 100) : cart.product.price)}₫</span>}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="cartWidget-footer">
                <p className="cartWidget-total">
                    <span>TỔNG TIỀN:</span>
                    <span>{formatNumber(carts?.reduce((total, cart) => total + ((cart.product.sale > 0 ? cart.product.price - (cart.product.price * cart.product.sale / 100) : cart.product.price) * cart.quantity), 0))}₫</span>
                </p>
                <div className="cartWidget-btn">
                    <Link to="/Cart" onClick={() => dispatch(toggleCart(false))}>Xem giỏ hàng</Link>
                    <Link to="/Checkout" onClick={() => dispatch(toggleCart(false))} >Thanh toán</Link>
                </div>
            </div>
        </div>
    )
}