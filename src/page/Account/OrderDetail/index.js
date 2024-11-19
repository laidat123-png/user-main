import { FaReceipt, FaCheckSquare, FaShippingFast, FaRegStar } from 'react-icons/fa'; // Import các biểu tượng từ react-icons
import { AiOutlineLeft } from 'react-icons/ai'; // Import biểu tượng mũi tên trái từ react-icons
import { formatNumber } from '../../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số
import { useEffect } from 'react'; // Import useEffect từ react

// Định nghĩa component OrderDetail
export const OrderDetail = (props) => {
    const { orderDetail, showStatus, showStatusStep, setActive } = props; // Lấy các props truyền vào component

    useEffect(() => {
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        });
    }, [orderDetail]) // Cuộn trang đến vị trí (500, 500) khi orderDetail thay đổi

    return (
        <div className="order-detail_wrap">
            <div className="order-header">
                <button className="order-header-btn" onClick={() => setActive({ profile: false, orders: true, orderDetail: false })} >
                    <AiOutlineLeft /> {/* Hiển thị biểu tượng mũi tên trái */}
                    Trở lại
                </button>
                <div className="order-id-status">
                    <span>ID Đơn hàng : {orderDetail._id}</span> {/* Hiển thị ID đơn hàng */}
                    <span>{showStatus(orderDetail.status)}</span> {/* Hiển thị trạng thái đơn hàng */}
                </div>
            </div>
            <div className="stepper">
                <div className={`stepper__step ${orderDetail.status >= 0 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaReceipt /> {/* Hiển thị biểu tượng chờ xác nhận */}
                    </div>
                    <div className="stepper__step-text">
                        Chờ xác nhận
                    </div>
                </div>
                <div className={`stepper__step ${orderDetail.status >= 1 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaCheckSquare /> {/* Hiển thị biểu tượng đã xác nhận */}
                    </div>
                    <div className="stepper__step-text">
                        Đã xác nhận
                    </div>
                </div>
                <div className={`stepper__step ${orderDetail.status >= 2 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaShippingFast /> {/* Hiển thị biểu tượng đang giao hàng */}
                    </div>
                    <div className="stepper__step-text">
                        Đang giao hàng
                    </div>
                </div>
                <div className={`stepper__step ${orderDetail.status >= 3 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaRegStar /> {/* Hiển thị biểu tượng đã giao xong */}
                    </div>
                    <div className="stepper__step-text">
                        Đã giao xong
                    </div>
                </div>
                <div className="stepper__line">
                    <div className="stepper__line-background"></div>
                    <div style={{ width: `${showStatusStep(orderDetail.status)}` }} className="stepper__line-foreground"></div> {/* Hiển thị tiến trình giao hàng */}
                </div>
            </div>
            <div className="order-body">
                <div className="order-body_receiver">
                    <h3>Thông tin người nhận</h3>
                    <p>{orderDetail.name}</p> {/* Hiển thị tên người nhận */}
                    <p>(+84) {orderDetail.phone.slice(1)}</p> {/* Hiển thị số điện thoại người nhận */}
                    <p>{orderDetail.address}</p> {/* Hiển thị địa chỉ người nhận */}
                    <p>Ghi chú : {orderDetail?.note || "Không có"}</p> {/* Hiển thị ghi chú nếu có */}
                </div>
                <div className="show-order">
                    {orderDetail.productDetail.map(product => {
                        return (
                            <div className="order-detail" key={product.productID._id}>
                                <img style={{ width: "70px", height: "70px" }} src={product.productID.urls[0].url} alt={product.productID.title} /> {/* Hiển thị hình ảnh sản phẩm */}
                                <div className="order-title">
                                    <p>{product.productID.title}</p> {/* Hiển thị tên sản phẩm */}
                                    <div className="order-title_d">
                                        <p>Thể loại: {product.productID.types.name}</p> {/* Hiển thị thể loại sản phẩm */}
                                        <p>{formatNumber(product.productID.sale > 0 ? product.productID.price - (product.productID.price * product.productID.sale / 100) : product?.productID.price)}₫</p> {/* Hiển thị giá sản phẩm */}
                                    </div>
                                    <p>x{product.quantity}</p> {/* Hiển thị số lượng sản phẩm */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="order-footer">
                <div className="order-footer_row">
                    <p>Tổng tiền sản phẩm</p>
                    <p>{formatNumber(orderDetail.productDetail.reduce((total, product) => {
                        let price = product.productID.sale > 0 ? product.productID.price - (product.productID.price * product.productID.sale / 100) : product?.productID.price;
                        return total + price * product.quantity;
                    }, 0))}₫</p> {/* Hiển thị tổng tiền sản phẩm */}
                </div>
                <div className="order-footer_row">
                    <p>Phí vận chuyển</p>
                    <p>30.000₫</p> {/* Hiển thị phí vận chuyển */}
                </div>
                <div className="order-footer_row">
                    <p>Mã giảm giá</p>
                    <p>{orderDetail?.saleCode?.code || "Không"}</p> {/* Hiển thị mã giảm giá nếu có */}
                </div>
                <div className="order-footer_row">
                    <p>Giảm giá</p>
                    <p>-{orderDetail.saleCode ? formatNumber(orderDetail?.saleCode?.discount) : "" || "0"}{orderDetail?.saleCode?.type}</p> {/* Hiển thị số tiền giảm giá */}
                </div>
                <div className="order-footer_row">
                    <p>Tổng cộng</p>
                    <p>{formatNumber(orderDetail.total)}₫</p> {/* Hiển thị tổng cộng */}
                </div>
                <div className="order-footer_row">
                    <p>Phương thức thanh toán</p>
                    <p>{orderDetail.pay==='cod'?'Trả tiền mặt':orderDetail.pay==='vnpay'?'Chuyển khoản vnpay':'Trả tiền mặt'}</p> {/* Hiển thị phương thức thanh toán */}
                </div>
            </div>
        </div>
    )
}