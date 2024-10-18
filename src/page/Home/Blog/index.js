
import './index.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createMarkup } from '../../../helpers/createMarkup';
export const Blog = (props) => {
    const { posts } = props;
    return (
        <section className="blog-wrap">
            <h2>From Our Blog</h2>
            <Container className="border-custom">
                <Row lg={4}>
                    {posts?.map((post, index) => {
                        if (index < 4) return (
                            <Col sm={6} xs={12} md={6} key={post._id}>
                                <div className="blog-card">
                                    <Link to={`/Detail-post/${post._id}`} className="blog-link">
                                        <img
                                            alt={post.title}
                                            src={post.image} />
                                        <p >{post.title}</p>
                                    </Link>
                                    <p className="blog-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    <div className="blog-description" dangerouslySetInnerHTML={createMarkup(post.content)}></div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Container>
                <img className="wbp" src="https://ahessblog.files.wordpress.com/2008/05/banner_oldbooks2.jpg" alt="Ảnh" />
            </Container>
        </section>

    )
}