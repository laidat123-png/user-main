
import './index.css';
import { FaPaperPlane } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../helpers/formatNumber';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addProductToCartRequest, setSubTotalCart, toggleCart } from '../../actions/actionProducts';
import { toastConfig } from '../../constants/configToast';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
export const Card = (props) => {
    const dispatch = useDispatch();
    const userID = useSelector(state => state.user._id);
    const carts = useSelector(state => state.cart);
    const { product } = props;
    const [loading, setLoading] = useState(false);
    const [isExist, setIsExist] = useState(false);
    useEffect(() => {
        if (checkExist(product._id, carts) === true) {
            setIsExist(true);
        } else {
            setIsExist(false);
        }
    }, [loading, carts]);
    const addProductToCart = () => {
        if (userID) {
            setLoading(true);
            addProductToCartRequest(product, 1)
                .then(data => {
                    if (data.status === "success") {
                        dispatch(addCart(product, 1, data.idCart));
                        dispatch(toggleCart(true));
                        dispatch(setSubTotalCart(data.subTotal));
                    } else {
                        toast.success("Thêm vào giỏ hàng thất bại !", toastConfig)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    toast.success("Thêm vào giỏ hàng thất bại !", toastConfig)
                    setLoading(false);
                })
        } else {
            toast("Hãy đăng nhập để thêm giỏ hàng", toastConfig);
        }
    }
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
            {product.sale > 0 ? <div className="book-card_onsale">Sale {product.sale}%</div> : ""}
            <Link to={`/CHITIETSANPHAM/${product._id}`} className="book-link">
                <div className="book-image_wrap">
                    <img
                        src={product.urls[0].url}
                        alt={product.title}
                    />
                </div>
                <div className="book-content_wrap">
                    <h2 className="book-title">{product.title}</h2>
                    <p className="book-author">{product.author}</p>
                    {product.sale > 0 ? <span className="book-price_sale">{formatNumber(product.price)}₫</span> : ""}
                    {product.sale > 0 ? <span className="book-price">{formatNumber(product.price - (product.price * product.sale / 100))}₫</span> : <span className="book-price">{formatNumber(product.price)}₫</span>}
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