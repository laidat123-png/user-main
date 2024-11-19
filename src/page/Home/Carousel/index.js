import { Carousel } from 'react-responsive-carousel'; // Import component Carousel từ thư viện react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import file CSS của react-responsive-carousel
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang
import './index.css'; // Import file CSS cho component

// Định nghĩa component CarouselP
export const CarouselP = () => {
    return (
        <Carousel
            showThumbs={false} // Ẩn các hình ảnh thu nhỏ
            emulateTouch={true} // Cho phép vuốt để chuyển slide
            showStatus={false} // Ẩn trạng thái của carousel
            autoPlay={false} // Không tự động chuyển slide
        >
            <div>
                <img
                    className="carousel-img"
                    src="https://vietchiase.net/wp-content/uploads/2020/05/review-sach-hay-5-centimet-tren-giay.jpg"
                    alt="5 centimet trên giây"
                />
                <div className="carousel-content">
                    <p>Sách mới</p> {/* Hiển thị nhãn "Sách mới" */}
                    <h1>5 centimet trên giây</h1> {/* Hiển thị tiêu đề "5 centimet trên giây" */}
                    <Link to="/CHITIETSANPHAM/67192a27a73a0b79b0876a17">Chi tiết</Link> {/* Liên kết đến chi tiết sản phẩm */}
                </div>
            </div>
            <div>
                <img
                    alt="3 Kinh Nghiệm Viết Sách Thành Công Sau 10 Năm Đúc Rút..."
                    className="carousel-img"
                    src="https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-03.jpg"
                />
                <div className="carousel-content">
                    <p>3 Kinh Nghiệm Viết Sách Thành Công Sau 10 Năm Đúc Rút...</p> {/* Hiển thị nhãn "3 Kinh Nghiệm Viết Sách Thành Công Sau 10 Năm Đúc Rút..." */}
                    <h1>Bài viết mới nhất</h1> {/* Hiển thị tiêu đề "Bài viết mới nhất" */}
                    <Link to="/CHITIETBAIVIET/671c6e9e7aff0e2750a3b65a">Chi tiết</Link> {/* Liên kết đến chi tiết bài viết */}
                </div>
            </div>
            <div>
                <img
                    className="carousel-img"
                    src="https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-02.jpg"
                    alt="Nghệ thuật tinh tế của việc đếch quan tâm | Mark Manson"
                />
                <div className="carousel-content">
                    <p>Nghệ thuật tinh tế của việc đếch quan tâm | Mark Manson</p> {/* Hiển thị nhãn "Nghệ thuật tinh tế của việc đếch quan tâm | Mark Manson" */}
                    <h1>Bài viết review</h1> {/* Hiển thị tiêu đề "Bài viết review" */}
                    <Link to="/CHITIETBAIVIET/6734cf80befc70557cae9ce6">Chi tiết</Link> {/* Liên kết đến chi tiết bài viết */}
                </div>
            </div>
        </Carousel>
    )
}