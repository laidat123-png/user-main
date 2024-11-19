import { useEffect, useState } from "react"; // Import useEffect và useState từ react
import { Container, Row, Col } from "react-bootstrap"; // Import các component Container, Row, Col từ react-bootstrap
import { Paginate } from '../../components/Paginate'; // Import component Paginate để tạo phân trang
import { BoxCt } from "../../components/BoxCt"; // Import component BoxCt
import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang
import { BoxProduct } from "../../components/BoxProduct"; // Import component BoxProduct
import "./index.css"; // Import file CSS cho component
import { createMarkup } from '../../helpers/createMarkup'; // Import hàm createMarkup để tạo nội dung HTML an toàn
import { useSelector, useDispatch } from "react-redux"; // Import useSelector và useDispatch từ react-redux
import { getPostByPageRequest, onResetPosts } from "../../actions/actionPosts"; // Import các action liên quan đến bài viết
import { SkeletonPost } from "./SkeletonPost"; // Import component SkeletonPost để hiển thị khi đang tải bài viết

// Định nghĩa component Blog
export const Blog = () => {
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const posts = useSelector(state => state.posts.postAll) || []; // Lấy danh sách tất cả bài viết từ state
    let postsPage = useSelector(state => state.posts.postsPage) || []; // Lấy danh sách bài viết theo trang từ state
    const loadingdtb = useSelector(state => state.loading.loadingdtb); // Lấy trạng thái loading từ state
    const totalPage = useSelector(state => state.posts.totalPage) || 0; // Lấy tổng số trang từ state
    const types = useSelector(state => state.products.typeProduct); // Lấy danh sách thể loại sản phẩm từ state
    const productTopRate = useSelector(state => state.products.productTopRate); // Lấy danh sách sản phẩm đánh giá cao từ state
    const productSale = useSelector(state => state.products.productsSale); // Lấy danh sách sản phẩm giảm giá từ state
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 4
    }); // Khởi tạo state paginate để quản lý phân trang
    const onChangePaginate = (page) => {
        setPaginate({ ...paginate, page }); // Cập nhật state paginate khi thay đổi trang
    };
    useEffect(() => {
        getPostByPageRequest(dispatch, paginate); // Gọi action để lấy danh sách bài viết theo trang
        return () => {
            dispatch(onResetPosts()); // Reset danh sách bài viết khi component bị unmount
        };
    }, [paginate]); // Chạy lại useEffect khi paginate thay đổi

    return (
        <div className="blog-page">
            <Container>
                <Row>
                    <Col lg={8}>
                        {loadingdtb ? <SkeletonPost /> : ""} {/* Hiển thị SkeletonPost nếu đang loading */}
                        {postsPage.map((post, index) => {
                            return (
                                <article className="blog-post" key={post._id}>
                                    {index === 0 ? <span className="blog-sticky">News</span> : ""} {/* Hiển thị nhãn "News" cho bài viết đầu tiên */}
                                    <div className="blog-post_header">
                                        <p className="blog-post_date">Ngày đăng: {new Date(post.createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết */}
                                        <h2 className="blog-post_title">{post.title}</h2> {/* Hiển thị tiêu đề bài viết */}
                                        <p className="blog-post_author">
                                            Đăng bởi {post.author ? `${post.author.firstName} ${post.author.lastName}` : "Người dùng đã bị xóa"} {/* Hiển thị tên tác giả bài viết */}
                                        </p>
                                        <img className="blog-post_img" src={post.image} alt={post.title} /> {/* Hiển thị hình ảnh bài viết */}
                                    </div>
                                    <div className="blog-post_content">
                                        <div className="blog-post_description">
                                            <div dangerouslySetInnerHTML={createMarkup(post.content)}></div> {/* Hiển thị nội dung bài viết */}
                                        </div>
                                        <Link to={`/CHITIETBAIVIET/${post._id}`}>Continue Reading →</Link> {/* Liên kết đến chi tiết bài viết */}
                                    </div>
                                </article>
                            );
                        })}
                        {totalPage > 0 ? (
                            <Paginate
                                onChangePaginate={onChangePaginate} // Truyền hàm onChangePaginate vào component Paginate
                                totalPage={totalPage} // Truyền tổng số trang vào component Paginate
                            />
                        ) : (
                            ""
                        )}
                    </Col>
                    <Col lg={4}>
                        <BoxProduct
                            products={productTopRate} // Truyền danh sách sản phẩm đánh giá cao vào component BoxProduct
                            label="TOP SẢN PHẨM ĐÁNH GIÁ CAO" // Truyền tiêu đề vào component BoxProduct
                        />
                        <BoxCt
                            data={posts} // Truyền danh sách bài viết vào component BoxCt
                            label="BÀI VIẾT GẦN ĐÂY" // Truyền tiêu đề vào component BoxCt
                            length={5} // Truyền số lượng bài viết hiển thị vào component BoxCt
                            type="post" // Truyền loại dữ liệu vào component BoxCt
                        />
                        <BoxCt
                            data={types} // Truyền danh sách thể loại sản phẩm vào component BoxCt
                            label="THỂ LOẠI SÁCH" // Truyền tiêu đề vào component BoxCt
                            length={types.length} // Truyền số lượng thể loại hiển thị vào component BoxCt
                        />
                        <BoxProduct
                            label="SẢN PHẨM GIẢM GIÁ" // Truyền tiêu đề vào component BoxProduct
                            products={productSale} // Truyền danh sách sản phẩm giảm giá vào component BoxProduct
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};