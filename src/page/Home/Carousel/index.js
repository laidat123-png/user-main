import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import './index.css';

export const CarouselP = () => {
    return (
        <Carousel
            showThumbs={false}
            emulateTouch={true}
            showStatus={false}
            autoPlay={false}
        >
            <div>
                <img
                    className="carousel-img"
                    src="https://vietchiase.net/wp-content/uploads/2020/05/review-sach-hay-5-centimet-tren-giay.jpg"
                    alt="5 centimet trên giây"
                />
                <div className="carousel-content">
                    <p>Sách mới</p>
                    <h1>5 centimet trên giây</h1>
                    <Link to="/CHITIETSANPHAM/67192a27a73a0b79b0876a17">Chi tiết</Link>
                </div>
            </div>
            <div>
                <img
                    alt="3 Kinh Nghiệm Viết Sách Thành Công Sau 10 Năm Đúc Rút..."
                    className="carousel-img"
                    src="https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-03.jpg"
                />
                <div className="carousel-content">
                    <p>3 Kinh Nghiệm Viết Sách Thành Công Sau 10 Năm Đúc Rút...</p>
                    <h1>Bài viết mới nhất</h1>
                    <Link to="/CHITIETBAIVIET/671c6e9e7aff0e2750a3b65a">Chi tiết</Link>
                </div>
            </div>
            <div>
                <img
                    className="carousel-img"
                    src="https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/slider-02.jpg"
                    alt="Nghệ thuật tinh tế của việc đếch quan tâm | Mark Manson"
                />
                <div className="carousel-content">
                    <p>Nghệ thuật tinh tế của việc đếch quan tâm | Mark Manson</p>
                    <h1>Bài viết review</h1>
                    <Link to="/CHITIETBAIVIET/664ae33084730131c82cfe79">Chi tiết</Link>
                </div>
            </div>
        </Carousel>
    )
}
