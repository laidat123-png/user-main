


export const ListOrders = (props) => {
    const { listOrder,
        formatNumber,
        showStatus,
        setOrderDetail,
        setActive,
        handleDeleteOrderRequest } = props;
    const handleShowOrderDetail = (order) => {
        setOrderDetail(order);
        setActive({ profile: false, orders: false, orderDetail: true });
    }
    return (
        <ul className={listOrder.length === 0 ? "bgW" : ""} >
            {listOrder.length === 0 && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqi0CV31qQN4mugKP896IvQbXar1O34Nd0fhneN3YPih37t2b9wnCKYB_7FKTgjI0fAZc&usqp=CAU" alt="Không tìm thấy" className="order-empty" />}
            {listOrder?.map(order => {
                return (
                    <li key={order._id}>
                        <div className="order-status">
                            <p>ID Đơn hàng : {order._id}</p>
                            <p>{showStatus(order.status)}</p>
                        </div>
                        {order?.productDetail.map(product => {
                            let price = product.productID.sale > 0 ? product.productID.price - (product.productID.price * product.productID.sale / 100) : product?.productID.price;
                            return (
                                <div className="order-detail" key={product._id}>
                                    <img src={product?.productID.urls[0].url} alt={product?.productID.title} />
                                    <div className="order-title">
                                        <p>{product?.productID.title}</p>
                                        <div className="order-title_d">
                                            <p>Thể loại: {product?.productID.types?.name}</p>
                                            <p>{formatNumber(product.quantity * price)}₫</p>
                                        </div>
                                        <p>x{product.quantity}</p>
                                    </div>
                                </div>

                            )
                        })}
                        <p className="order-total">Tổng số tiền : {formatNumber(order.total)}đ</p>
                        <div className="order-btn">
                            {order.status === 0 ? <button onClick={() => handleDeleteOrderRequest(order._id)}>Hủy Đơn Hàng</button> : ""}
                            <button onClick={() => handleShowOrderDetail(order)}>Chi tiết</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}