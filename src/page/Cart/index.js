import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductInCartRequest, updateAllCartRequest, updateOneCart } from "../../actions/actionProducts";
import { CartItem } from './CartItem';
import "./index.css";
import { Loader } from '../../components/Loader';
import { formatNumber } from '../../helpers/formatNumber';
export const Cart = () => {
    const carts = useSelector(state => state.cart);
    const subTotal = useSelector(state => state.subTotal);
    const isLoading = useSelector(state => state.loading.loadingpc);
    const dispatch = useDispatch();
    const handleAddAmountProduct = (product, quantity) => {
        dispatch(updateOneCart(product, quantity));
    }
    const onSubmitUpdateCart = () => {
        updateAllCartRequest(dispatch, carts);
    }
    return (
        <div className="cart-wrap">
            {isLoading ? <Loader /> : ""}
            <Container fluid>
                <Row>
                    <Col lg={8}>
                        <ul className="cart-list">
                            {carts?.map(cart => {
                                return (
                                    <CartItem
                                        key={cart._id}
                                        cart={cart}
                                        deleteProductInCartRequest={deleteProductInCartRequest}
                                        handleAddAmountProduct={handleAddAmountProduct}
                                    />
                                )
                            })}
                        </ul>
                        <div className="cart-submit">
                            <button onClick={onSubmitUpdateCart}>Cập nhật giỏ hàng</button>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="cart-total_inner">
                            <h2>Cộng giỏ hàng</h2>
                            <div className="cart-box">
                                <p>Tạm tính:</p>
                                <p>{formatNumber(subTotal)}₫</p>
                            </div>
                            <div className="cart-box">
                                <p>Giao hàng:</p>
                                <p className="ps">Nhập địa chỉ để tính phí ship</p>
                            </div>
                            <div className="cart-box">
                                <p>Tổng:</p>
                                <p>{formatNumber(subTotal)}₫</p>
                            </div>
                            <div className="cart-next">
                                <Link to="/Checkout">Tiền hành thanh toán</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}