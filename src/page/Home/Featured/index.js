import { Container, Row, Col } from 'react-bootstrap'
import { createMarkup } from '../../../helpers/createMarkup'
import { Link } from 'react-router-dom'
import './index.css'
export const Featured = (props) => {
  const { product } = props
  console.log(product)
  return (
    <section className='featured-wrap'>
      <Container>
        <Row>
          <Col lg={8} md={8}>
            <div className='featured-inside_wrap'>
              <Row>
                <Col lg={6} md={6}>
                  <div className='featured-inside_content'>
                    <div className='content-title'>
                      <p>Featured Book</p>
                      <h2>{product?.title}</h2>
                      <p>{product?.author}</p>
                    </div>
                    <div
                      className='content-description'
                      dangerouslySetInnerHTML={createMarkup(
                        product?.description
                      )}
                    ></div>
                    <div className='content-button'>
                      <Link to={`/Detail-product/${product?._id}`}>
                        Chi tiết sách
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className='featured-inside_image'>
                    <img src={product?.urls[0]?.url} alt={product?.title}></img>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div className='featured-inside_wrap-2'>
              <img
                src='https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/home1-featured-02.jpg'
                alt='Ảnh'
              />
              <div>
                <span>FEATURE CATEGORY</span>
                <p>A Complete Idiot Guide to Programming</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
