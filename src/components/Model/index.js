import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../actions/actionProducts";
export const Model = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.active.activeCart);
    return (
        <div className={`model-wrap ${isOpen ? "active" : ""}`} onClick={() => dispatch(toggleCart(false))} ></div>
    )
}
//File này định nghĩa một component React có tên là Model. Component này hiển thị một lớp phủ (overlay) 
//khi giỏ hàng đang mở và cho phép người dùng đóng giỏ hàng bằng cách nhấp vào lớp phủ này. Nó sử dụng 
//react-redux để lấy state và dispatch các action