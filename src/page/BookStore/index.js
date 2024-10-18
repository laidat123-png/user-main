import { Container, Row, Col } from "react-bootstrap";
import { Paginate } from '../../components/Paginate';
import { Card } from '../../components/Card';
import './index.css'
import { ImBooks } from 'react-icons/im';
import { HiEmojiSad } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductByPageRequest, filterProductByPrice } from "../../actions/actionProducts";
import { Loader } from '../../components/Loader';
import { BoxProduct } from '../../components/BoxProduct';
import { BoxCt } from '../../components/BoxCt';
import { FilterPrice } from "./FilterPrice";
import { useHistory } from "react-router-dom";
export const BookStore = () => {
    const history = useHistory();
    const isLoading = useSelector(state => state.loading.loadingbs);
    const dispatch = useDispatch();
    const isProductNotFound = useSelector(state => state.products.productNotFound);
    const products = useSelector(state => state.products.productByPage);
    const types = useSelector(state => state.products.typeProduct);
    const productTopRate = useSelector(state => state.products.productTopRate);
    const productBox = useSelector(state => state.products.productBox);
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 6
    });
    const isEmptyObject = (obj) => {
        if (!obj) obj = {};
        return Object.keys(obj).length === 0;
    }
    const totalPage = useSelector(state => state.products.totalPage);
    useEffect(() => {
        window.scrollTo({
            top: 300,
            behavior: "smooth",
        });
        if (isEmptyObject(history.location.state)) {
            fetchProductByPageRequest(dispatch, paginate);
        }
    }, [paginate])
    useEffect(() => {
        if (history.location.state && history.location.state.status) {
            let state = { ...history.location.state };
            delete state.status;
            history.replace({ ...history.location, state });
        }
    }, [history.location]);
    const onChangePaginate = (page) => {
        setPaginate({ ...paginate, page })
    }
    const onSubmitFilterPrice = (e, price) => {
        e.preventDefault();
        filterProductByPrice(dispatch, price);
    }
    return (
        <div className="book-store_wrap">
            {isLoading ? "" : <Loader />}
            <Container>
                <Row>
                    <Col lg={8} md={12} xs={12} xl={9}>
                        <Row>
                            {products.map(product => {
                                return (
                                    <Col
                                        xl={4}
                                        lg={6}
                                        md={6}
                                        key={product._id} >
                                        <Card product={product} />
                                    </Col>
                                )
                            })}
                            {isProductNotFound && (
                                <div className="not-found_product">
                                    <ImBooks
                                        fontSize="6rem"
                                        color="black"
                                    />
                                    <p>Không tìm thấy sách bạn cần tìm  <HiEmojiSad fontSize="1.5rem" /></p>
                                </div>
                            )}
                        </Row>
                        {totalPage < 1 ? "" : <Paginate
                            onChangePaginate={onChangePaginate}
                            totalPage={totalPage}
                        />}
                    </Col>
                    <Col lg={4} md={12} xs={12} xl={3}>
                        <FilterPrice
                            onSubmitFilterPrice={onSubmitFilterPrice}
                            setPaginate={setPaginate}
                        />
                        <BoxProduct
                            products={productTopRate}
                            label="TOP SẢN PHẨM ĐÁNH GIÁ CAO"
                        />
                        <BoxCt
                            data={types}
                            label="THỂ LOẠI SÁCH"
                            length={types.length}
                        />
                        <BoxProduct
                            label="SẢN PHẨM"
                            products={productBox}
                        />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}