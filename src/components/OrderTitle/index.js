import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { BsArrowRight } from 'react-icons/bs';
import "./index.css";

export const OrderTitle = () => {
    const history = useHistory();
    const findIndexByString = () => {
        let status = false;
        let strLength = history.location.pathname.length;
        let str = history.location.pathname;
        for (let i = 0; i < strLength; i++) {
            if (status === true && str[i] === "/") {
                return i;
            }
            if (str[i] === "/") {
                status = true;
                continue;
            };
        }
    }
    return (
        <div className="page-order_title">
            <Container>
                <div className="page-order_pc">
                    <Link className={`${history.location.pathname.slice(1, findIndexByString()) === "Cart" ? "active" : ""}`} to="/Cart">GIỎ HÀNG</Link>
                    <span className="icon-mobile"><BsArrowRight color="white" fontSize="2rem" /></span>
                    <Link className={`${history.location.pathname.slice(1, findIndexByString()) === "Checkout" ? "active" : ""}`} to="/Checkout">CHECKOUT</Link>
                    <span className="icon-mobile"><BsArrowRight color="white" fontSize="2rem" /></span>
                    <span className={`sp ${history.location.pathname.slice(1, findIndexByString()) === "Order-received" ? "active" : ""}`}>ORDER COMPLETE</span>
                </div>
            </Container>
        </div>
    )
}