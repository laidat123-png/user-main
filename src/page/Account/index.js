import { useEffect, useState } from 'react'; // Import useEffect và useState từ react
import { Container, Row, Col } from "react-bootstrap"; // Import các component Container, Row, Col từ react-bootstrap
import "./index.css"; // Import file CSS cho component
import { FiEdit, FiUser } from 'react-icons/fi'; // Import các biểu tượng từ react-icons
import { IoNewspaperOutline } from 'react-icons/io5'; // Import biểu tượng từ react-icons
import { Profile } from './Profile'; // Import component Profile
import { Orders } from "./Orders"; // Import component Orders
import { useSelector, useDispatch } from "react-redux"; // Import useSelector và useDispatch từ react-redux
import { toast } from "react-toastify"; // Import thư viện toast để hiển thị thông báo
import { toastConfig } from "../../constants/configToast"; // Import cấu hình toast
import { setUser, updateUserRequest } from '../../actions/actionAuth'; // Import các action liên quan đến người dùng
import { Loader } from '../../components/Loader'; // Import component Loader
import { useHistory } from 'react-router-dom'; // Import useHistory từ react-router-dom để điều hướng giữa các trang
import callAPI from '../../untils/callAPI'; // Import hàm callAPI để gọi API
import { OrderDetail } from './OrderDetail'; // Import component OrderDetail

// Định nghĩa component Account
export const Account = () => {
    const history = useHistory(); // Sử dụng useHistory để điều hướng giữa các trang
    const user = useSelector(state => state.user); // Lấy thông tin người dùng từ state
    const [statusProfile, setStatusProfile] = useState(false); // Khởi tạo state statusProfile
    const [listOrder, setListOrder] = useState([]); // Khởi tạo state listOrder
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const [image, setImage] = useState(user.image); // Khởi tạo state image
    const [isLoading, setIsLoading] = useState(false); // Khởi tạo state isLoading
    const [file, setFile] = useState(null); // Khởi tạo state file
    const [statusOrder, setStatusOrder] = useState(-1); // Khởi tạo state statusOrder
    const [orderTotal, setOrderTotal] = useState(0); // Khởi tạo state orderTotal
    const [orderDetail, setOrderDetail] = useState(null); // Khởi tạo state orderDetail
    const [active, setActive] = useState({ // Khởi tạo state active
        profile: true,
        orders: false,
        orderDetail: false
    });

    useEffect(() => {
        setImage(user.image); // Thiết lập ảnh người dùng
        if (!isEmptyObject(user)) { // Kiểm tra xem đối tượng người dùng có rỗng không
            getListOrders().then(data => { // Lấy danh sách đơn hàng
                setListOrder(data.orders); // Thiết lập danh sách đơn hàng
                setOrderTotal(data.ordersTotal); // Thiết lập tổng số đơn hàng
            });
        } else {
            history.push("/"); // Chuyển hướng về trang chủ nếu người dùng rỗng
        }
    }, [user, statusOrder]);

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0; // Kiểm tra xem đối tượng có rỗng không
    }

    const handleDeleteOrderRequest = (id) => {
        setIsLoading(true); // Thiết lập trạng thái loading
        callAPI(`/orders/${id}`, "DELETE", {}, {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        })
            .then(res => res.data)
            .then(data => {
                setIsLoading(false); // Tắt trạng thái loading
                if (data.status === "success") getListOrders().then(data => { // Nếu xóa thành công, lấy lại danh sách đơn hàng
                    setListOrder(data.orders); // Thiết lập danh sách đơn hàng
                    setOrderTotal(data.ordersTotal); // Thiết lập tổng số đơn hàng
                })
            })
    }

    const getListOrders = async () => {
        setIsLoading(true); // Thiết lập trạng thái loading
        const { data } = await callAPI(`/orders/user?status=${statusOrder}`, "GET", {}, {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        });
        setIsLoading(false); // Tắt trạng thái loading
        if (data) return data; // Trả về dữ liệu nếu có
        else return []; // Trả về mảng rỗng nếu không có dữ liệu
    }

    const onChangeFileImage = (e) => {
        setFile(e.target.files[0]); // Thiết lập file
        encodeImageFileAsURL(e.target.files[0]); // Mã hóa file ảnh thành URL
    }

    const encodeImageFileAsURL = (element) => {
        let file = element;
        let reader = new FileReader();
        reader.onloadend = function () {
            setImage(reader.result); // Thiết lập ảnh từ kết quả đọc file
        }
        reader.readAsDataURL(file); // Đọc file dưới dạng URL
    }

    const onSubmitEditProfile = (data) => {
        setIsLoading(true); // Thiết lập trạng thái loading
        const formData = new FormData();
        if (data.form.password === "") {
            delete data.form.password;
            delete data.form.confirmPassword;
        } else {
            if (data.form.password === data.form.confirmPassword) {
                delete data.form.confirmPassword;
            } else {
                toast.error("Mật khẩu nhập lại không đúng!", toastConfig); // Hiển thị thông báo lỗi nếu mật khẩu nhập lại không đúng
            }
        }
        if (file) formData.append("userImage", file); // Thêm file ảnh vào formData nếu có
        formData.append("user", JSON.stringify(data.form)); // Thêm thông tin người dùng vào formData
        updateUserRequest(dispatch, formData)
            .then(data => {
                setIsLoading(data); // Tắt trạng thái loading
                setStatusProfile(false); // Thiết lập trạng thái profile
            });
    }

    const showStatus = (status) => {
        switch (status) {
            case 0:
                return "CHỜ XÁC NHẬN";
            case 1:
                return 'ĐÃ XÁC NHẬN';
            case 2:
                return 'ĐANG GIAO HÀNG';
            case 3:
                return "ĐÃ GIAO";
            default:
                return "Không xác định";
        }
    }

    const showStatusStep = (status) => {
        switch (status) {
            case 0:
                return "0%";
            case 1:
                return "25%";
            case 2:
                return "52%";
            case 3:
                return "-webkit-fill-available";
            default: return "0%";
        }
    }

    const handleSearchOrderByID = (data) => {
        if (data.searchOrderByID === "") getListOrders().then(data => {
            setListOrder(data.orders);
            setOrderTotal(data.ordersTotal);
        })
        setListOrder(listOrder.filter(order => order._id === data.searchOrderByID)); // Lọc danh sách đơn hàng theo ID
    }

    return (
        <div className="account_wrap">
            {isLoading ? <Loader /> : ""} {/* Hiển thị loader nếu đang loading */}
            <Container>
                <Row>
                    <Col lg={3}>
                        <div className="account-control">
                            <div className="control-avatar">
                                <img src={user.image} alt={user._id} /> {/* Hiển thị ảnh đại diện người dùng */}
                                <div>
                                    <p className="control-title">{`${user.firstName} ${user.lastName}`}</p> {/* Hiển thị tên người dùng */}
                                    <p className="control-edit" onClick={() => setStatusProfile(true)}><FiEdit />Sửa hồ sơ</p> {/* Hiển thị nút sửa hồ sơ */}
                                </div>
                            </div>
                            <p className="control-main" onClick={() => setActive({ profile: true, orders: false, orderDetail: false })}><FiUser color="blue" className="control-main_icon" />Tài khoản của tôi</p> {/* Hiển thị nút tài khoản của tôi */}
                            <p className="control-main" onClick={() => setActive({ profile: false, orders: true, orderDetail: false })}><IoNewspaperOutline color="chocolate" className="control-main_icon" />Đơn hàng</p> {/* Hiển thị nút đơn hàng */}
                        </div>
                    </Col>
                    <Col lg={9}>
                        {active.profile === true ? <Profile
                            user={user}
                            onSubmitEditProfile={onSubmitEditProfile}
                            onChangeFileImage={onChangeFileImage}
                            setStatusProfile={setStatusProfile}
                            statusProfile={statusProfile}
                            image={image}
                        /> : ""}
                        {active.orders === true ? <Orders
                            listOrder={listOrder}
                            setStatusOrder={setStatusOrder}
                            showStatus={showStatus}
                            orderTotal={orderTotal}
                            orderDetail={orderDetail}
                            setOrderDetail={setOrderDetail}
                            setActive={setActive}
                            handleDeleteOrderRequest={handleDeleteOrderRequest}
                            handleSearchOrderByID={handleSearchOrderByID}
                        /> : ""}
                        {active.orderDetail === true ? <OrderDetail
                            orderDetail={orderDetail}
                            showStatusStep={showStatusStep}
                            showStatus={showStatus}
                            setActive={setActive}
                        /> : ""}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}