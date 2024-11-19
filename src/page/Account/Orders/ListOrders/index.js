// Định nghĩa component ListOrders
export const ListOrders = (props) => {
    const { listOrder, // Danh sách đơn hàng
        formatNumber, // Hàm định dạng số
        showStatus, // Hàm hiển thị trạng thái đơn hàng
        setOrderDetail, // Hàm thiết lập chi tiết đơn hàng
        setActive, // Hàm thiết lập trạng thái active
        handleDeleteOrderRequest } = props; // Hàm xử lý xóa đơn hàng

    // Hàm hiển thị chi tiết đơn hàng
    const handleShowOrderDetail = (order) => {
        setOrderDetail(order); // Thiết lập chi tiết đơn hàng
        setActive({ profile: false, orders: false, orderDetail: true }); // Thiết lập trạng thái active
    }

    return (
        <ul className={listOrder.length === 0 ? "bgW" : ""} > {/* Nếu danh sách đơn hàng trống, thêm lớp "bgW" */}
            {listOrder.length === 0 && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqi0CV31qQN4mugKP896IvQbXar1O34Nd0fhneN3YPih37t2b9wnCKYB_7FKTgjI0fAZc&usqp=CAU" alt="Không tìm thấy" className="order-empty" />} {/* Hiển thị hình ảnh "Không tìm thấy" nếu danh sách đơn hàng trống */}
            {listOrder?.map(order => { // Duyệt qua danh sách đơn hàng
                return (
                    <li key={order._id}>
                        <div className="order-status">
                            <p>ID Đơn hàng : {order._id}</p> {/* Hiển thị ID đơn hàng */}
                            <p>{showStatus(order.status)}</p> {/* Hiển thị trạng thái đơn hàng */}
                        </div>
                        {order?.productDetail.map(product => { // Duyệt qua danh sách sản phẩm trong đơn hàng
                            let price = product.productID.sale > 0 ? product.productID.price - (product.productID.price * product.productID.sale / 100) : product?.productID.price; // Tính giá sản phẩm sau khi giảm giá nếu có
                            return (
                                <div className="order-detail" key={product._id}>
                                    <img src={product?.productID.urls[0].url} alt={product?.productID.title} /> {/* Hiển thị hình ảnh sản phẩm */}
                                    <div className="order-title">
                                        <p>{product?.productID.title}</p> {/* Hiển thị tên sản phẩm */}
                                        <div className="order-title_d">
                                            <p>Thể loại: {product?.productID.types?.name}</p> {/* Hiển thị thể loại sản phẩm */}
                                            <p>{formatNumber(product.quantity * price)}₫</p> {/* Hiển thị giá sản phẩm */}
                                        </div>
                                        <p>x{product.quantity}</p> {/* Hiển thị số lượng sản phẩm */}
                                    </div>
                                </div>
                            )
                        })}
                        <p className="order-total">Tổng số tiền : {formatNumber(order.total)}đ</p> {/* Hiển thị tổng số tiền của đơn hàng */}
                        <div className="order-btn">
                            {order.status === 0 ? <button onClick={() => handleDeleteOrderRequest(order._id)}>Hủy Đơn Hàng</button> : ""} {/* Hiển thị nút "Hủy Đơn Hàng" nếu trạng thái đơn hàng là 0 */}
                            <button onClick={() => handleShowOrderDetail(order)}>Chi tiết</button> {/* Hiển thị nút "Chi tiết" */}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}