import './index.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { formatNumber } from '../../helpers/formatNumber';
export const OrderReceived = () => {
    const history = useHistory();
    const order = history.location.state;
    console.log(history.location);
    return (
        <div className="order">
            <Container>
                <div className="order-notice">
                    <p>Cảm ơn bạn. Đơn hàng đã được nhận</p>
                    <p>Mã đơn hàng của bạn là <span>{order?._id}</span></p>
                </div>
                {order ? <div className="order-overview">
                    <ul>
                        <li>
                            <p>Mã đơn hàng</p>
                            <p>{order._id}</p>
                        </li>
                        <li>
                            <p>Ngày</p>
                            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                        </li>
                        <li>
                            <p>Email</p>
                            <p>{order.email}</p>
                        </li>
                        <li>
                            <p>Tổng cộng</p>
                            <p>{formatNumber(order.total)}đ</p>
                        </li>
                        <li>
                            <p>Phương thức thanh toán</p>
                            <p>{order.pay==='cod'?'Trả tiền mặt khi giao hàng':order.pay==='vnpay'?'Chuyển khoản vnpay':''}</p>
                        </li>
                    </ul>
                </div> : ""}
                <div className="back-home">
                    <Link to="/SANPHAM">Tiếp tục mua sắm</Link>
                </div>
            </Container>
        </div>
    )
}