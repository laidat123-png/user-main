import { useEffect, useState } from 'react'; // Import useEffect và useState từ react
import { Container, Row, Col } from 'react-bootstrap'; // Import các component Container, Row, Col từ react-bootstrap
import { Slide } from 'react-slideshow-image'; // Import component Slide từ react-slideshow-image
import { BsStarHalf, BsStarFill } from 'react-icons/bs'; // Import các biểu tượng từ react-icons
import { Category } from '../../components/Category'; // Import component Category
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch và useSelector từ react-redux
import { InnerImageZoom } from 'react-inner-image-zoom'; // Import component InnerImageZoom từ react-inner-image-zoom
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'; // Import file CSS của InnerImageZoom
import {
    getOneProductRequest,
    addReviewRequest,
    addProductToCartRequest,
    toggleCart,
    addCart,
    setSubTotalCart,
    getProductAlsoLike,
    searchProductByField
} from '../../actions/actionProducts.js'; // Import các action liên quan đến sản phẩm
import { toast } from 'react-toastify'; // Import thư viện toast để hiển thị thông báo
import { toastConfig } from '../../constants/configToast'; // Import cấu hình toast
import { createMarkup } from '../../helpers/createMarkup'; // Import hàm createMarkup để tạo nội dung HTML an toàn
import { formatNumber } from '../../helpers/formatNumber'; // Import hàm formatNumber để định dạng số
import 'react-slideshow-image/dist/styles.css'; // Import file CSS của react-slideshow-image
import './index.css'; // Import file CSS cho component
import { useParams } from 'react-router-dom'; // Import useParams từ react-router-dom để lấy tham số từ URL
import { Form } from './Form'; // Import component Form
import { showStars } from '../../helpers/showStars'; // Import hàm showStars để hiển thị sao đánh giá
import { Spinner } from '../../components/Spinner'; // Import component Spinner để hiển thị biểu tượng loading
import { SkeletonProduct } from './SkeletonProduct'; // Import component SkeletonProduct để hiển thị khi đang tải sản phẩm

// Định nghĩa component DetailProduct
export const DetailProduct = () => {
    const listCart = useSelector(state => state.cart); // Lấy danh sách sản phẩm trong giỏ hàng từ state
    const params = useParams(); // Lấy tham số từ URL
    const isLoadingCmt = useSelector(state => state.loading.loadingcmt); // Lấy trạng thái loading của bình luận từ state
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const [activeTab, setActiveTab] = useState(false); // Khởi tạo state activeTab
    const product = useSelector(state => state.products.product); // Lấy thông tin sản phẩm từ state
    const listProductRelated = useSelector(state => state.products.productRelated) || []; // Lấy danh sách sản phẩm liên quan từ state
    const listProductAlsoLike = useSelector(state => state.products.productAlsoLike) || []; // Lấy danh sách sản phẩm tương tự từ state
    const [quantity, setQuantity] = useState(1); // Khởi tạo state quantity
    const review = useSelector(state => state.review) || []; // Lấy danh sách đánh giá từ state
    const loading = useSelector(state => state.loading.loadingdt); // Lấy trạng thái loading của sản phẩm từ state
    const [loadingBtn, setLoadingBtn] = useState(false); // Khởi tạo state loadingBtn
    const user = useSelector(state => state.user); // Lấy thông tin người dùng từ state
    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <img key={product.urls ? product.urls[i]._id : i + 1} className="slide-image_active" src={product.urls ? product.urls[i].url : ""} alt={product.title} />
    }; // Thiết lập các thuộc tính cho component Slide
    useEffect(() => {
        getOneProductRequest(dispatch, params.id); // Gọi action để lấy thông tin sản phẩm
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        }); // Cuộn trang lên đầu khi component được render
        return () => {
            dispatch(getProductAlsoLike(false)); // Reset danh sách sản phẩm tương tự khi component bị unmount
        }
    }, [params.id])
    const onSubmitReview = (data) => {
        if (user._id) {
            addReviewRequest(dispatch, data, product._id); // Gọi action để thêm đánh giá
        } else {
            toast("Hãy đăng nhập để thêm review", toastConfig); // Hiển thị thông báo yêu cầu đăng nhập
        }
    }
    const filterProductByType = (idType) => {
        searchProductByField(dispatch, { types: idType, title: "" }) // Gọi action để lọc sản phẩm theo loại
    }
    const addProductToCart = () => {
        if (user._id) {
            setLoadingBtn(true); // Thiết lập trạng thái loadingBtn
            addProductToCartRequest(product, quantity)
                .then(data => {
                    if (data.status === "success") {
                        dispatch(addCart(product, quantity, data.idCart)); // Dispatch action addCart
                        dispatch(toggleCart(true)); // Dispatch action toggleCart
                        dispatch(setSubTotalCart(data.subTotal)); // Dispatch action setSubTotalCart
                        setLoadingBtn(false); // Tắt trạng thái loadingBtn
                        setQuantity(1); // Thiết lập lại số lượng sản phẩm
                    } else {
                        toast.success("Thêm vào giỏ hàng thất bại !", toastConfig); // Hiển thị thông báo thất bại
                        setLoadingBtn(false); // Tắt trạng thái loadingBtn
                    }
                })
                .catch(err => {
                    setLoadingBtn(false); // Tắt trạng thái loadingBtn
                })
        } else {
            toast("Hãy đăng nhập để thêm vào giỏ hàng", toastConfig); // Hiển thị thông báo yêu cầu đăng nhập
        }
    }
    const checkProductInCart = () => {
        let index = -1;
        listCart.forEach((cart, i) => {
            if (cart.product._id === product._id) index = i;
        })
        return index > -1 ? true : false; // Kiểm tra xem sản phẩm có trong giỏ hàng không
    }

    const handleChangeQuantity = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= product.inStock) {
            setQuantity(value); // Thiết lập số lượng sản phẩm
        } else if (value > product.inStock) {
            toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", toastConfig); // Hiển thị thông báo nếu số lượng vượt quá hàng tồn
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