import { Row, Col } from "react-bootstrap"; // Import các component Row và Col từ react-bootstrap
import { useEffect, useRef } from "react"; // Import useEffect và useRef từ react
import { useForm } from 'react-hook-form'; // Import useForm từ react-hook-form để quản lý form

// Định nghĩa component Profile
export const Profile = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Sử dụng useForm để quản lý form
    const password = useRef({}); // Sử dụng useRef để tạo tham chiếu cho mật khẩu
    const fileRef = useRef(); // Sử dụng useRef để tạo tham chiếu cho input file
    const { user, onSubmitEditProfile, image, onChangeFileImage, statusProfile, setStatusProfile } = props; // Lấy các props truyền vào component

    useEffect(() => {
        reset("form"); // Reset form khi statusProfile thay đổi
    }, [statusProfile]);

    return (
        <div className="profile_wrap">
            <Row className="profile-mb">
                <Col lg={8}>
                    <div className="profile_form">
                        <h3>Hồ sơ của bạn</h3>
                        <form onSubmit={handleSubmit(onSubmitEditProfile)}>
                            <div className="profile_form-group">
                                <label>Email: </label>
                                <p>{user.email}</p> {/* Hiển thị email của người dùng */}
                            </div>
                            <div className="profile_form-group">
                                <label>Họ: </label>
                                {statusProfile === true ? <input
                                    {...register("form.firstName", {
                                        required: "Trường này là bắt buộc",
                                        pattern: {
                                            value: /^[A-Za-zÀ-ỹ]/,
                                            message: "Họ phải bắt đầu bằng chữ cái"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Họ không được vượt quá 30 ký tự"
                                        }
                                    })}
                                    type="text"
                                /> : <span>{user.firstName}</span>} {/* Hiển thị họ của người dùng hoặc input để chỉnh sửa */}
                                {errors.form?.firstName && <p className="error-message">{errors.form.firstName.message}</p>} {/* Hiển thị thông báo lỗi nếu có */}
                            </div>
                            <div className="profile_form-group">
                                <label>Tên: </label>
                                {statusProfile === true ? <input
                                    type="text"
                                    {...register("form.lastName", {
                                        required: "Trường này là bắt buộc",
                                        pattern: {
                                            value: /^[A-Za-zÀ-ỹ]/,
                                            message: "Tên phải bắt đầu bằng chữ cái"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Tên không được vượt quá 30 ký tự"
                                        }
                                    })}
                                /> : <span>{user.lastName}</span>} {/* Hiển thị tên của người dùng hoặc input để chỉnh sửa */}
                                {errors.form?.lastName && <p className="error-message">{errors.form.lastName.message}</p>} {/* Hiển thị thông báo lỗi nếu có */}
                            </div>
                            <div className="profile_form-group">
                                <label>Số điện thoại: </label>
                                {statusProfile === true ? <input
                                    type="text"
                                    {...register("form.phone", {
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
                                /> : <span>{user.phone}</span>} {/* Hiển thị số điện thoại của người dùng hoặc input để chỉnh sửa */}
                                {errors.form?.phone && <p className="error-message">{errors.form.phone.message}</p>} {/* Hiển thị thông báo lỗi nếu có */}
                            </div>
                            {statusProfile === true ? <div className="profile_form-group">
                                <label>Mật khẩu: </label>
                                <input
                                    type="password"
                                    ref={password}
                                    {...register("form.password", {
                                        minLength: {
                                            value: 6,
                                            message: "Mật khẩu phải chứa ít nhất 6 ký tự"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Mật khẩu không được vượt quá 12 ký tự"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-zÀ-ỹ])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zÀ-ỹ\d@$!%*#?&]{8,12}$/,
                                            message: "Mật khẩu phải chứa chữ cái, số và ký tự đặc biệt"
                                        }
                                    })}
                                    placeholder="Bỏ trống nếu không đổi..."
                                />
                                {errors.form?.password && <p className="error-message">{errors.form.password.message}</p>} {/* Hiển thị thông báo lỗi nếu có */}
                            </div> : ""}
                            {statusProfile === true ? <div className="profile_form-group">
                                <label>Nhập lại mật khẩu: </label>
                                <input
                                    {...register("form.confirmPassword")}
                                    type="password"
                                    placeholder="Bỏ trống nếu không đổi..."
                                />
                            </div> : ""}
                            <div className="profile_form-btn">
                                {statusProfile === true ? <button>Lưu</button> : ""} {/* Hiển thị nút Lưu nếu statusProfile là true */}
                            </div>
                        </form>
                        {statusProfile === false ? <button className="btn-profile_edit" onClick={() => setStatusProfile(true)}>Sửa</button>
                            : <button className="btn-profile_edit" onClick={() => setStatusProfile(false)}>Quay lại</button>} {/* Hiển thị nút Sửa hoặc Quay lại tùy thuộc vào trạng thái statusProfile */}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="profile-avatar">
                        <img
                            src={image}
                            alt="Ảnh đại diện"
                        /> {/* Hiển thị ảnh đại diện */}
                        {statusProfile === true ? <p onClick={() => fileRef.current.click()}>Chọn Ảnh</p> : ""} {/* Hiển thị nút Chọn Ảnh nếu statusProfile là true */}
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            hidden
                            ref={fileRef}
                            onChange={onChangeFileImage}
                        /> {/* Input để chọn file ảnh, ẩn đi và chỉ hiển thị khi người dùng nhấp vào nút Chọn Ảnh */}
                    </div>
                </Col>
            </Row>
        </div>
    )
}