import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineCheck } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import callAPI from "../../untils/callAPI";
import { formatNumber } from "../../helpers/formatNumber";
import { Spinner } from "../../components/Spinner";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/configToast";
import { updateAllCartRequest, resetCart } from "../../actions/actionProducts";
import { useLocation } from "react-router-dom";
import Product from './Product';
import Cart from './Cart';
import PriceCalculatorVisitor from './PriceCalculatorVisitor';

export const Checkout = () => {
  const location = useLocation();
  const getValueQuery = (name) => {
    const query = new URLSearchParams(location.search);
    const queryValue = query.get(name);
    return queryValue;
  };

  const info = JSON.parse(getValueQuery("vnp_OrderInfo"));
  useEffect(() => {
    if (getValueQuery("vnp_ResponseCode")) {
      if (getValueQuery("vnp_ResponseCode") === "00") {
        callAPI(
          `/user/cart/all`,
          "POST",
          {},
          {
            Authorization: `${sessionStorage.getItem("token")}`,
          }
        ).then((response) => {
          if (response && response.data) {
            const productDetail = response.data.listCart.map((cart) => ({
              productID: cart.product._id,
              quantity: cart.quantity,
            }));
            sendRequestOrder({ ...info, productDetail });
          } else {
            toast.error("Không thể lấy thông tin giỏ hàng!", toastConfig);
          }
        }).catch((error) => {
          toast.error("Lỗi khi gọi API giỏ hàng!", toastConfig);
          console.error("Error fetching cart data:", error);
        });
      } else {
        toast.error("Thanh toán thất bại!", toastConfig);
      }
    }
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = useSelector((state) => state.user);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [listCart, setListCart] = useState([]);
  const btnRef = useRef();
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [code, setCode] = useState("");
  const [isCode, setIsCode] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [address, setAddress] = useState({
    city: "",
    district: "",
    ward: "",
  });
  
  const subTotal = useSelector((state) => state.subTotal);
  const getListCart = async () => {
    const { data } = await callAPI(
      `/user/cart/all`,
      "POST",
      {},
      {
        Authorization: `${sessionStorage.getItem("token")}`,
      }
    );
    if (data.status === "success") {
      setListCart(data.listCart);
    }
  };
  const getListDistrict = async (idCity) => {
    const { data } = await axios({
      url: `https://provinces.open-api.vn/api/p/${idCity}?depth=2`,
      method: "GET",
    });
    return data.districts;
  };
  const getListWard = async (idDistrict) => {
    const { data } = await axios({
      url: `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`,
      method: "GET",
    });
    return data.wards;
  };
  const checkCoupon = async () => {
    if (code !== "") {
      setLoadingCode(true);
      const { data } = await callAPI("/code/check", "POST", { code: code });
      if (data.status === "success") {
        setLoadingCode(false);
        setCoupon(data.coupon);
        setIsCode(true);
        toast.success("Thêm mã giảm giá thành công!", toastConfig);
      } else {
        toast.error(data.messenger, toastConfig);
        setLoadingCode(false);
      }
    } else {
      toast.error("Vui lòng nhập mã!", toastConfig);
    }
  };

  useEffect(() => {
    getListCity().then((data) => {
        setListCity(data);
    }).catch((error) => {
      toast.error("Lỗi khi lấy danh sách thành phố!", toastConfig);
      console.error("Error fetching cities:", error);
    });
    getListCart();
  }, []);
  const getListCity = async () => {
    try {
      const { data } = await axios({
        url: "https://provinces.open-api.vn/api/",
        method: "GET",
      });
      return data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  };
  const handleOnChangeCity = (e) => {
    getListDistrict(e.target.value).then((data) => setListDistrict(data));
    setAddress({
      ...address,
      city: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text
    });
  };
  const handleOnChangeDistrict = (e) => {
    getListWard(e.target.value).then((data) => setListWard(data));
    setAddress({
      ...address,
      district: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
    });
  };
  const handleOnChangeWard = (e) => {
    setAddress({
      ...address,
      ward: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
    });
  };
  const sendRequestOrder = async (form) => {
    setLoadingOrder(true);
    try {
      const { data } = await callAPI("/orders", "POST", form);
      if (data.status === "success") {
        history.push("/Order-received", { ...data.order, email: user.email });
        dispatch(resetCart());
        updateAllCartRequest(dispatch, []);
        setLoadingOrder(false);
      } else {
        setLoadingOrder(false);
        toast.error("Đặt hàng thất bại!", toastConfig);
      }
    } catch (error) {
      setLoadingOrder(false);
      toast.error("Lỗi khi gửi yêu cầu đặt hàng!", toastConfig);
      console.error("Error sending order request:", error);
    }
  };
  const onSubmitForm = (data) => {
    if (coupon) {
      data.saleCode = coupon._id;
    }
    data.userID = user._id;
    data.email = user.email;
    data.address = `${data.address},${address.ward},${address.district},${address.city}`;
    data.status = 0;
    data.total = total();
    data.productDetail = [];
    listCart.forEach((cart) => {
      data.productDetail.push({
        productID: cart.product._id,
        quantity: cart.quantity,
      });
    });
    data.pay = paymentMethod;
    if (paymentMethod === "cod") {
      sendRequestOrder(data);
    }
    if (paymentMethod === "vnpay") {
      bankAccountVnpay(data);
    }
  };
  const bankAccountVnpay = async (data) => {
    callAPI(`/banking`, "POST", data, {
      Authorization: `${sessionStorage.getItem("token")}`,
    }).then(({ data }) => {
      window.location.href = data;
    }).catch((error) => {
      toast.error("Lỗi khi gọi API thanh toán!", toastConfig);
      console.error("Error calling payment API:", error);
    });
  };
  const cancelCoupon = () => {
    setCoupon(null);
    setIsCode(false);
  };

  const total = () => {
    const products = listCart.map(cart => new Product(cart.product._id, cart.product.title, cart.product.price, cart.product.sale, cart.quantity));
    const cart = new Cart(products, listDistrict.length !== 0 ? 30000 : 0, coupon ? (coupon.type === "đ" ? coupon.discount : (subTotal * coupon.discount) / 100) : 0);
    const visitor = new PriceCalculatorVisitor();
    cart.accept(visitor);
    return Math.ceil(visitor.getTotalPrice());
  };

  return (
    <div className="checkout_wrap">
      <Container fluid>
        <Row>
          <Col lg={6} xl={7}>
            <div className="billing_wrap">
              <h3>Thông tin thanh toán</h3>
              <form
                className="billing-form"
                onSubmit={handleSubmit(onSubmitForm)}
              >
                <div className="billing-form_group">
                  <label>Họ tên*</label>
                  <input
                    {...register("name", {
                      required: "Trường này là bắt buộc",
                      pattern: {
                        value: /^[A-Za-zÀ-ỹ][A-Za-zÀ-ỹ\s]*$/,
                        message: "Họ tên phải bắt đầu bằng chữ cái,không chứa ký tự đặc biệt hoặc số"
                      },
                      maxLength: {
                        value: 30,
                        message: "Họ tên không được vượt quá 30 ký tự"
                      }
                    })}
                    type="text"
                    placeholder="Nhập họ tên của bạn"
                  />
                  {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>
                <div className="billing-form_group">
                  <label>Số điện thoại*</label>
                  <input
                    {...register("phone", {
                      required: "Trường này là bắt buộc",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Số điện thoại chỉ chứa số"
                      },
                      minLength: {
                        value: 10,
                        message: "Số điện thoại phải có ít nhất 10 số"
                      },
                      maxLength: {
                        value: 10,
                        message: "Số điện thoại không được vượt quá 10 số"
                      }
                    })}
                    type="text"
                  />
                  {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                </div>
                <div className="billing-form_group">
                  <label>Tỉnh/Thành phố*</label>
                  <select onChange={handleOnChangeCity}>
                    <option value="0">Chọn tỉnh/thành phố</option>
                    {listCity && listCity.length > 0 ? listCity.map((city) => {
                      return (
                        <option key={city.code} value={city.code}>
                          {city.name}
                        </option>
                      );
                    }) : <option value="0">Không có dữ liệu</option>}
                  </select>
                </div>
                <div className="billing-form_group">
                  <label>Quận/huyện*</label>
                  <select onChange={handleOnChangeDistrict}>
                    <option>Chọn quận/huyện</option>
                    {listDistrict && listDistrict.length > 0 ? listDistrict.map((district) => {
                      return (
                        <option
                          key={district.code}
                          value={district.code}
                        >
                          {district.name}
                        </option>
                      );
                    }) : <option value="0">Không có dữ liệu</option>}
                  </select>
                </div>
                <div className="billing-form_group">
                  <label>Phường/Xã*</label>
                  <select onChange={handleOnChangeWard}>
                    <option>Chọn phường/xã</option>
                    {listWard && listWard.length > 0 ? listWard.map((ward) => {
                      return (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      );
                    }) : <option value="0">Không có dữ liệu</option>}
                  </select>
                </div>
                <div className="billing-form_group">
                  <label>Địa chỉ*</label>
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    placeholder="Ví dụ : số 10 ngõ 3"
                  />
                </div>
                <div className="billing-form_group">
                  <label>Ghi chú đơn hàng(tùy chọn)</label>
                  <textarea
                    {...register("note")}
                    placeholder="Ghi chú về đơn hàng, ví dụ : thời gian có thể nhận, đóng gói"
                  />
                </div>
                <input ref={btnRef} type="submit" hidden />
              </form>
              <div className="checkout-coupon">
                <p>Mã giảm giá</p>
                {isCode === true ? (
                  <div className="show-coupon">
                    <p className="show-coupon">{coupon.code}</p>
                    <AiOutlineCheck fontSize="2rem" color="green" />
                    <button onClick={cancelCoupon}>Đổi mã</button>
                  </div>
                ) : (
                  <div>
                    <input
                      onChange={(e) => setCode(e.target.value)}
                      type="text"
                    />
                    <button onClick={checkCoupon}>
                      {loadingCode === true ? <Spinner /> : "Áp dụng"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col lg={6} xl={5}>
            <div className="checkout-order-review">
              <h3>Đơn hàng của bạn</h3>
              <div className="order-review_wrap">
                <div className="order-review_box-sub bd-b">
                  <p>Sản phẩm</p>
                  <p>Tạm tính</p>
                </div>
                <ul className="order-review_list">
                  {listCart?.map((cart) => {
                    return (
                      <li className="order-review_item" key={cart._id}>
                        <p>
                          {cart.product.title} x {cart.quantity}
                        </p>
                        <p>
                          {formatNumber(
                            cart.product.sale > 0
                              ? cart.product.price -
                                  (cart.product.price * cart.product.sale) / 100
                              : cart.product.price * cart.quantity
                          )}
                          ₫
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <div className="order-review_box">
                  <p>Tạm tính sản phẩm</p>
                  <p>{formatNumber(subTotal)}đ</p>
                </div>
                <div className="order-review_box">
                  <p>Phí ship</p>
                  <p>
                    {listDistrict && listDistrict.length > 0
                      ? "30.000₫"
                      : "Nhập địa chỉ để tính phí ship"}
                  </p>
                </div>
                <div className="order-review_box-sub">
                  <p>Tổng</p>
                  <p>{formatNumber(total())}đ</p>
                </div>
              </div>
              <div className="order-payment">
                <div className="order-paymen_box">
                  <input
                    name="pay"
                    className="pay"
                    value="cod"
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>Thanh toán khi nhận hàng</span>
                </div>
                
                <div className="order-paymen_box">
                  <input
                    name="pay"
                    className="pay"
                    value="vnpay"
                    type="radio"
                    checked={paymentMethod === "vnpay"}
                    onChange={() => setPaymentMethod("vnpay")}
                  />
                  <span>Thanh toán qua vnpay</span>
                </div>
              </div>
              <div className="checkout-submit">
                <button onClick={() => btnRef.current.click()}>
                  {loadingOrder ? <Spinner /> : "Thanh toán"}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};