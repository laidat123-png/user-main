import ReactPaginate from 'react-paginate'; // Import component ReactPaginate để tạo phân trang
import './index.css'; // Import file CSS cho component
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'; // Import các biểu tượng mũi tên từ react-icons

// Định nghĩa component Paginate
export const Paginate = (props) => {
    const { totalPage, onChangePaginate } = props; // Lấy các props truyền vào component

    // Hàm xử lý khi thay đổi trang
    const onChangePage = (value) => {
        onChangePaginate(value.selected + 1); // Gọi hàm onChangePaginate với số trang mới
        window.scrollTo(400, 400); // Cuộn trang đến vị trí (400, 400)
    }

    return (
        <ReactPaginate
            containerClassName='container-pagination' // Thiết lập lớp CSS cho container của phân trang
            pageClassName='page-pagination' // Thiết lập lớp CSS cho từng trang
            activeClassName='active-pagination' // Thiết lập lớp CSS cho trang đang được chọn
            nextLabel={<AiFillRightCircle />} // Thiết lập biểu tượng cho nút trang tiếp theo
            previousLabel={<AiFillLeftCircle />} // Thiết lập biểu tượng cho nút trang trước
            previousClassName='control-pagination' // Thiết lập lớp CSS cho nút trang trước
            nextClassName='control-pagination' // Thiết lập lớp CSS cho nút trang tiếp theo
            pageCount={totalPage} // Thiết lập tổng số trang
            onPageChange={onChangePage} // Gọi hàm onChangePage khi thay đổi trang
        />
    )
}