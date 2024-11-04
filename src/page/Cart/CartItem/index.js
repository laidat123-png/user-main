import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { formatNumber } from '../../../helpers/formatNumber';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../constants/configToast';

export const CartItem = (props) => {
    const dispatch = useDispatch();
    const { cart, deleteProductInCartRequest, handleAddAmountProduct } = props;
    const [amount, setAmount] = useState(0);
    
    useEffect(() => {
        setAmount(cart.quantity);
    }, [cart]);

    const handleAddAmount = () => {
        if (amount < cart.product.inStock) {
            setAmount(amount + 1);
            handleAddAmountProduct(cart.product, amount + 1);
        } else {
            toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", toastConfig);
        }
    };

    const handleMinusAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
            handleAddAmountProduct(cart.product, amount - 1);
        }
    };

    const handleChangeAmount = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= cart.product.inStock) {
            setAmount(value);
            handleAddAmountProduct(cart.product, value);
        } else if (value > cart.product.inStock) {
            toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", toastConfig);
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