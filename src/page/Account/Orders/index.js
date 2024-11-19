import { FiSearch } from 'react-icons/fi'; // Import biểu tượng tìm kiếm từ react-icons
import { formatNumber } from '../../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số
import { ListOrders } from './ListOrders'; // Import component ListOrders
import { useForm } from 'react-hook-form'; // Import useForm từ react-hook-form để quản lý form
import { useState } from 'react'; // Import useState từ react để sử dụng state

// Định nghĩa component Orders
export const Orders = (props) => {
    const {
        listOrder, // Danh sách đơn hàng
        setStatusOrder, // Hàm thiết lập trạng thái đơn hàng
        showStatus, // Hàm hiển thị trạng thái đơn hàng
        orderTotal, // Tổng số đơn hàng theo trạng thái
        setOrderDetail, // Hàm thiết lập chi tiết đơn hàng
        setActive, // Hàm thiết lập trạng thái active
        handleDeleteOrderRequest, // Hàm xử lý xóa đơn hàng
        handleSearchOrderByID // Hàm xử lý tìm kiếm đơn hàng theo ID
    } = props;
    const [activeLi, setActiveLi] = useState(-1); // Khởi tạo state activeLi với giá trị mặc định là -1
    const { register, handleSubmit } = useForm(); // Sử dụng useForm để quản lý form

    // Hàm thay đổi trạng thái đơn hàng
    const handleChangeSatusOrder = (num) => {
        setStatusOrder(num); // Thiết lập trạng thái đơn hàng
        setActiveLi(num); // Thiết lập trạng thái active cho li
    }

    return (
        <div className="order">
            <div className="show-listOrder">
                <div className="status-bar">
                    <ul>
                        <li className={activeLi === -1 ? "active" : ""} onClick={() => handleChangeSatusOrder(-1)}>Tất cả {orderTotal[0] > 0 ? `(${orderTotal[0]})` : ""}</li> {/* Hiển thị tất cả đơn hàng */}
                        <li className={activeLi === 0 ? "active" : ""} onClick={() => handleChangeSatusOrder(0)}>Chờ xác nhận {orderTotal[1] > 0 ? `(${orderTotal[1]})` : ""}</li> {/* Hiển thị đơn hàng chờ xác nhận */}
                        <li className={activeLi === 1 ? "active" : ""} onClick={() => handleChangeSatusOrder(1)} >Đã xác nhận {orderTotal[2] > 0 ? `(${orderTotal[2]})` : ""}</li> {/* Hiển thị đơn hàng đã xác nhận */}
                        <li className={activeLi === 2 ? "active" : ""} onClick={() => handleChangeSatusOrder(2)} >Đang giao hàng {orderTotal[3] > 0 ? `(${orderTotal[3]})` : ""}</li> {/* Hiển thị đơn hàng đang giao */}
                        <li className={activeLi === 3 ? "active" : ""} onClick={() => handleChangeSatusOrder(3)} >Đã giao {orderTotal[4] > 0 ? `(${orderTotal[4]})` : ""}</li> {/* Hiển thị đơn hàng đã giao */}
                    </ul>
                </div>
                <form className="search-bar_order" onSubmit={handleSubmit(handleSearchOrderByID)}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn hàng theo ID"
                        {...register("searchOrderByID")} // Đăng ký input với react-hook-form
                    />
                    <FiSearch
                        className="search-bar_icon"
                    />
                </form>
                <div className="show-order">
                    <ListOrders
                        listOrder={listOrder} // Truyền danh sách đơn hàng vào component ListOrders
                        formatNumber={formatNumber} // Truyền hàm formatNumber vào component ListOrders
                        showStatus={showStatus} // Truyền hàm showStatus vào component ListOrders
                        setOrderDetail={setOrderDetail} // Truyền hàm setOrderDetail vào component ListOrders
                        setActive={setActive} // Truyền hàm setActive vào component ListOrders
                        handleDeleteOrderRequest={handleDeleteOrderRequest} // Truyền hàm handleDeleteOrderRequest vào component ListOrders
                    />
                </div>
            </div>
        </div>
    )
}