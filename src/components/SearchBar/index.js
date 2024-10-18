
import './index.css';
import { BiSearch } from 'react-icons/bi';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { searchProductByField } from '../../actions/actionProducts';
import { useForm } from 'react-hook-form';
import { toastConfig } from '../../constants/configToast';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
export const SearchBar = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state.products.typeProduct);
    const nxb = useSelector(state => state.products.nxbProduct);
    const [defaultValue, setDefaultValue] = useState({
        type: "",
        nxb: ""
    })
    useEffect(() => {
        if (history.location.pathname.slice(1) === "Bookstore") {
            if (history.location.state?.status) {
                setDefaultValue({
                    type: sessionStorage.getItem("types"),
                    nxb: sessionStorage.getItem("publicCompany")
                })
                sessionStorage.removeItem("types");
                sessionStorage.removeItem("publicCompany");
            }
        }
    }, [history])
    const onSubmitSearch = (data) => {
        if (data.types === "" && data.publicCompany === "" && data.title === "") {
            toast("Bạn chưa nhập thông tin tìm kiếm !", toastConfig);
        }
        else {
            searchProductByField(dispatch, data);
            history.push("/Bookstore", { status: true });
            sessionStorage.setItem("types", data.types);
            sessionStorage.setItem("publicCompany", data.publicCompany);
        }
    }
    return (
        <div className="search-wrap">
            <Container>
                <form onSubmit={handleSubmit(onSubmitSearch)}>
                    <Row lg={4}>
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                <input
                                    placeholder="Tên sách"
                                    type="text"
                                    {...register("title")}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                <select
                                    {...register("types")}
                                >
                                    <option value="">Thể loại</option>
                                    {defaultValue.type === "" ? types.map(type => {
                                        return (
                                            <option key={type._id} value={type._id}>{type.name}</option>
                                        )
                                    }) : types.map(type => {
                                        return (
                                            <option
                                                key={type._id}
                                                selected={type._id === defaultValue.type}
                                                value={type._id}>{type.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                <select
                                    {...register("publicCompany")}
                                >
                                    <option value="">Nhà xuất bản</option>
                                    {nxb.map(n => {
                                        return (
                                            <option key={n._id} value={n._id}>{n.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                <button
                                    type="submit">
                                    <BiSearch
                                        className="search-input__icon"
                                    />
                                    TÌM SÁCH
                                </button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Container>
        </div>
    )
}