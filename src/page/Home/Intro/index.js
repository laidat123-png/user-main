import { Container, Row, Col } from 'react-bootstrap';
import { BsBookmarksFill } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import { VscBook } from 'react-icons/vsc';
import './index.css';
export const Introduce = () => {
    return (
        <section className="introduce-wrap">
            <Container>
                <Row lg={3}>
                    <Col md={4} xs={12}>
                        <div className="introduce-item">
                            <div className="introduce-item__title">
                                <VscBook
                                    color="#27C8EA"
                                    fontSize="5rem"
                                />
                                <p>Tons of Books</p>
                            </div>
                            <p>With a wide variety of books and languages, you will have many choices</p>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="introduce-item">
                            <div className="introduce-item__title">
                                <GoPencil
                                    color="#86E154"
                                    fontSize="5rem"
                                />
                                <p>Hundreds of Authors</p>
                            </div>
                            <p>
                                Hundreds of famous authors everywhere, with a variety of styles</p>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="introduce-item">
                            <div className="introduce-item__title">
                                <BsBookmarksFill
                                    color="#E1DC54"
                                    fontSize="5rem"
                                />
                                <p>Easily Bookmarked</p>
                            </div>
                            <p>Easily bookmarked with a variety of books, publishers</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}