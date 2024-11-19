import './index.css'; // Import file CSS cho component
import { BsStarHalf } from 'react-icons/bs'; // Import biểu tượng ngôi sao từ react-icons
import { formatNumber } from '../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số
import { showStars } from '../../helpers/showStars'; // Import hàm showStars để hiển thị đánh giá sao
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang

// Định nghĩa component BoxProduct
export const BoxProduct = (props) => {
    const { products, label } = props; // Lấy các props truyền vào component
    return (
        <div className="box-product__wrap">
            <p className="box-product__title">{label}</p> {/* Hiển thị tiêu đề của danh mục sản phẩm */}
            <ul className="box-product_list">
                {products?.map((product, index) => { // Duyệt qua danh sách sản phẩm
                    if (index < 5) { // Giới hạn số lượng sản phẩm hiển thị (tối đa 5 sản phẩm)
                        return (
                            <li className="box-product_item" key={product._id}> {/* Hiển thị từng sản phẩm */}
                                <img src={product.urls[0].url} alt={product.title} /> {/* Hiển thị hình ảnh sản phẩm */}
                                <div className="box-product__content ft">
                                    <Link to={`/CHITIETSANPHAM/${product._id}`}>{product.title}</Link> {/* Liên kết đến chi tiết sản phẩm */}
                                    <p>
                                        {showStars(product.averagedStars, "#2F2B35", "white", "0.8rem")}{/* Hiển thị đánh giá sao */}
                                        {(product.averagedStars - Math.trunc(product.averagedStars) >= 0.5 ? <BsStarHalf color="#2F2B35" fontSize="0.8rem" /> : "")} {/* Hiển thị nửa sao nếu cần */}
                                    </p>
                                    <div className="box-product_sale">
                                        {product.sale > 0 ? <span>{formatNumber(product.price)}đ</span> : ""} {/* Hiển thị giá gốc nếu có giảm giá */}
                                        <p>{product.sale > 0 ? formatNumber(Math.ceil(product.price - (product.price * product.sale / 100))) : formatNumber(product.price)}đ</p> {/* Hiển thị giá sau khi giảm */}
                                    </div>
                                </div>
                            </li>
                        )
                    } else return null; // Nếu không thỏa điều kiện, không hiển thị gì
                })}
            </ul>
        </div>
    )
}