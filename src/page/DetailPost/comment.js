import { useForm } from 'react-hook-form'; // Import useForm từ react-hook-form
import { Spinner } from '../../components/Spinner'; // Import component Spinner

// Định nghĩa component Comment
export const Comment = (props) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // Sử dụng useForm để quản lý form
    const { closeButton, closeCmt, onSubmitCmt, idCmt, loadingCmt } = props; // Lấy các props truyền vào component

    // Hàm xử lý khi submit form
    const onSubmit = (data) => {
        if (closeButton) {
            data.userID = sessionStorage.getItem("userID"); // Lấy userID từ sessionStorage
            onSubmitCmt(data, idCmt); // Gọi hàm onSubmitCmt với data và idCmt
        } else {
            onSubmitCmt(data); // Gọi hàm onSubmitCmt với data
        }
        setValue("content", ""); // Reset giá trị của trường content
    }

    return (
        <div className="reply-comment_box">
            <div className="reply-comment_title">
                <h2>Để lại bình luận của bạn</h2> {/* Hiển thị tiêu đề */}
                {closeButton ? <span onClick={closeCmt}>Hủy trả lời</span> : ""} {/* Hiển thị nút hủy trả lời nếu closeButton là true */}
            </div>
            <form className="reply-comment_form" onSubmit={handleSubmit(onSubmit)}> {/* Gọi hàm handleSubmit khi form được submit */}
                <label>Đăng nhập trước khi bình luận*</label>
                <textarea
                    cols="45" rows="5"
                    placeholder="Nội dung..."
                    {...register("content", { required: true })} // Đăng ký trường content với useForm và thiết lập yêu cầu bắt buộc
                />
                {errors.content && <span style={{ color: "red" }}>Vui lòng nhập nội dung</span>} {/* Hiển thị thông báo lỗi nếu có */}
                <br />
                <button type="submit" className="reply-comment_submit">{loadingCmt ? <Spinner /> : "GỬI BÌNH LUẬN"}</button> {/* Hiển thị nút gửi bình luận hoặc biểu tượng loading nếu đang loading */}
            </form>
        </div>
    )
}