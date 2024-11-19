import './index.css'; // Import file CSS cho component
import { FaShoppingBasket } from 'react-icons/fa'; // Import biểu tượng giỏ hàng từ react-icons
import { Container } from 'react-bootstrap'; // Import component Container từ react-bootstrap
import { useHistory } from 'react-router-dom'; // Import useHistory từ react-router-dom để điều hướng giữa các trang
import { Link, Route } from 'react-router-dom'; // Import Link và Route từ react-router-dom để điều hướng giữa các trang
import { useState } from 'react'; // Import useState từ react để sử dụng state
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch và useSelector từ react-redux để dispatch các action và lấy state từ store
import { BsChevronDown } from 'react-icons/bs'; // Import biểu tượng mũi tên xuống từ react-icons
import { signOut } from '../../actions/actionAuth'; // Import action signOut để đăng xuất
import { toggleCart } from '../../actions/actionProducts'; // Import action toggleCart để bật/tắt giỏ hàng

// Định nghĩa danh sách các menu
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

// Định nghĩa component Header
export const Header = () => {
  const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ state
  const [isClick, setIsClick] = useState(false); // Khởi tạo state isClick
  const [st, setSt] = useState(false); // Khởi tạo state st
  const [isClickMenu, setIsClickMenu] = useState(false); // Khởi tạo state isClickMenu
  const carts = useSelector((state) => state.cart); // Lấy giỏ hàng từ state
  const history = useHistory(); // Sử dụng useHistory để điều hướng giữa các trang

  // Định nghĩa component CustomLinkActive để tạo các liên kết với trạng thái active
  const CustomLinkActive = ({ label, to, activeOnlyWhenExact }) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
          var active = match ? 'active' : ''; // Kiểm tra xem đường dẫn có khớp với đường dẫn hiện tại không, nếu có thì thêm lớp "active"
          return (
            <li
              onClick={isClickFunc}
              key={label + '1'}
              className={`navbar-item ${active}`}
            >
              <Link to={to}>{label}</Link> {/* Tạo liên kết đến trang tương ứng */}
            </li>
          )
        }}
      />
    )
  }

  // Hàm xử lý khi nhấp vào menu
  const isClickFunc = () => {
    setIsClick(!isClick); // Thay đổi trạng thái isClick
  }

  return (
    <header
      style={{
        backgroundColor: `${history.location.pathname !== '/' ? '#2F2B35' : ''}` // Thiết lập màu nền cho header nếu không phải trang chủ
      }}
      className='header-wrap'
    >
      <Container>
        <div className='navbar-wrap'>
          <h1 className='header-logo'>
            <Link to='/' className='header-logo__link'>
              <div className='header-logo__text'>Bookie</div> {/* Hiển thị tên logo */}
              <p className='header-logo-description'>Đam mê sách</p> {/* Hiển thị mô tả logo */}
            </Link>
          </h1>
          <nav className={`header-navbar ${isClickMenu ? 'active' : ''}`}> {/* Thiết lập lớp CSS cho navbar, thêm lớp "active" nếu isClickMenu là true */}
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
                <div className='header-cart__amount'>{carts?.length || 0}</div> {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
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