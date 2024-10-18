import { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { FiEdit, FiUser } from 'react-icons/fi';
import { IoNewspaperOutline } from 'react-icons/io5';
import { Profile } from './Profile';
import { Orders } from "./Orders";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/configToast";
import { setUser, updateUserRequest } from '../../actions/actionAuth';
import { Loader } from '../../components/Loader';
import { useHistory } from 'react-router-dom';
import callAPI from '../../untils/callAPI';
import { OrderDetail } from './OrderDetail';
export const Account = () => {
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [statusProfile, setStatusProfile] = useState(false);
    const [listOrder, setListOrder] = useState([]);
    const dispatch = useDispatch();
    const [image, setImage] = useState(user.image);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [statusOrder, setStatusOrder] = useState(-1);
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderDetail, setOrderDetail] = useState(null);
    const [active, setActive] = useState({
        profile: true,
        orders: false,
        orderDetail: false
    })
    useEffect(() => {
        setImage(user.image);
        if (!isEmptyObject(user)) {
            getListOrders().then(data => {
                setListOrder(data.orders);
                setOrderTotal(data.ordersTotal);
            });
        } else {
            history.push("/");
        }
    }, [user, statusOrder])
    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    }
    const handleDeleteOrderRequest = (id) => {
        setIsLoading(true);
        callAPI(`/orders/${id}`, "DELETE", {}, {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        })
            .then(res => res.data)
            .then(data => {
                setIsLoading(false);
                if (data.status === "success") getListOrders().then(data => {
                    setListOrder(data.orders);
                    setOrderTotal(data.ordersTotal);
                })
            })
    }
    const getListOrders = async () => {
        setIsLoading(true);
        const { data } = await callAPI(`/orders/user?status=${statusOrder}`, "GET", {}, {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        })
        setIsLoading(false)
        if (data) return data;
        else return [];
    }
    const onChangeFileImage = (e) => {
        setFile(e.target.files[0])
        encodeImageFileAsURL(e.target.files[0]);
    }
    const encodeImageFileAsURL = (element) => {
        let file = element;
        let reader = new FileReader();
        reader.onloadend = function () {
            setImage(reader.result)
        }
        reader.readAsDataURL(file);
    }
    const onSubmitEditProfile = (data) => {
        setIsLoading(true);
        const formData = new FormData();
        if (data.form.password === "") {
            delete data.form.password;
            delete data.form.confirmPassword;
        } else {
            if (data.form.password === data.form.confirmPassword) {
                delete data.form.confirmPassword;
            } else {
                toast.error("Mật khẩu nhập lại không đúng!", toastConfig);
            }
        }
        if (file) formData.append("userImage", file);
        formData.append("user", JSON.stringify(data.form));
        updateUserRequest(dispatch, formData)
            .then(data => {
                setIsLoading(data);
                setStatusProfile(false);
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
        setListOrder(listOrder.filter(order => order._id === data.searchOrderByID));
    }
    return (
        <div className="account_wrap">
            {isLoading ? <Loader /> : ""}
            <Container>
                <Row>
                    <Col lg={3}>
                        <div className="account-control">
                            <div className="control-avatar">
                                <img src={user.image} alt={user._id} />
                                <div>
                                    <p className="control-title">{`${user.firstName} ${user.lastName}`}</p>
                                    <p className="control-edit" onClick={() => setStatusProfile(true)}><FiEdit />Sửa hồ sơ</p>
                                </div>
                            </div>
                            <p className="control-main" onClick={() => setActive({ profile: true, orders: false, orderDetail: false })}><FiUser color="blue" className="control-main_icon" />Tài khoản của tôi</p>
                            <p className="control-main" onClick={() => setActive({ profile: false, orders: true, orderDetail: false })}><IoNewspaperOutline color="chocolate" className="control-main_icon" />Đơn hàng</p>
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