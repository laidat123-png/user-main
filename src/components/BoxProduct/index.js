import './index.css';
import { BsStarHalf } from 'react-icons/bs';
import { formatNumber } from '../../helpers/formatNumber';
import { showStars } from '../../helpers/showStars';
import { Link } from 'react-router-dom';
export const BoxProduct = (props) => {
    const { products, label } = props;
    return (
        <div className="box-product__wrap">
            <p className="box-product__title">{label}</p>
            <ul className="box-product_list">
                {products?.map((product, index) => {
                    if (index < 5) {
                        return (
                            <li className="box-product_item" key={product._id}>
                                <img src={product.urls[0].url} alt={product.title} />
                                <div className="box-product__content ft">
                                    <Link to={`/CHITIETSANPHAM/${product._id}`}>{product.title}</Link>
                                    <p>
                                        {showStars(product.averagedStars, "#2F2B35", "white", "0.8rem")}{(product.averagedStars - Math.trunc(product.averagedStars) >= 0.5 ? <BsStarHalf color="#2F2B35" fontSize="0.8rem" /> : "")}
                                    </p>
                                    <div className="box-product_sale">
                                        {product.sale > 0 ? <span>{formatNumber(product.price)}đ</span> : ""}
                                        <p>{product.sale > 0 ? formatNumber(Math.ceil(product.price - (product.price * product.sale / 100))) : formatNumber(product.price)}đ</p>
                                    </div>
                                </div>
                            </li>
                        )
                    } else return;
                })}
            </ul>
        </div>

    )
}