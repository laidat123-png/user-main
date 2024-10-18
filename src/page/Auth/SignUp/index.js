import { Spinner } from '../../../components/Spinner';
import { useForm } from 'react-hook-form';
export const SignUp = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { changeStatus, onSubmitRegister, isLoading } = props;
    return (
        <div className="form-container">
            <h2 className="auth-title">Đăng ký</h2>
            <div className="auth-des">
                <p className="auth-meta">Bạn là thành viên ?</p>
                <span onClick={() => changeStatus(true)} >Đăng nhập</span>
            </div>
            <form className="auth-form" onSubmit={handleSubmit(onSubmitRegister)}>
                <div className="auth-form_group">
                    <label>Email</label>
                    <div>
                        <input
                            {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                            type="text"
                        />
                    </div>
                    {errors.email && <span className="error-auth">Trường này phải là email</span>}
                </div>
                <div className="auth-form_group">
                    <label>Họ</label>
                    <div>
                        <input
                            type="text"
                            {...register("firstName", { required: true })}
                        />
                    </div>
                    {errors.firstName && <span className="error-auth">Trường này là bắt buộc</span>}
                </div>
                <div className="auth-form_group">
                    <label>Tên</label>
                    <div>
                        <input
                            type="text"
                            {...register("lastName", { required: true })}
                        />
                    </div>
                    {errors.lastName && <span className="error-auth">Trường này là bắt buộc</span>}
                </div>
                <div className="auth-form_group">
                    <label>Số điện thoại</label>
                    <div>
                        <input
                            type="text"
                            {...register("phone", { required: true })}
                        />
                    </div>
                    {errors.phone && <span className="error-auth">Trường này là bắt buộc</span>}
                </div>
                <div className="auth-form_group">
                    <label>Mật khẩu</label>
                    <div>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Trường này là bắt buộc", minLength: {
                                    value: 6,
                                    message: "Mật khẩu chứa ít nhất 6 ký tự"
                                }
                            })}
                        />
                    </div>
                    {errors.password && <span className="error-auth">{errors.password.message}</span>}
                </div>
                <button className="auth-form_btn">{isLoading ? <Spinner bgC="#5386e4" /> : "Đăng ký"}</button>
            </form>
        </div>
    )
}