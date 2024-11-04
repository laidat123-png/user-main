import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Header } from '../../components/Header/index'
import { CarouselP } from './Carousel/index'
import { SearchBar } from '../../components/SearchBar/index'
import { Category } from '../../components/Category/index'
import { Featured } from './Featured/index'
import { Sale } from './Sale/index'
import { Maxim } from './Maxim/index'
import { Introduce } from './Intro/index'
import { Blog } from './Blog/index'
import { Footer } from '../../components/Footer/index'
import { useSelector, useDispatch } from 'react-redux'

export const Home = () => {
  const products = useSelector((state) => state.products)
  const posts = useSelector((state) => state.posts.postAll) || []
  return (
    <div>
      <Header />
      <CarouselP />
      <SearchBar />
      <Category products={products.productsPopular} label='Sách Phổ Biến' />
      <Featured product={products.listProduct[1]} />
      <Sale products={products.productsNews} />
      <Maxim />
      <Introduce />
      <Category products={products.productsSale} label='Sách Giảm Giá' />
      <Blog posts={posts} />
      <Footer />
    </div>
  )
}
