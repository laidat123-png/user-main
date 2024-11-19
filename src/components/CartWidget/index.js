import "./index.css"; // Import file CSS cho component
import { GrFormClose } from 'react-icons/gr'; // Import biểu tượng đóng từ react-icons
import { useSelector, useDispatch } from "react-redux"; // Import useSelector và useDispatch từ react-redux để lấy state và dispatch các action
import { toggleCart } from "../../actions/actionProducts"; // Import action toggleCart để bật/tắt giỏ hàng
import { formatNumber } from "../../helpers/formatNumber"; // Import hàm formatNumber để định dạng số
import { deleteProductInCartRequest } from "../../actions/actionProducts"; // Import action deleteProductInCartRequest để xóa sản phẩm khỏi giỏ hàng
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang

// Định nghĩa component CartWidget
export const CartWidget = () => {
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const isOpen = useSelector(state => state.active.activeCart); // Lấy trạng thái mở/đóng của giỏ hàng từ state
    const carts = useSelector(state => state.cart); // Lấy giỏ hàng từ state

    return (
        <div className={`cartWidget-wrap ${isOpen ? "active" : ""}`}> {/* Thiết lập lớp CSS cho giỏ hàng, thêm lớp "active" nếu giỏ hàng đang mở */}
            <div className="cartWidget-heading">
                <p className="cartWidget-title">GIỎ HÀNG</p> {/* Hiển thị tiêu đề giỏ hàng */}
                <div className="cartWidget-close" onClick={() => dispatch(toggleCart(false))}> {/* Đóng giỏ hàng khi nhấp vào */}
                    <span>CLOSE</span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <ul className="cartWidget-body">
                {carts?.map(cart => { // Duyệt qua danh sách sản phẩm trong giỏ hàng
                    return (
                        <li className="cartWidget-item" key={cart._id}> {/* Hiển thị từng sản phẩm trong giỏ hàng */}
                            <img src={cart.product.urls[0]?.url} alt={cart.product.title} /> {/* Hiển thị hình ảnh sản phẩm */}
                            <div className="cartWidget-item_info">
                                <div className="cartWidget-item_name">
                                    <Link to={`/CHITIETSANPHAM/${cart.product._id}`}>{cart.product.title}</Link> {/* Liên kết đến chi tiết sản phẩm */}
                                    <span onClick={() => deleteProductInCartRequest(dispatch, cart.product._id)}> {/* Xóa sản phẩm khỏi giỏ hàng khi nhấp vào */}
                                        <GrFormClose fontSize="1.2rem" /> {/* Hiển thị biểu tượng đóng */}
                                    </span>
                                </div>
                                <div className="cartWidget-item_price">
                                    <span>{cart.quantity} x</span> {/* Hiển thị số lượng sản phẩm */}
                                    {cart.product.sale > 0 ? <span className="cartWidget-item_sale">{formatNumber(cart.product.price)}</span> : ""} {/* Hiển thị giá gốc nếu có giảm giá */}
                                    {cart.product.sale > 0 ? <span>{formatNumber(cart.product.price - (cart.product.price * cart.product.sale / 100))}₫</span> : <span>{formatNumber(cart.product.price)}₫</span>} {/* Hiển thị giá sau khi giảm */}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="cartWidget-footer">
                <p className="cartWidget-total">
                    <span>TỔNG TIỀN:</span> {/* Hiển thị tổng tiền */}
                    <span>{formatNumber(carts?.reduce((total, cart) => total + ((cart.product.sale > 0 ? cart.product.price - (cart.product.price * cart.product.sale / 100) : cart.product.price) * cart.quantity), 0))}₫</span> {/* Tính và hiển thị tổng tiền của giỏ hàng */}
                </p>
                <div className="cartWidget-btn">
                    <Link to="/Cart" onClick={() => dispatch(toggleCart(false))}>Xem giỏ hàng</Link> {/* Liên kết đến trang giỏ hàng và đóng giỏ hàng */}
                    <Link to="/Checkout" onClick={() => dispatch(toggleCart(false))}>Thanh toán</Link> {/* Liên kết đến trang thanh toán và đóng giỏ hàng */}
                </div>
            </div>
        </div>
    )
}