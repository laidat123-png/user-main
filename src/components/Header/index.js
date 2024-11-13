import './index.css'
import { FaShoppingBasket } from 'react-icons/fa'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Link, Route } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsChevronDown } from 'react-icons/bs'
import { signOut } from '../../actions/actionAuth'
import { toggleCart } from '../../actions/actionProducts'
const Menus = [
  {
    to: '/',
    exact: true,
    name: 'TRANG CHỦ'
  },
  {
    to: '/SANPHAM',
    exact: true,
    name: 'SẢN PHẨM'
  },
  {
    to: '/BAIVIET',
    exact: true,
    name: 'BÀI VIẾT'
  },
  {
    to: '/My-account',
    exact: true,
    name: 'TÀI KHOẢN'
  },
  // {
  //   to: '/LIENHE',
  //   exact: true,
  //   name: 'LIÊN HỆ'
  // }
]
export const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [isClick, setIsClick] = useState(false)
  const [st, setSt] = useState(false)
  const [isClickMenu, setIsClickMenu] = useState(false)
  const carts = useSelector((state) => state.cart)
  const history = useHistory()
  const CustomLinkActive = ({ label, to, activeOnlyWhenExact }) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
          var active = match ? 'active' : ''
          return (
            <li
              onClick={isClickFunc}
              key={label + '1'}
              className={`navbar-item ${active}`}
            >
              <Link to={to}>{label}</Link>
            </li>
          )
        }}
      />
    )
  }
  const isClickFunc = () => {
    setIsClick(!isClick)
  }
  return (
    <header
      style={{
        backgroundColor: `${history.location.pathname !== '/' ? '#2F2B35' : ''}`
      }}
      className='header-wrap'
    >
      <Container>
        <div className='navbar-wrap'>
          <h1 className='header-logo'>
            <Link to='/' className='header-logo__link'>
              <div className='header-logo__text'>Bookie</div>
              <p className='header-logo-description'>Đam mê sách</p>
            </Link>
          </h1>
          <nav className={`header-navbar ${isClickMenu ? 'active' : ''}`}>
            <ul className='navbar-list'>
              {Menus.map((menu) => {
                return (
                  <CustomLinkActive
                    key={menu.path}
                    to={menu.to}
                    label={menu.name}
                    activeOnlyWhenExact={menu.exact}
                    isClick={isClickFunc}
                  />
                )
              })}
            </ul>
          </nav>
          <div className='header-account-cart'>
            <div
              className='header-menu-mobile'
              onClick={() => setIsClickMenu(!isClickMenu)}
            >
              <span className={`${isClickMenu ? 'active' : ''}`}></span>
              <span className={`${isClickMenu ? 'active' : ''}`}></span>
              <span className={`${isClickMenu ? 'active' : ''}`}></span>
            </div>
            <div className='d-flex justify-content align-items'>
              <div
                className='header-cart'
                onClick={() => dispatch(toggleCart(true))}
              >
                <FaShoppingBasket />
                <div className='header-cart__amount'>{carts?.length || 0}</div>
              </div>
              {Object.getOwnPropertyNames(user).length !== 0 ? (
                <div onClick={() => setSt(!st)} className='header-account'>
                  <img
                    src={
                      user.image ||
                      `https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg`
                    }
                    alt={user._id}
                  />
                  <BsChevronDown
                    fontWeight='bold'
                    fontSize='1.2rem'
                    color='white'
                  />
                  {st ? (
                    <ul className='header-account_settings'>
                      {user.role === 'admin' ? (
                        <li>
                          <a href='http://localhost:3000/login'>
                            Dashboard
                          </a>
                        </li>
                      ) : (
                        ''
                      )}
                      <li>
                        <Link to='/My-account'>Đơn hàng</Link>
                      </li>
                      <li>
                        <Link to='/My-account'>Thông tin cá nhân</Link>
                      </li>
                      <li>
                        <Link to='/My-account'>Đổi mật khẩu</Link>
                      </li>
                      <li onClick={() => signOut(dispatch)}>Đăng xuất</li>
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
