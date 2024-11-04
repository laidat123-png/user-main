

import './index.css'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="footer-wrap">
            <nav className="footer-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/">
                            Trang Chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/BAIVIET">
                            Bài viết
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/SANPHAM">
                            Sản Phẩm
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/My-account">
                            Tài Khoản
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/LIENHE">
                            Liên Hệ
                        </Link>
                    </li>
                </ul>
                <p className="nav-copyright">Bản quyền © Bookie Luci</p>
            </nav>
        </footer>

    )
}