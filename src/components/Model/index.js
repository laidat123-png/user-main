import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../actions/actionProducts";
export const Model = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.active.activeCart);
    return (
        <div className={`model-wrap ${isOpen ? "active" : ""}`} onClick={() => dispatch(toggleCart(false))} ></div>
    )
}