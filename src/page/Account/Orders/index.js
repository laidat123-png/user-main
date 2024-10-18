import { FiSearch } from 'react-icons/fi';
import { formatNumber } from '../../../helpers/formatNumber';
import { ListOrders } from './ListOrders';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
export const Orders = (props) => {
    const {
        listOrder,
        setStatusOrder,
        showStatus,
        orderTotal,
        setOrderDetail,
        setActive,
        handleDeleteOrderRequest,
        handleSearchOrderByID
    } = props;
    const [activeLi, setActiveLi] = useState(-1);
    const { register, handleSubmit } = useForm();
    const handleChangeSatusOrder = (num) => {
        setStatusOrder(num);
        setActiveLi(num);
    }
    return (
        <div className="order">
            <div className="show-listOrder">
                <div className="status-bar">
                    <ul>
                        <li className={activeLi === -1 ? "active" : ""} onClick={() => handleChangeSatusOrder(-1)}>Tất cả {orderTotal[0] > 0 ? `(${orderTotal[0]})` : ""}</li>
                        <li className={activeLi === 0 ? "active" : ""} onClick={() => handleChangeSatusOrder(0)}>Chờ xác nhận {orderTotal[1] > 0 ? `(${orderTotal[1]})` : ""}</li>
                        <li className={activeLi === 1 ? "active" : ""} onClick={() => handleChangeSatusOrder(1)} >Đã xác nhận {orderTotal[2] > 0 ? `(${orderTotal[2]})` : ""}</li>
                        <li className={activeLi === 2 ? "active" : ""} onClick={() => handleChangeSatusOrder(2)} >Đang giao hàng {orderTotal[3] > 0 ? `(${orderTotal[3]})` : ""}</li>
                        <li className={activeLi === 3 ? "active" : ""} onClick={() => handleChangeSatusOrder(3)} >Đã giao {orderTotal[4] > 0 ? `(${orderTotal[4]})` : ""}</li>
                    </ul>
                </div>
                <form className="search-bar_order" onSubmit={handleSubmit(handleSearchOrderByID)}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn hàng theo ID"
                        {...register("searchOrderByID")}
                    />
                    <FiSearch
                        className="search-bar_icon"
                    />
                </form>
                <div className="show-order">
                    <ListOrders
                        listOrder={listOrder}
                        formatNumber={formatNumber}
                        showStatus={showStatus}
                        setOrderDetail={setOrderDetail}
                        setActive={setActive}
                        handleDeleteOrderRequest={handleDeleteOrderRequest}
                    />
                </div>
            </div>
        </div>
    )
}