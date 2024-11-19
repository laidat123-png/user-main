import { BsPlus } from 'react-icons/bs'; // Import biểu tượng dấu cộng từ react-icons
import { BiMinus } from 'react-icons/bi'; // Import biểu tượng dấu trừ từ react-icons
import { formatNumber } from '../../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang
import { useEffect, useState } from 'react'; // Import useEffect và useState từ react
import { useDispatch } from 'react-redux'; // Import useDispatch từ react-redux
import { toast } from 'react-toastify'; // Import thư viện toast để hiển thị thông báo
import { toastConfig } from '../../../constants/configToast'; // Import cấu hình toast

// Định nghĩa component CartItem
export const CartItem = (props) => {
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const { cart, deleteProductInCartRequest, handleAddAmountProduct } = props; // Lấy các props truyền vào component
    const [amount, setAmount] = useState(0); // Khởi tạo state amount

    useEffect(() => {
        setAmount(cart.quantity); // Thiết lập số lượng sản phẩm khi component được render
    }, [cart]);

    // Hàm xử lý tăng số lượng sản phẩm
    const handleAddAmount = () => {
        if (amount < cart.product.inStock) {
            setAmount(amount + 1); // Tăng số lượng sản phẩm
            handleAddAmountProduct(cart.product, amount + 1); // Gọi hàm handleAddAmountProduct
        } else {
            toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", toastConfig); // Hiển thị thông báo nếu số lượng vượt quá hàng tồn
        }
    };

    // Hàm xử lý giảm số lượng sản phẩm
    const handleMinusAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1); // Giảm số lượng sản phẩm
            handleAddAmountProduct(cart.product, amount - 1); // Gọi hàm handleAddAmountProduct
        }
    };

    // Hàm xử lý thay đổi số lượng sản phẩm
    const handleChangeAmount = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= cart.product.inStock) {
            setAmount(value); // Thiết lập số lượng sản phẩm
            handleAddAmountProduct(cart.product, value); // Gọi hàm handleAddAmountProduct
        } else if (value > cart.product.inStock) {
            toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", toastConfig); // Hiển thị thông báo nếu số lượng vượt quá hàng tồn
        }
    };

    return (
        <li className="cart-item">
            <span className="cart-remove" onClick={() => deleteProductInCartRequest(dispatch, cart.product._id)}>
                <span></span>
                <span></span>
            </span>
            <div className="cart-thumnail">
                <img
                    src={cart?.product?.urls[0]?.url}
                    alt={cart.product?.title}
                />
            </div>
            <div className="cart-content">
                <Link className="cart-name" to={`/CHITIETSANPHAM/${cart?.product._id}`}>{cart?.product.title}</Link>
                <div className="cart-price">
                    {cart?.product.sale > 0 ? <p className="cart-price_sale">{formatNumber(cart?.product.price)}₫</p> : ""}
                    {cart?.product.sale > 0 ? <p className="cart-price_real">{formatNumber(cart?.product.price - (cart?.product.price * cart?.product.sale / 100))}₫</p> : <p className="cart-price_real">{formatNumber(cart?.product.price)}đ</p>}
                </div>
                <div className="cart-quantity">
                    <span className="cart-quantity_minus" onClick={handleMinusAmount}><BiMinus /></span>
                    <input value={amount} type="number" onChange={handleChangeAmount} />
                    <span className="cart-quantity_plus" onClick={handleAddAmount}><BsPlus /></span>
                </div>
                <span className="cart-subTotal">{formatNumber(cart?.quantity * (cart?.product.sale > 0 ? (cart?.product.price - (cart?.product.price * cart?.product.sale / 100)) : cart?.product.price))}₫</span>
                <span className="cart-subTotal-moblie">Tạm tính: {formatNumber(cart?.quantity * (cart?.product.sale > 0 ? (cart?.product.price - (cart?.product.price * cart?.product.sale / 100)) : cart?.product.price))}₫</span>
            </div>
        </li>
    );
};