import StarRatings from 'react-star-ratings'; // Import component StarRatings để hiển thị và chọn số sao đánh giá
import { useState } from 'react'; // Import useState từ react
import { useForm } from 'react-hook-form'; // Import useForm từ react-hook-form
import { toast } from 'react-toastify'; // Import thư viện toast để hiển thị thông báo
import { Spinner } from '../../../components/Spinner'; // Import component Spinner để hiển thị biểu tượng loading

// Định nghĩa component Form
export const Form = (props) => {
    const { onSubmitReview, isLoadingCmt } = props; // Lấy các props truyền vào component
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // Sử dụng useForm để quản lý form
    const [rating, setRating] = useState(0); // Khởi tạo state rating để quản lý số sao đánh giá

    // Hàm xử lý khi thay đổi số sao đánh giá
    const onChangeRating = (newRating) => {
        setRating(newRating); // Thiết lập số sao đánh giá
    }

    // Hàm xử lý khi submit form review
    const onSubmitFormReview = (data) => {
        if (data.cookies) localStorage.setItem("userReview", JSON.stringify({ name: data.name, email: data.email })); // Lưu thông tin người dùng vào localStorage nếu có cookies
        delete data.cookies; // Xóa trường cookies khỏi data
        if (rating === 0) toast.error("Vui lòng chọn số sao!", { // Hiển thị thông báo lỗi nếu chưa chọn số sao
            position: "top-center",
            autoClose: 3000,
            closeButton: true
        })
        else {
            data.stars = rating; // Thiết lập số sao đánh giá
            data.date = Date.now(); // Thiết lập ngày đánh giá
            onSubmitReview(data); // Gọi hàm onSubmitReview với data
            setValue("content", ""); // Reset giá trị của trường content
            setRating(0); // Reset số sao đánh giá
        }
    }

    return (
        <div className="review-tab_form">
            <h2 className="reviews_title">Thêm review</h2> {/* Hiển thị tiêu đề */}
            <form className="reviews-form" onSubmit={handleSubmit(onSubmitFormReview)}> {/* Gọi hàm handleSubmit khi form được submit */}
                <p className="reviews-form_note">Bạn phải đăng nhập mới được thêm review *</p> {/* Hiển thị thông báo yêu cầu đăng nhập */}
                <div className="reviews-form_rating">
                    <label>Số sao đánh giá *</label>
                    <div className="stars">
                        <StarRatings
                            rating={rating} // Thiết lập số sao hiện tại
                            starRatedColor="black" // Thiết lập màu sao đã chọn
                            changeRating={onChangeRating} // Gọi hàm onChangeRating khi thay đổi số sao
                            numberOfStars={5} // Thiết lập số sao tối đa
                            starHoverColor="black" // Thiết lập màu sao khi hover
                            name='stars'
                            starDimension="1.5rem" // Thiết lập kích thước sao
                        />
                    </div>
                </div>
                <div className="reviews-form_text">
                    <label>Nội dung*</label>
                    <textarea
                        {...register("content", { required: true })} // Đăng ký trường content với useForm và thiết lập yêu cầu bắt buộc
                        cols={45}
                        row={10}
                    />
                </div>
                {errors.content && <span className="errors">Vui lòng nhập nội dung</span>} {/* Hiển thị thông báo lỗi nếu có */}
                <div className="reviews-form_submit">
                    <button type="submit">{isLoadingCmt ? <Spinner /> : "Gửi review"}</button> {/* Hiển thị nút gửi review hoặc biểu tượng loading nếu đang loading */}
                </div>
            </form>
        </div>
    )
}