import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
export const SkeletonProduct = () => {
    return (
        <Container className="bg-c">
            <div className="border-bottom-dotted">
                <Row>
                    <Col lg={5}>
                        <div className="slide-image">
                            <div className="slide-container">
                                <Skeleton height={400} />
                            </div>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="product-content">
                            <h2 className="product-title"><Skeleton /></h2>
                            <div className="product-desscription__short">
                                <Skeleton />
                            </div>
                            <div className="product-offer-box">
                                <div className="product-offer__price">
                                    <Skeleton />
                                </div>
                                <div className="product-quantity">
                                    <Skeleton />
                                </div>
                            </div>
                            <div className="product-type">
                                <Skeleton width="20%" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="border-bottom-dotted">
                <Row>
                    <div className="product-details">
                        <Skeleton width="50%" height={300} />
                    </div>
                </Row>
            </div>
            <Skeleton height={200} />
        </Container>

    )
}