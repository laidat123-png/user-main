import { useState, useEffect } from "react";
import { AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { Spinner } from '../../../components/Spinner';

// Định nghĩa component SignIn
export const SignIn = ({ mediator, isLoading, changeStatus, onSubmitLogin }) => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Sử dụng useForm để quản lý form
    const [typeInput, setTypeInput] = useState(false); // Khởi tạo state typeInput

    useEffect(() => {
        mediator.register('SignIn', { onSubmitLogin });
    }, [mediator, onSubmitLogin]);

    const changeTypeInput = () => {
        setTypeInput(!typeInput); // Thay đổi trạng thái typeInput
    }

    const handleSubmitForm = (data) => {
        mediator.notify('SignIn', 'signIn', data);
    };

    return (
        <div className="form-container">
            <h2 className="auth-title">Đăng nhập</h2>
            <div className="auth-des">
                <p className="auth-meta">Bạn chưa có tài khoản?</p>
                <span onClick={() => mediator.notify('SignIn', 'changeStatus', false)}>Đăng ký</span> {/* Hiển thị liên kết "Đăng ký" và gọi hàm changeStatus khi nhấp vào */}
            </div>
            <form className="auth-form" onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="auth-form_group">
                    <label>Email</label>
                    <div>
                        <input
                            {...register("email", {
                                required: "Trường này là bắt buộc"
                            })}
                            type="email"
                        />
                    </div>
                    {errors.email && <span className="error-auth">{errors.email.message}</span>}
                </div>
                <div className="auth-form_group">
                    <label>Mật khẩu</label>
                    <div className="auth-form_password">
                        <input
                            {...register("password", {
                                required: "Trường này là bắt buộc"
                            })}
                            type={typeInput ? "text" : "password"} // Thay đổi loại input giữa text và password
                        />
                        <AiFillEyeInvisible
                            cursor="pointer"
                            onClick={changeTypeInput}
                        />
                    </div>
                    {errors.password && <span className="error-auth">{errors.password.message}</span>}
                </div>
                <button type="submit" className="auth-form_btn">{isLoading ? <Spinner bgC="#5386e4" /> : "Đăng nhập"}</button>
            </form>
        </div>
    );
};