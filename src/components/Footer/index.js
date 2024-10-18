

import './index.css'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="footer-wrap">
            <nav className="footer-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* <Link to="/Blog"> */}
                            Blog
                        {/* </Link> */}
                    </li>
                    <li className="nav-item">
                        <Link to="/Bookstore">
                            Bookstore
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/My-account">
                            My Account
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* <Link to="/Contact"> */}
                            Contact Us
                        {/* </Link> */}
                    </li>
                </ul>
                <p className="nav-copyright">Copyright © Bookie Luci</p>
            </nav>
        </footer>

    )
}