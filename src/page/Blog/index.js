import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Paginate } from '../../components/Paginate';
import { BoxCt } from "../../components/BoxCt";
import { Link } from "react-router-dom";
import { BoxProduct } from "../../components/BoxProduct";
import "./index.css";
import { createMarkup } from '../../helpers/createMarkup';
import { useSelector, useDispatch } from "react-redux";
import { getPostByPageRequest, onResetPosts } from "../../actions/actionPosts";
import { SkeletonPost } from "./SkeletonPost";

export const Blog = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.postAll) || [];
    let postsPage = useSelector(state => state.posts.postsPage) || [];
    const loadingdtb = useSelector(state => state.loading.loadingdtb);
    const totalPage = useSelector(state => state.posts.totalPage) || 0;
    const types = useSelector(state => state.products.typeProduct);
    const productTopRate = useSelector(state => state.products.productTopRate);
    const productSale = useSelector(state => state.products.productsSale);
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 4
    });
    const onChangePaginate = (page) => {
        setPaginate({ ...paginate, page });
    };
    useEffect(() => {
        getPostByPageRequest(dispatch, paginate);
        return () => {
            dispatch(onResetPosts());
        };
    }, [paginate]);

    return (
        <div className="blog-page">
            <Container>
                <Row>
                    <Col lg={8}>
                        {loadingdtb ? <SkeletonPost /> : ""}
                        {postsPage.map((post, index) => {
                            return (
                                <article className="blog-post" key={post._id}>
                                    {index === 0 ? <span className="blog-sticky">News</span> : ""}
                                    <div className="blog-post_header">
                                        <p className="blog-post_date">Ngày đăng: {new Date(post.createdAt).toLocaleDateString()}</p>
                                        <h2 className="blog-post_title">{post.title}</h2>
                                        <p className="blog-post_author">
                                            Đăng bởi {post.author ? `${post.author.firstName} ${post.author.lastName}` : "Người dùng đã bị xóa"}
                                        </p>
                                        <img className="blog-post_img" src={post.image} alt={post.title} />
                                    </div>
                                    <div className="blog-post_content">
                                        <div className="blog-post_description">
                                            <div dangerouslySetInnerHTML={createMarkup(post.content)}></div>
                                        </div>
                                        <Link to={`/CHITIETBAIVIET/${post._id}`}>Continue Reading →</Link>
                                    </div>
                                </article>
                            );
                        })}
                        {totalPage > 0 ? (
                            <Paginate
                                onChangePaginate={onChangePaginate}
                                totalPage={totalPage}
                            />
                        ) : (
                            ""
                        )}
                    </Col>
                    <Col lg={4}>
                        <BoxProduct
                            products={productTopRate}
                            label="TOP SẢN PHẨM ĐÁNH GIÁ CAO"
                        />
                        <BoxCt
                            data={posts}
                            label="BÀI VIẾT GẦN ĐÂY"
                            length={5}
                            type="post"
                        />
                        <BoxCt
                            data={types}
                            label="THỂ LOẠI SÁCH"
                            length={types.length}
                        />
                        <BoxProduct
                            label="SẢN PHẨM GIẢM GIÁ"
                            products={productSale}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};