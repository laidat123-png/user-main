
import './index.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from '../Card';
export const Category = (props) => {
    const { products } = props;
    return (
        <section className={`category-wrap ${props.bgC ? "bgC" : ""}`}>
            <Container>
                <Row>
                    <h2 className={`category-title ${props.mt ? "mt" : ""} ${props.bgC ? "white" : ""}`}>{props.label}</h2>
                </Row>
                <Row lg={4}>
                    {products?.map((product, index) => {
                        if (index < 4) return (
                            <Col sm={6} xs={12} md={6} lg={3} key={product._id}>
                                <Card product={product} key={product._id} />
                            </Col>
                        )
                        else return;
                    })}
                </Row>
            </Container>
        </section >

    )
}