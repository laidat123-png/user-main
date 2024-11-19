import "./index.css"; // Import file CSS cho component

// Định nghĩa component Spinner
export const Spinner = (props) => {
    const { bgC } = props; // Lấy prop bgC từ props
    return (
        <div className="spinner" style={{ backgroundColor: `${bgC ? bgC : "#2F2B35"}` }}> {/* Tạo một div với lớp CSS "spinner", thiết lập màu nền từ prop bgC hoặc mặc định là "#2F2B35" */}
            <div className="bounce1"></div> {/* Tạo một div với lớp CSS "bounce1" để hiển thị hiệu ứng bounce */}
            <div className="bounce2"></div>
            <div className="bounce3"></div> 
        </div>
    )
}