import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import { BsStarHalf, BsStarFill } from 'react-icons/bs';
import { Category } from '../../components/Category';
import { useDispatch, useSelector } from 'react-redux';
import { InnerImageZoom } from 'react-inner-image-zoom';
import { Link } from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import {
    getOneProductRequest,
    addReviewRequest,
    addProductToCartRequest,
    toggleCart,
    addCart,
    setSubTotalCart,
    getProductAlsoLike,
    searchProductByField
} from '../../actions/actionProducts.js';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/configToast';
import { createMarkup } from '../../helpers/createMarkup';
import { formatNumber } from '../../helpers/formatNumber';
import 'react-slideshow-image/dist/styles.css'
import './index.css';
import { useParams } from 'react-router-dom';
import { Form } from './Form';
import { showStars } from '../../helpers/showStars';
import { Spinner } from '../../components/Spinner';
import { SkeletonProduct } from './SkeletonProduct';

export const DetailProduct = () => {
    const listCart = useSelector(state => state.cart);
    const params = useParams();
    const isLoadingCmt = useSelector(state => state.loading.loadingcmt);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(false);
    const product = useSelector(state => state.products.product);
    const listProductRelated = useSelector(state => state.products.productRelated) || [];
    const listProductAlsoLike = useSelector(state => state.products.productAlsoLike) || [];
    const [quantity, setQuantity] = useState(1);
    const review = useSelector(state => state.review) || [];
    const loading = useSelector(state => state.loading.loadingdt);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const user = useSelector(state => state.user);
    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <img key={product.urls ? product.urls[i]._id : i + 1} className="slide-image_active" src={product.urls ? product.urls[i].url : ""} alt={product.title} />
    };
    useEffect(() => {
        getOneProductRequest(dispatch, params.id);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        return () => {
            dispatch(getProductAlsoLike(false));
        }
    }, [params.id])
    const onSubmitReview = (data) => {
        if (user._id) {
            addReviewRequest(dispatch, data, product._id);
        } else {
            toast("Hãy đăng nhập để thêm review", toastConfig);
        }
    }
    const filterProductByType = (idType) => {
        searchProductByField(dispatch, { types: idType, title: "" })
    }
    const addProductToCart = () => {
        if (user._id) {
            setLoadingBtn(true);
            addProductToCartRequest(product, quantity)
                .then(data => {
                    if (data.status === "success") {
                        dispatch(addCart(product, quantity, data.idCart));
                        dispatch(toggleCart(true));
                        dispatch(setSubTotalCart(data.subTotal));
                        setLoadingBtn(false);
                        setQuantity(1);
                    } else {
                        toast.success("Thêm vào giỏ hàng thất bại !", toastConfig)
                        setLoadingBtn(false);
                    }
                })
                .catch(err => {
                    setLoadingBtn(false);
                })
        } else {
            toast("Hãy đăng nhập để thêm vào giỏ hàng", toastConfig);
        }
    }
    const checkProductInCart = () => {
        let index = -1;
        listCart.forEach((cart, i) => {
            if (cart.product._id === product._id) index = i;
        })
        return index > -1 ? true : false;
    }

    const handleChangeQuantity = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= product.inStock) {
            setQuantity(value);
        } else if (value > product.inStock) {
            toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", toastConfig);
        }
    };

    return (
        <div>
            {loading ? <section className="detail-wrap">
                <Container className="bg-c">
                    <div className="border-bottom-dotted">
                        <Row>
                            <Col lg={5}>
                                <div className="slide-image">
                                    <div className="slide-container">
                                        <Slide {...properties}>
                                            {product.urls ? product.urls.map((each) => (
                                                <div key={each._id} className="each-slide">
                                                    <InnerImageZoom
                                                        className="lazy"
                                                        hideHint={true}
                                                        src={each.url}
                                                        zoomType="hover"
                                                        alt={product.title}
                                                    />
                                                </div>
                                            )) : ""}
                                        </Slide>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <div className="product-content">
                                    <h2 className="product-title">{product.title}</h2>
                                    <div className="product-rating">
                                        <div className="product-rating__star">
                                            {showStars(product.averagedStars, "#2F2B35", "1.1rem")}{(product.averagedStars - Math.trunc(product.averagedStars) >= 0.5 ? <BsStarHalf fontSize="1.1rem" color="#2F2B35" /> : "")}
                                        </div>
                                        <span className="product-rating__customer">({review?.length} người reviews)</span>
                                    </div>
                                    <div className="product-desscription__short">
                                        <div className="content" dangerouslySetInnerHTML={createMarkup(product.description)}></div>
                                    </div>
                                    <div className="product-offer-box">
                                        <div className="product-offer__price">
                                            {product.sale > 0 ? <span>{formatNumber(product.price)}₫</span> : ""}
                                            <p>{product.sale > 0 ? formatNumber(Math.ceil(product.price - (product.price * product.sale / 100))) : formatNumber(product.price)}₫</p>
                                        </div>
                                        <div className="product-quantity">
                                            <input className="product-amount" type="number" value={quantity} onChange={handleChangeQuantity} />
                                            {checkProductInCart() === false ? <button className="product-btn"
                                                onClick={addProductToCart}
                                            >{loadingBtn ? <Spinner /> : "Thêm vào giỏ hàng"}</button> : <button className="product-btn" onClick={() => dispatch(toggleCart(true))}>Xem giỏ hàng</button>}
                                        </div>
                                    </div>
                                    <div className="product-type">
                                        <span>Loại sách: </span>
                                        <Link to="/SANPHAM" onClick={() => filterProductByType(product?.types._id)}>{product?.types?.name}</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="border-bottom-dotted">
                        <Row>
                            <div className="product-details">
                                <div className="product-details_title">Chi tiết sách</div>
                                <div className="product-details_box">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Số trang</th>
                                                <td>
                                                    {product?.pages} trang
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Tác giả</th>
                                                <td>
                                                    {product?.author}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Nhà xuất bản</th>
                                                <td>
                                                    {product.publicCompany?.name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Năm xuất bản</th>
                                                <td>
                                                    {product?.publicYear}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Số lượng tồn</th>
                                                <td>
                                                    {product?.inStock}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Row>
                    </div>
                    <div className="border-bottom-dotted">
                        <Row>
                            <div className="product-tab">
                                <ul>
                                    <li className={`${!activeTab ? "active" : ""}`} onClick={() => setActiveTab(false)}>Mô tả</li>
                                    <li className={`${activeTab ? "active" : ""}`} onClick={() => setActiveTab(true)} >Reviews ({review?.length})</li>
                                </ul>
                            </div>
                        </Row>
                    </div>
                    <div className="border-bottom-dotted">
                        <Row>
                            <div className={`description-tab ${!activeTab ? "active" : ""}`}>
                                <div className="content" dangerouslySetInnerHTML={createMarkup(product?.description)}></div>
                            </div>
                        </Row>
                        <Row>
                            <div className={`reviews-tab ${activeTab ? "active" : ""}`}>
                                <p className="review-tab_title">{review?.length} reviews với "{product?.title}"</p>
                                <ul className="review-tab_commentList">
                                    {review.map((rv, index) => {
                                        return (
                                            <li className="review-tab_commentItem" key={rv?._id}>
                                                <img className="commentItem-avartar" alt="Ảnh đại diện" src={rv.userID?.image || '/default-avatar.png'} />
                                                <div className="commentItem-text">
                                                    <div className="commentItem-meta-star">
                                                        <p className="commentItem-meta">
                                                            <strong className="commentItem-author">{`${rv.userID?.firstName || 'Tài khoản đã bị xóa'} ${rv.userID?.lastName || ''}`}</strong>
                                                            <span>-</span>
                                                            <time dateTime="2013-06-07T12:14:53+00:00">{new Date(rv.date).toLocaleDateString()}</time>
                                                        </p>
                                                        <div className="comment-star">
                                                            {[...Array(5)].map((s, i) => {
                                                                let ratingValue = i + 1;
                                                                return <BsStarFill
                                                                    key={i + 5}
                                                                    fontSize="0.9rem"
                                                                    color={
                                                                        ratingValue <= rv.stars ? "black" : "#828282"
                                                                    }
                                                                />
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="commentItem-description">
                                                        <p>{rv.content}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <Form
                                    isLoadingCmt={isLoadingCmt}
                                    onSubmitReview={onSubmitReview}
                                />
                            </div>
                        </Row>
                    </div>
                </Container>
                <Category
                    label="You may also like…"
                    mt={true}
                    bgC={true}
                    products={listProductAlsoLike}
                />
                <Category
                    label="Related products"
                    mt={true}
                    products={listProductRelated}
                />
            </section>
                : <SkeletonProduct />}
        </div>
    )
}