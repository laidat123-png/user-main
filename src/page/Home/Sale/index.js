
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css'

export const Sale = (props) => {
    const { products } = props;
    return (
        <section className="sale-wrap">
            <Container>
                <h2 className="sale-title">News Books</h2>
                <Row lg={4}>
                    {products?.map(product => {
                        return (
                            <Col md={6} xs={12} className="m-10" key={product._id}>
                                <div className="sale-card__wrap">
                                    <Link to={`/Detail-product/${product._id}`} className="sale-card__image">
                                        <img
                                            src={product.urls[0].url}
                                            alt={product.title}
                                        />
                                    </Link>
                                    <div className="sale-card__title">
                                        <p>{product.title}</p>
                                        <Link to={`/Detail-product/${product._id}`}>More</Link>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </section>

    )
}