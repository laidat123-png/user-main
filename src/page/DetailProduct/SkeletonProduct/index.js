import { Container, Row, Col } from 'react-bootstrap'; // Import các component Container, Row, Col từ react-bootstrap
import Skeleton from 'react-loading-skeleton'; // Import component Skeleton từ thư viện react-loading-skeleton

// Định nghĩa component SkeletonProduct
export const SkeletonProduct = () => {
    return (
        <Container className="bg-c">
            <div className="border-bottom-dotted">
                <Row>
                    <Col lg={5}>
                        <div className="slide-image">
                            <div className="slide-container">
                                <Skeleton height={400} /> {/* Hiển thị khung xương với chiều cao 400px */}
                            </div>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="product-content">
                            <h2 className="product-title"><Skeleton /></h2> {/* Hiển thị khung xương cho tiêu đề sản phẩm */}
                            <div className="product-desscription__short">
                                <Skeleton /> {/* Hiển thị khung xương cho mô tả ngắn của sản phẩm */}
                            </div>
                            <div className="product-offer-box">
                                <div className="product-offer__price">
                                    <Skeleton /> {/* Hiển thị khung xương cho giá sản phẩm */}
                                </div>
                                <div className="product-quantity">
                                    <Skeleton /> {/* Hiển thị khung xương cho số lượng sản phẩm */}
                                </div>
                            </div>
                            <div className="product-type">
                                <Skeleton width="20%" /> {/* Hiển thị khung xương cho loại sản phẩm với chiều rộng 20% */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="border-bottom-dotted">
                <Row>
                    <div className="product-details">
                        <Skeleton width="50%" height={300} /> {/* Hiển thị khung xương cho chi tiết sản phẩm với chiều rộng 50% và chiều cao 300px */}
                    </div>
                </Row>
            </div>
            <Skeleton height={200} /> {/* Hiển thị khung xương với chiều cao 200px */}
        </Container>
    )
}