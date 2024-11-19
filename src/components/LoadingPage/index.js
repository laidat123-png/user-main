import "./index.css"; // Import file CSS cho component

// Định nghĩa component LoadingPage
export const LoadingPage = () => {
    return (
        <div className="wrapper-loading"> {/* Tạo một div với lớp CSS "wrapper-loading" */}
            <div className="loader-page book"> {/* Tạo một div với lớp CSS "loader-page book" để hiển thị biểu tượng loading dạng sách */}
                <figure className="page"></figure> {/* Tạo một thẻ figure với lớp CSS "page" để hiển thị trang sách */}
                <figure className="page"></figure> 
                <figure className="page"></figure> 
            </div>
            <h1>Chờ một chút</h1> {/* Hiển thị thông báo "Chờ một chút" */}
        </div>
    )
}