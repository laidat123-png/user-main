import './index.css'; // Import file CSS cho component
import { FaPaperPlane } from 'react-icons/fa'; // Import biểu tượng máy bay giấy từ react-icons
import { MdShoppingCart } from 'react-icons/md'; // Import biểu tượng giỏ hàng từ react-icons
import { AiFillCheckCircle } from 'react-icons/ai'; // Import biểu tượng dấu kiểm từ react-icons
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang
import { formatNumber } from '../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch và useSelector từ react-redux để dispatch các action và lấy state từ store
import { addCart, addProductToCartRequest, setSubTotalCart, toggleCart } from '../../actions/actionProducts'; // Import các action liên quan đến giỏ hàng
import { toastConfig } from '../../constants/configToast'; // Import cấu hình toast
import { toast } from 'react-toastify'; // Import thư viện toast để hiển thị thông báo
import { useEffect, useState } from 'react'; // Import useEffect và useState từ react

// Định nghĩa component Card
export const Card = (props) => {
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const userID = useSelector(state => state.user._id); // Lấy userID từ state
    const carts = useSelector(state => state.cart); // Lấy giỏ hàng từ state
    const { product } = props; // Lấy product từ props
    const [loading, setLoading] = useState(false); // Khởi tạo state loading
    const [isExist, setIsExist] = useState(false); // Khởi tạo state isExist

    // Sử dụng useEffect để kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không
    useEffect(() => {
        if (checkExist(product._id, carts) === true) {
            setIsExist(true); // Nếu sản phẩm tồn tại trong giỏ hàng, thiết lập isExist là true
        } else {
            setIsExist(false); // Nếu sản phẩm không tồn tại trong giỏ hàng, thiết lập isExist là false
        }
    }, [loading, carts]); // Chạy lại useEffect khi loading hoặc carts thay đổi

    // Hàm thêm sản phẩm vào giỏ hàng
    const addProductToCart = () => {
        if (userID) { // Kiểm tra xem người dùng đã đăng nhập chưa
            setLoading(true); // Thiết lập loading là true
            addProductToCartRequest(product, 1) // Gọi hàm addProductToCartRequest để thêm sản phẩm vào giỏ hàng
                .then(data => {
                    if (data.status === "success") { // Kiểm tra trạng thái phản hồi
                        dispatch(addCart(product, 1, data.idCart)); // Thêm sản phẩm vào giỏ hàng trong store
                        dispatch(toggleCart(true)); // Bật giỏ hàng
                        dispatch(setSubTotalCart(data.subTotal)); // Cập nhật tổng tiền giỏ hàng
                    } else {
                        toast.success("Thêm vào giỏ hàng thất bại !", toastConfig); // Hiển thị thông báo lỗi
                    }
                    setLoading(false); // Thiết lập loading là false
                })
                .catch(err => {
                    toast.success("Thêm vào giỏ hàng thất bại !", toastConfig); // Hiển thị thông báo lỗi
                    setLoading(false); // Thiết lập loading là false
                })
        } else {
            toast("Hãy đăng nhập để thêm giỏ hàng", toastConfig); // Hiển thị thông báo yêu cầu đăng nhập
        }
    }

    // Hàm kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không
    const checkExist = (id, arr) => {
        let bool = false;
        arr.forEach(elm => {
            if (elm.product._id === id) {
                bool = true;
            }
        })
        return bool;
    }

    return (
        <div className="book-card">
            {product.sale > 0 ? <div className="book-card_onsale">Sale {product.sale}%</div> : ""} {/* Hiển thị nhãn giảm giá nếu có */}
            <Link to={`/CHITIETSANPHAM/${product._id}`} className="book-link">
                <div className="book-image_wrap">
                    <img
                        src={product.urls[0].url}
                        alt={product.title}
                    /> {/* Hiển thị hình ảnh sản phẩm */}
                </div>
                <div className="book-content_wrap">
                    <h2 className="book-title">{product.title}</h2> {/* Hiển thị tiêu đề sản phẩm */}
                    <p className="book-author">{product.author}</p> {/* Hiển thị tác giả sản phẩm */}
                    {product.sale > 0 ? <span className="book-price_sale">{formatNumber(product.price)}₫</span> : ""} {/* Hiển thị giá gốc nếu có giảm giá */}
                    {product.sale > 0 ? <span className="book-price">{formatNumber(product.price - (product.price * product.sale / 100))}₫</span> : <span className="book-price">{formatNumber(product.price)}₫</span>} {/* Hiển thị giá sau khi giảm */}
                </div>
            </Link>
            <div className="book-button">
                <Link to={`/CHITIETSANPHAM/${product._id}`}>
                    <FaPaperPlane
                        color="#909090"
                    />
                    Chi tiết
                </Link>
                {isExist === true ?
                    <span onClick={() => dispatch(toggleCart(true))}>Giỏ Hàng<AiFillCheckCircle color="#909090"
                        fontSize="0.9rem" />
                    </span> :
                    <span onClick={addProductToCart}>
                        {loading === true ? <span style={{ width: "1rem", height: "1rem" }} className="spinner-border text-dark" role="status" /> : <div><MdShoppingCart
                            color="#909090"
                            fontSize="0.9rem"
                        />
                            Mua</div>}
                    </span>}
            </div>
        </div>
    )
}