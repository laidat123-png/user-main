import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang
import { searchProductByField } from "../../actions/actionProducts"; // Import hàm searchProductByField từ actionProducts để tìm kiếm sản phẩm
import { useDispatch } from 'react-redux'; // Import useDispatch từ react-redux để dispatch các action
import "./index.css"; // Import file CSS cho component

// Định nghĩa component BoxCt
export const BoxCt = (props) => {
    const { data, label, length, type } = props; // Lấy các props truyền vào component
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch

    // Hàm xử lý tìm kiếm sản phẩm theo loại
    const onSubmitSearchTypeProduct = (types) => {
        searchProductByField(dispatch, { types, title: "" }) // Gọi hàm searchProductByField với loại sản phẩm và tiêu đề rỗng
    }

    return (
        <div className="category-product">
            <p className="category-product__title">{label}</p> {/* Hiển thị tiêu đề của danh mục */}
            <ul className="category-product__list">
                {type === "post" ? data.map((d, i) => { // Nếu type là "post", hiển thị danh sách bài viết
                    if (i < length) { // Giới hạn số lượng bài viết hiển thị
                        return (
                            <li className="category-product__item ft" key={d._id}>
                                <Link to={`/CHITIETBAIVIET/${d._id}`}>{d.title}</Link> {/* Liên kết đến chi tiết bài viết */}
                            </li>
                        )
                    }
                    return null; // Nếu không thỏa điều kiện, không hiển thị gì
                }) :
                    data.map((d, i) => { // Nếu type không phải là "post", hiển thị danh sách sản phẩm
                        if (i < length) { // Giới hạn số lượng sản phẩm hiển thị
                            return (
                                <li className="category-product__item ft" key={d._id}>
                                    <Link onClick={() => onSubmitSearchTypeProduct(d._id)} to="/SANPHAM">{d.name}</Link> {/* Liên kết đến trang sản phẩm và gọi hàm tìm kiếm sản phẩm theo loại */}
                                </li>
                            )
                        }
                        return null; // Nếu không thỏa điều kiện, không hiển thị gì
                    })
                }
            </ul>
        </div>
    )
}