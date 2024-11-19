import './index.css'; // Import file CSS cho component
import { Container, Row, Col } from 'react-bootstrap'; // Import các component Container, Row, Col từ react-bootstrap
import { Card } from '../Card'; // Import component Card từ thư mục cha

// Định nghĩa component Category
export const Category = (props) => {
    const { products } = props; // Lấy danh sách sản phẩm từ props
    return (
        <section className={`category-wrap ${props.bgC ? "bgC" : ""}`}> {/* Thiết lập lớp CSS cho section, thêm lớp "bgC" nếu props.bgC là true */}
            <Container>
                <Row>
                    <h2 className={`category-title ${props.mt ? "mt" : ""} ${props.bgC ? "white" : ""}`}>{props.label}</h2> {/* Hiển thị tiêu đề danh mục, thêm các lớp CSS nếu props.mt hoặc props.bgC là true */}
                </Row>
                <Row lg={4}>
                    {products?.map((product, index) => { // Duyệt qua danh sách sản phẩm
                        if (index < 4) return ( // Giới hạn số lượng sản phẩm hiển thị (tối đa 4 sản phẩm)
                            <Col sm={6} xs={12} md={6} lg={3} key={product._id}> {/* Hiển thị sản phẩm trong cột, thiết lập kích thước cột cho các kích thước màn hình khác nhau */}
                                <Card product={product} key={product._id} /> {/* Hiển thị component Card cho từng sản phẩm */}
                            </Col>
                        )
                        else return null; // Nếu không thỏa điều kiện, không hiển thị gì
                    })}
                </Row>
            </Container>
        </section>
    )
}