
import { FaReceipt, FaCheckSquare, FaShippingFast, FaRegStar } from 'react-icons/fa';
import { AiOutlineLeft } from 'react-icons/ai';
import { formatNumber } from '../../../helpers/formatNumber';
import { useEffect } from 'react';

export const OrderDetail = (props) => {
    const { orderDetail, showStatus, showStatusStep, setActive } = props;
    useEffect(() => {
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        });
    }, [orderDetail])
    return (
        <div className="order-detail_wrap">
            <div className="order-header">
                <button className="order-header-btn" onClick={() => setActive({ profile: false, orders: true, orderDetail: false })} >
                    <AiOutlineLeft />
                    Trở lại
                </button>
                <div className="order-id-status">
                    <span>ID Đơn hàng : {orderDetail._id}</span>
                    <span>{showStatus(orderDetail.status)}</span>
                </div>
            </div>
            <div className="stepper">
                <div className={`stepper__step ${orderDetail.status >= 0 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaReceipt />
                    </div>
                    <div className="stepper__step-text">
                        Chờ xác nhận
                    </div>
                </div>
                <div className={`stepper__step ${orderDetail.status >= 1 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaCheckSquare />
                    </div>
                    <div className="stepper__step-text">
                        Đã xác nhận
                    </div>
                </div>
                <div className={`stepper__step ${orderDetail.status >= 2 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaShippingFast />
                    </div>
                    <div className="stepper__step-text">
                        Đang giao hàng
                    </div>
                </div>
                <div className={`stepper__step ${orderDetail.status >= 3 ? "stepper__step--finish" : ""}`}>
                    <div className="stepper__step-icon">
                        <FaRegStar />
                    </div>
                    <div className="stepper__step-text">
                        Đã giao xong
                    </div>
                </div>
                <div className="stepper__line">
                    <div className="stepper__line-background"></div>
                    <div style={{ width: `${showStatusStep(orderDetail.status)}` }} className="stepper__line-foreground"></div>
                </div>
            </div>
            <div className="order-body">
                <div className="order-body_receiver">
                    <h3>Thông tin người nhận</h3>
                    <p>{orderDetail.name}</p>
                    <p>(+84) {orderDetail.phone.slice(1)}</p>
                    <p>{orderDetail.address}</p>
                    <p>Ghi chú : {orderDetail?.note || "Không có"}</p>
                </div>
                <div className="show-order">
                    {orderDetail.productDetail.map(product => {
                        return (
                            <div className="order-detail" key={product.productID._id}>
                                <img style={{ width: "70px", height: "70px" }} src={product.productID.urls[0].url} alt={product.productID.title} />
                                <div className="order-title">
                                    <p>{product.productID.title}</p>
                                    <div className="order-title_d">
                                        <p>Thể loại: {product.productID.types.name}</p>
                                        <p>{formatNumber(product.productID.sale > 0 ? product.productID.price - (product.productID.price * product.productID.sale / 100) : product?.productID.price)}₫</p>
                                    </div>
                                    <p>x{product.quantity}</p>
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
                    }, 0))}₫</p>
                </div>
                <div className="order-footer_row">
                    <p>Phí vận chuyển</p>
                    <p>30.000₫</p>
                </div>
                <div className="order-footer_row">
                    <p>Mã giảm giá</p>
                    <p>{orderDetail?.saleCode?.code || "Không"}</p>
                </div>
                <div className="order-footer_row">
                    <p>Giảm giá</p>
                    <p>-{orderDetail.saleCode ? formatNumber(orderDetail?.saleCode?.discount) : "" || "0"}{orderDetail?.saleCode?.type}</p>
                </div>
                <div className="order-footer_row">
                    <p>Tổng cộng</p>
                    <p>{formatNumber(orderDetail.total)}₫</p>
                </div>
                <div className="order-footer_row">
                    <p>Phương thức thanh toán</p>
                    <p>{orderDetail.pay==='cod'?'Trả tiền mặt':orderDetail.pay==='vnpay'?'Chuyển khoản vnpay':'Trả tiền mặt'}</p>
                </div>
            </div>
        </div>
    )
}