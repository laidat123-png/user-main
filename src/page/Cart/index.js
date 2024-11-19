import { Container, Row, Col } from 'react-bootstrap'; // Import các component Container, Row, Col từ react-bootstrap
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector và useDispatch từ react-redux
import { deleteProductInCartRequest, updateAllCartRequest, updateOneCart } from "../../actions/actionProducts"; // Import các action liên quan đến giỏ hàng
import { CartItem } from './CartItem'; // Import component CartItem
import "./index.css"; // Import file CSS cho component
import { Loader } from '../../components/Loader'; // Import component Loader
import { formatNumber } from '../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số

// Định nghĩa component Cart
export const Cart = () => {
    const carts = useSelector(state => state.cart); // Lấy danh sách sản phẩm trong giỏ hàng từ state
    const subTotal = useSelector(state => state.subTotal); // Lấy tổng tiền tạm tính từ state
    const isLoading = useSelector(state => state.loading.loadingpc); // Lấy trạng thái loading từ state
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch

    // Hàm xử lý thêm số lượng sản phẩm
    const handleAddAmountProduct = (product, quantity) => {
        dispatch(updateOneCart(product, quantity)); // Dispatch action updateOneCart
    }

    // Hàm xử lý cập nhật giỏ hàng
    const onSubmitUpdateCart = () => {
        updateAllCartRequest(dispatch, carts); // Gọi action updateAllCartRequest
    }

    return (
        <div className="cart-wrap">
            {isLoading ? <Loader /> : ""} {/* Hiển thị Loader nếu đang loading */}
            <Container fluid>
                <Row>
                    <Col lg={8}>
                        <ul className="cart-list">
                            {carts?.map(cart => {
                                return (
                                    <CartItem
                                        key={cart._id}
                                        cart={cart}
                                        deleteProductInCartRequest={deleteProductInCartRequest} // Truyền hàm deleteProductInCartRequest vào component CartItem
                                        handleAddAmountProduct={handleAddAmountProduct} // Truyền hàm handleAddAmountProduct vào component CartItem
                                    />
                                )
                            })}
                        </ul>
                        <div className="cart-submit">
                            <button onClick={onSubmitUpdateCart}>Cập nhật giỏ hàng</button> {/* Nút cập nhật giỏ hàng */}
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="cart-total_inner">
                            <h2>Cộng giỏ hàng</h2>
                            <div className="cart-box">
                                <p>Tạm tính:</p>
                                <p>{formatNumber(subTotal)}₫</p> {/* Hiển thị tổng tiền tạm tính */}
                            </div>
                            <div className="cart-box">
                                <p>Giao hàng:</p>
                                <p className="ps">Nhập địa chỉ để tính phí ship</p> {/* Hiển thị thông báo nhập địa chỉ để tính phí ship */}
                            </div>
                            <div className="cart-box">
                                <p>Tổng:</p>
                                <p>{formatNumber(subTotal)}₫</p> {/* Hiển thị tổng tiền */}
                            </div>
                            <div className="cart-next">
                                <Link to="/Checkout">Tiến hành thanh toán</Link> {/* Liên kết đến trang thanh toán */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}