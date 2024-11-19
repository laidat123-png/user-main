import './index.css'; // Import file CSS cho component
import { Container, Row, Col } from 'react-bootstrap'; // Import các component Container, Row, Col từ react-bootstrap
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom để điều hướng giữa các trang
import { createMarkup } from '../../../helpers/createMarkup'; // Import hàm createMarkup để tạo nội dung HTML an toàn

// Định nghĩa component Blog
export const Blog = (props) => {
    const { posts } = props; // Lấy danh sách bài viết từ props
    return (
        <section className="blog-wrap">
            <h2>Từ Bài Viết Của Chúng Tôi</h2> {/* Hiển thị tiêu đề */}
            <Container className="border-custom">
                <Row lg={4}>
                    {posts?.map((post, index) => {
                        if (index < 4) return (
                            <Col sm={6} xs={12} md={6} key={post._id}>
                                <div className="blog-card">
                                    <Link to={`/CHITIETBAIVIET/${post._id}`} className="blog-link">
                                        <img
                                            alt={post.title}
                                            src={post.image} /> {/* Hiển thị hình ảnh bài viết */}
                                        <p>{post.title}</p> {/* Hiển thị tiêu đề bài viết */}
                                    </Link>
                                    <p className="blog-date">{new Date(post.createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết */}
                                    <div className="blog-description" dangerouslySetInnerHTML={createMarkup(post.content)}></div> {/* Hiển thị nội dung bài viết */}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Container>
                <img className="wbp" src="https://ahessblog.files.wordpress.com/2008/05/banner_oldbooks2.jpg" alt="Ảnh" /> {/* Hiển thị hình ảnh banner */}
            </Container>
        </section>
    )
}