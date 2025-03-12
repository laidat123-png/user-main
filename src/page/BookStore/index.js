import { Container, Row, Col } from "react-bootstrap"; // Import các component Container, Row, Col từ react-bootstrap
import { Paginate } from '../../components/Paginate'; // Import component Paginate để tạo phân trang
import { Card } from '../../components/Card'; // Import component Card
import './index.css'; // Import file CSS cho component
import { ImBooks } from 'react-icons/im'; // Import biểu tượng sách từ react-icons
import { HiEmojiSad } from 'react-icons/hi'; // Import biểu tượng mặt buồn từ react-icons
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch và useSelector từ react-redux
import { useEffect, useState } from "react"; // Import useEffect và useState từ react
import { fetchProductByPageRequest, filterProductByPrice } from "../../actions/actionProducts"; // Import các action liên quan đến sản phẩm
import { Loader } from '../../components/Loader'; // Import component Loader
import { BoxProduct } from '../../components/BoxProduct'; // Import component BoxProduct
import { BoxCt } from '../../components/BoxCt'; // Import component BoxCt
import { FilterPrice } from "./FilterPrice"; // Import component FilterPrice
import { useHistory } from "react-router-dom"; // Import useHistory từ react-router-dom
import BookIterator from './BookIterator'; // Import BookIterator

// Định nghĩa component BookStore
export const BookStore = () => {
    const history = useHistory(); // Sử dụng useHistory để điều hướng giữa các trang
    const isLoading = useSelector(state => state.loading.loadingbs); // Lấy trạng thái loading từ state
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const isProductNotFound = useSelector(state => state.products.productNotFound); // Lấy trạng thái không tìm thấy sản phẩm từ state
    const products = useSelector(state => state.products.productByPage); // Lấy danh sách sản phẩm theo trang từ state
    const types = useSelector(state => state.products.typeProduct); // Lấy danh sách thể loại sản phẩm từ state
    const productTopRate = useSelector(state => state.products.productTopRate); // Lấy danh sách sản phẩm đánh giá cao từ state
    const productBox = useSelector(state => state.products.productBox); // Lấy danh sách sản phẩm từ state
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 6
    }); // Khởi tạo state paginate để quản lý phân trang

    // Hàm kiểm tra đối tượng có rỗng không
    const isEmptyObject = (obj) => {
        if (!obj) obj = {};
        return Object.keys(obj).length === 0;
    }

    const totalPage = useSelector(state => state.products.totalPage); // Lấy tổng số trang từ state

    useEffect(() => {
        window.scrollTo({
            top: 300,
            behavior: "smooth",
        }); // Cuộn trang đến vị trí (300, 300) khi component được render
        if (isEmptyObject(history.location.state)) {
            fetchProductByPageRequest(dispatch, paginate); // Gọi action để lấy danh sách sản phẩm theo trang
        }
    }, [paginate]); // Chạy lại useEffect khi paginate thay đổi

    useEffect(() => {
        if (history.location.state && history.location.state.status) {
            let state = { ...history.location.state };
            delete state.status;
            history.replace({ ...history.location, state }); // Xóa trạng thái status khỏi history.location.state
        }
    }, [history.location]);

    // Hàm thay đổi trang
    const onChangePaginate = (page) => {
        setPaginate({ ...paginate, page });
    }

    // Hàm xử lý lọc sản phẩm theo giá
    const onSubmitFilterPrice = (e, price) => {
        e.preventDefault();
        filterProductByPrice(dispatch, price);
    }

    const bookIterator = new BookIterator(products); // Tạo instance của BookIterator

    return (
        <div className="book-store_wrap">
            {isLoading ? "" : <Loader />} {/* Hiển thị Loader nếu đang loading */}
            <Container>
                <Row>
                    <Col lg={8} md={12} xs={12} xl={9}>
                        <Row>
                            {(() => {
                                const items = [];
                                while (bookIterator.hasNext()) {
                                    const product = bookIterator.next();
                                    items.push(
                                        <Col
                                            xl={4}
                                            lg={6}
                                            md={6}
                                            key={product._id} >
                                            <Card product={product} /> {/* Hiển thị component Card cho từng sản phẩm */}
                                        </Col>
                                    );
                                }
                                return items;
                            })()}
                            {isProductNotFound && (
                                <div className="not-found_product">
                                    <ImBooks
                                        fontSize="6rem"
                                        color="black"
                                    />
                                    <p>Không tìm thấy sách bạn cần tìm  <HiEmojiSad fontSize="1.5rem" /></p> {/* Hiển thị thông báo không tìm thấy sản phẩm */}
                                </div>
                            )}
                        </Row>
                        {totalPage < 1 ? "" : <Paginate
                            onChangePaginate={onChangePaginate} // Truyền hàm onChangePaginate vào component Paginate
                            totalPage={totalPage} // Truyền tổng số trang vào component Paginate
                        />}
                    </Col>
                    <Col lg={4} md={12} xs={12} xl={3}>
                        <FilterPrice
                            onSubmitFilterPrice={onSubmitFilterPrice} // Truyền hàm onSubmitFilterPrice vào component FilterPrice
                            setPaginate={setPaginate} // Truyền hàm setPaginate vào component FilterPrice
                        />
                        <BoxProduct
                            products={productTopRate} // Truyền danh sách sản phẩm đánh giá cao vào component BoxProduct
                            label="TOP SẢN PHẨM ĐÁNH GIÁ CAO" // Truyền tiêu đề vào component BoxProduct
                        />
                        <BoxCt
                            data={types} // Truyền danh sách thể loại sản phẩm vào component BoxCt
                            label="THỂ LOẠI SÁCH" // Truyền tiêu đề vào component BoxCt
                            length={types.length} // Truyền số lượng thể loại hiển thị vào component BoxCt
                        />
                        <BoxProduct
                            label="SẢN PHẨM" // Truyền tiêu đề vào component BoxProduct
                            products={productBox} // Truyền danh sách sản phẩm vào component BoxProduct
                        />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}