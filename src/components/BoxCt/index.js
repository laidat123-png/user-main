import { Link } from "react-router-dom";
import { searchProductByField } from "../../actions/actionProducts";
import { useDispatch } from 'react-redux';
import "./index.css";


export const BoxCt = (props) => {
    const { data, label, length, type } = props;
    const dispatch = useDispatch();
    const onSubmitSearchTypeProduct = (types) => {
        searchProductByField(dispatch, { types, title: "" })
    }
    return (
        <div className="category-product">
            <p className="category-product__title">{label}</p>
            <ul className="category-product__list">
                {type === "post" ? data.map((d, i) => {
                    if (i < length) {
                        return (
                            <li className="category-product__item ft" key={d._id}>
                                <Link to={`/Detail-post/${d._id}`}>{d.title}</Link>
                            </li>
                        )
                    }
                    return;
                }) :
                    data.map((d, i) => {
                        if (i < length) {
                            return (
                                <li className="category-product__item ft" key={d._id}>
                                    <Link onClick={() => onSubmitSearchTypeProduct(d._id)} to="/Bookstore">{d.name}</Link>
                                </li>
                            )
                        }
                        return;
                    })
                }
            </ul>
        </div>
    )
}