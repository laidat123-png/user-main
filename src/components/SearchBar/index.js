
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
    // Sử dụng hook useForm để quản lý form và lấy ra các hàm register và handleSubmit
    const { register, handleSubmit } = useForm();
    // Sử dụng hook useDispatch để lấy hàm dispatch từ Redux store
    const dispatch = useDispatch();
    // Sử dụng hook useHistory để lấy đối tượng history từ react-router
    const history = useHistory();
    // Sử dụng hook useSelector để lấy danh sách thể loại sản phẩm từ Redux store
    const types = useSelector(state => state.products.typeProduct);
    // Sử dụng hook useSelector để lấy danh sách nhà xuất bản từ Redux store
    const nxb = useSelector(state => state.products.nxbProduct);
    // Sử dụng hook useState để quản lý state defaultValue, chứa giá trị mặc định của các trường tìm kiếm
    const [defaultValue, setDefaultValue] = useState({
        type: "",
        nxb: ""
    })
    // Sử dụng useEffect để cập nhật giá trị mặc định khi component được mount
    useEffect(() => {
        // Kiểm tra xem đường dẫn hiện tại có phải là Bookstore không
        if (history.location.pathname.slice(1) === "SANPHAM") {
            // Kiểm tra nếu trạng thái status tồn tại trong history.location.state
            if (history.location.state?.status) {
                // Cập nhật giá trị mặc định của các trường tìm kiếm từ sessionStorage
                setDefaultValue({
                    type: sessionStorage.getItem("types"),
                    nxb: sessionStorage.getItem("publicCompany")
                })
                // Xóa các giá trị trong sessionStorage sau khi đã lấy ra
                sessionStorage.removeItem("types");
                sessionStorage.removeItem("publicCompany");
            }
        }
    }, [history])
    // Hàm xử lý submit form tìm kiếm
    const onSubmitSearch = (data) => {
        // Kiểm tra nếu tất cả các trường tìm kiếm đều trống
        if (data.types === "" && data.publicCompany === "" && data.title === "") {
            // Hiện thông báo lỗi
            toast("Bạn chưa nhập thông tin tìm kiếm !", toastConfig);
        }
        else {
            // Gọi hàm searchProductByField từ actionProducts để tìm kiếm sản phẩm theo các trường tìm kiếm
            searchProductByField(dispatch, data);
            // Chuyển hướng đến trang Bookstore và truyền trạng thái status vào history.location.state
            history.push("/SANPHAM", { status: true });
            // Lưu các trường tìm kiếm vào sessionStorage
            sessionStorage.setItem("types", data.types);
            sessionStorage.setItem("publicCompany", data.publicCompany);
        }
    }
    return (
        <div className="search-wrap">
            {/* Tạo bố cục */}
            <Container>
                <form onSubmit={handleSubmit(onSubmitSearch)}>
                    {/* Sử dụng component Row từ react-bootstrap để tạo hàng với 4 cột lớn */}
                    <Row lg={4}>
                        {/* tạo cột với kích thước khác nhau trên các thiết bị */}
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                {/* Trường nhập tên sách */}
                                <input
                                    placeholder="Tên sách"
                                    type="text"
                                    {...register("title")}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                {/* Trường chọn thể loại( tạo 1 dropdown) */}
                                <select
                                    // Sử dụng hook register từ react-hook-form để đăng ký trường "types" vào form
                                    {...register("types")}
                                >
                                    <option value="">Thể loại</option>
                                    {/* Duyệt qua danh sách thể loại để hiển thị ra option */}
                                    {defaultValue.type === "" ? types.map(type => {
                                        return (
                                            <option key={type._id} value={type._id}>{type.name}</option>
                                        )
                                    }) : types.map(type => {
                                        return (
                                            <option
                                                key={type._id}
                                                // Kiểm tra nếu giá trị mặc định của trường type trùng với id của thể loại thì chọn option đó
                                                selected={type._id === defaultValue.type}
                                                value={type._id}>{type.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="search-input">
                                {/* Trường chọn nhà xuất bản */}
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
                                {/* Nút tìm kiếm */}
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