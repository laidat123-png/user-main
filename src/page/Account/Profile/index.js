import { Row, Col } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useForm } from 'react-hook-form';

export const Profile = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const password = useRef({});
    const fileRef = useRef();
    const { user, onSubmitEditProfile, image, onChangeFileImage, statusProfile, setStatusProfile } = props;

    useEffect(() => {
        reset("form");
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
                                <p>{user.email}</p>
                            </div>
                            <div className="profile_form-group">
                                <label>Họ: </label>
                                {statusProfile === true ? <input
                                    {...register("form.firstName", {
                                        required: "Trường này là bắt buộc",
                                        pattern: {
                                            value: /^[A-Za-z]/,
                                            message: "Họ phải bắt đầu bằng chữ cái"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Họ không được vượt quá 30 ký tự"
                                        }
                                    })}
                                    type="text"
                                /> : <span>{user.firstName}</span>}
                                {errors.form?.firstName && <p className="error-message">{errors.form.firstName.message}</p>}
                            </div>
                            <div className="profile_form-group">
                                <label>Tên: </label>
                                {statusProfile === true ? <input
                                    type="text"
                                    {...register("form.lastName", {
                                        required: "Trường này là bắt buộc",
                                        pattern: {
                                            value: /^[A-Za-z]/,
                                            message: "Tên phải bắt đầu bằng chữ cái"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Tên không được vượt quá 30 ký tự"
                                        }
                                    })}
                                /> : <span>{user.lastName}</span>}
                                {errors.form?.lastName && <p className="error-message">{errors.form.lastName.message}</p>}
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
                                /> : <span>{user.phone}</span>}
                                {errors.form?.phone && <p className="error-message">{errors.form.phone.message}</p>}
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
                                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
                                            message: "Mật khẩu phải chứa chữ cái, số và ký tự đặc biệt"
                                        }
                                    })}
                                    placeholder="Bỏ trống nếu không đổi..."
                                />
                                {errors.form?.password && <p className="error-message">{errors.form.password.message}</p>}
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
                                {statusProfile === true ? <button>Lưu</button> : ""}
                            </div>
                        </form>
                        {statusProfile === false ? <button className="btn-profile_edit" onClick={() => setStatusProfile(true)}>Sửa</button>
                            : <button className="btn-profile_edit" onClick={() => setStatusProfile(false)}>Quay lại</button>}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="profile-avatar">
                        <img
                            src={image}
                            alt="Ảnh đại diện"
                        />
                        {statusProfile === true ? <p onClick={() => fileRef.current.click()}>Chọn Ảnh</p> : ""}
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            hidden
                            ref={fileRef}
                            onChange={onChangeFileImage}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}