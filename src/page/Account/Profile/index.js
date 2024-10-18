import { Row, Col } from "react-bootstrap";

import { useEffect, useRef } from "react";
import { useForm } from 'react-hook-form';
export const Profile = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const password = useRef({});
    const fileRef = useRef();
    const { user, onSubmitEditProfile, image, onChangeFileImage, statusProfile, setStatusProfile } = props;
    useEffect(() => {
        reset("form");
    }, [statusProfile])
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
                                    {...register("form.firstName", { required: true })}
                                    type="text"
                                /> : <span>{user.firstName}</span>}
                            </div>
                            <div className="profile_form-group">
                                <label>Tên: </label>
                                {statusProfile === true ? <input
                                    type="text"
                                    {...register("form.lastName", { required: true })}
                                /> : <span>{user.lastName}</span>}
                            </div>
                            <div className="profile_form-group">
                                <label>Số điện thoại: </label>
                                {statusProfile === true ? <input
                                    type="text"
                                    {...register("form.phone", { required: true })}
                                /> : <span>{user.phone}</span>}
                            </div>
                            {statusProfile === true ? <div className="profile_form-group">
                                <label>Mật khẩu: </label>
                                <input
                                    type="password"
                                    ref={password}
                                    {...register("form.password")}
                                    placeholder="Bỏ trống nếu không đổi..."
                                />
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