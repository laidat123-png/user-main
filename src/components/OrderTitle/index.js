import { Container } from "react-bootstrap"; // Import component Container từ react-bootstrap
import { Link, useHistory } from "react-router-dom"; // Import Link và useHistory từ react-router-dom để điều hướng giữa các trang
import { BsArrowRight } from 'react-icons/bs'; // Import biểu tượng mũi tên phải từ react-icons
import "./index.css"; // Import file CSS cho component

// Định nghĩa component OrderTitle
export const OrderTitle = () => {
    const history = useHistory(); // Sử dụng useHistory để điều hướng giữa các trang

    // Hàm tìm chỉ số của ký tự "/" thứ hai trong đường dẫn
    const findIndexByString = () => {
        let status = false;
        let strLength = history.location.pathname.length; // Lấy độ dài của đường dẫn
        let str = history.location.pathname; // Lấy đường dẫn hiện tại
        for (let i = 0; i < strLength; i++) {
            if (status === true && str[i] === "/") {
                return i; // Trả về chỉ số của ký tự "/" thứ hai
            }
            if (str[i] === "/") {
                status = true; // Đánh dấu đã gặp ký tự "/"
                continue;
            }
        }
    }

    return (
        <div className="page-order_title">
            <Container>
                <div className="page-order_pc">
                    <Link className={`${history.location.pathname.slice(1, findIndexByString()) === "Cart" ? "active" : ""}`} to="/Cart">GIỎ HÀNG</Link> {/* Liên kết đến trang giỏ hàng, thêm lớp "active" nếu đường dẫn hiện tại là "Cart" */}
                    <span className="icon-mobile"><BsArrowRight color="white" fontSize="2rem" /></span> {/* Hiển thị biểu tượng mũi tên phải */}
                    <Link className={`${history.location.pathname.slice(1, findIndexByString()) === "Checkout" ? "active" : ""}`} to="/Checkout">CHECKOUT</Link> {/* Liên kết đến trang thanh toán, thêm lớp "active" nếu đường dẫn hiện tại là "Checkout" */}
                    <span className="icon-mobile"><BsArrowRight color="white" fontSize="2rem" /></span> {/* Hiển thị biểu tượng mũi tên phải */}
                    <span className={`sp ${history.location.pathname.slice(1, findIndexByString()) === "Order-received" ? "active" : ""}`}>ORDER COMPLETE</span> {/* Hiển thị trạng thái hoàn thành đơn hàng, thêm lớp "active" nếu đường dẫn hiện tại là "Order-received" */}
                </div>
            </Container>
        </div>
    )
}