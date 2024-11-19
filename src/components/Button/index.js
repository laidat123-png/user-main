import './index.css'; // Import file CSS cho component

// Định nghĩa component Button
export const Button = (props) => {
    return (
        // Tạo một nút với lớp CSS "button" và thiết lập chiều rộng từ props hoặc mặc định là 100%
        <button className="button" style={{ width: `${props.width || "100%"}` }}>
            {props.label || ""} {/* Hiển thị nhãn của nút từ props hoặc mặc định là chuỗi rỗng */}
        </button>
    )
}