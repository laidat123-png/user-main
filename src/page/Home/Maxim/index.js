
import './index.css';
import { Container, Row, Col } from 'react-bootstrap';

export const Maxim = () => {
    return (
        <section className="maxim-wrap">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col>
                        <div className="maxim-content">
                            <h1>Good books, like good friends, are few and chosen the more select, the more enjoyable.</h1>
                            <p>❝ Louisa May Alcott ❞</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}