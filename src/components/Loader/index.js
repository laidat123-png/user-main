import './index.css'; // Import file CSS cho component

// Định nghĩa component Loader
export const Loader = () => {
    return (
        <div className="loader"> {/* Tạo một div với lớp CSS "loader" */}
            <div className="loader-center"> {/* Tạo một div với lớp CSS "loader-center" để căn giữa loader */}
                <span className="spinner-border text-dark" role="status"> {/* Tạo một span với lớp CSS "spinner-border text-dark" để hiển thị biểu tượng loading */}
                </span>
            </div>
        </div>
    )
}