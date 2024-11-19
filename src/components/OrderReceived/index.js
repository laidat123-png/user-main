import './index.css'; // Import file CSS cho component
import { Container } from 'react-bootstrap'; // Import component Container từ react-bootstrap
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang
import { useHistory } from 'react-router'; // Import useHistory từ react-router để điều hướng giữa các trang
import { formatNumber } from '../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số

// Định nghĩa component OrderReceived
export const OrderReceived = () => {
    const history = useHistory(); // Sử dụng useHistory để điều hướng giữa các trang
    const order = history.location.state; // Lấy thông tin đơn hàng từ state của history
    console.log(history.location); // Ghi log thông tin location của history

    return (
        <div className="order">
            <Container>
                <div className="order-notice">
                    <p>Cảm ơn bạn. Đơn hàng đã được nhận</p> {/* Hiển thị thông báo đơn hàng đã được nhận */}
                    <p>Mã đơn hàng của bạn là <span>{order?._id}</span></p> {/* Hiển thị mã đơn hàng */}
                </div>
                {order ? <div className="order-overview">
                    <ul>
                        <li>
                            <p>Mã đơn hàng</p>
                            <p>{order._id}</p> {/* Hiển thị mã đơn hàng */}
                        </li>
                        <li>
                            <p>Ngày</p>
                            <p>{new Date(order.createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày tạo đơn hàng */}
                        </li>
                        <li>
                            <p>Email</p>
                            <p>{order.email}</p> {/* Hiển thị email của người đặt hàng */}
                        </li>
                        <li>
                            <p>Tổng cộng</p>
                            <p>{formatNumber(order.total)}đ</p> {/* Hiển thị tổng số tiền của đơn hàng */}
                        </li>
                        <li>
                            <p>Phương thức thanh toán</p>
                            <p>{order.pay === 'cod' ? 'Trả tiền mặt khi giao hàng' : order.pay === 'vnpay' ? 'Chuyển khoản vnpay' : ''}</p> {/* Hiển thị phương thức thanh toán */}
                        </li>
                    </ul>
                </div> : ""}
                <div className="back-home">
                    <Link to="/SANPHAM">Tiếp tục mua sắm</Link> {/* Liên kết đến trang sản phẩm để tiếp tục mua sắm */}
                </div>
            </Container>
        </div>
    )
}