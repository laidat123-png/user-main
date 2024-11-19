import './index.css'; // Import file CSS cho component
import { useHistory } from 'react-router'; // Import useHistory từ react-router để điều hướng giữa các trang
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang

// Định nghĩa component Title
export const Title = () => {
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
            };
        }
    }

    return (
        <div className="page-title">
            <h2>{history.location.pathname.slice(1, findIndexByString())}</h2> {/* Hiển thị tiêu đề trang dựa trên đường dẫn */}
            <div>
                <Link to="/">Home </Link> {/* Liên kết đến trang chủ */}
                /
                <span> {history.location.pathname.slice(1, findIndexByString())}</span> {/* Hiển thị đường dẫn hiện tại */}
            </div>
        </div>
    )
}