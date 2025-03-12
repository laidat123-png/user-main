import { Spinner } from '../../../components/Spinner';
import { useForm } from 'react-hook-form'; 
import { useEffect } from 'react'; // Import useEffect từ React

// Định nghĩa component SignUp
export const SignUp = ({ mediator, changeStatus, onSubmitRegister, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        mediator.register('SignUp', { onSubmitRegister });
    }, [mediator, onSubmitRegister]);

    const handleSubmitForm = (data) => {
        mediator.notify('SignUp', 'signUp', data);
    };

    return (
        <div className="form-container">
            <h2 className="auth-title">Đăng ký</h2>
            <div className="auth-des">
                <p className="auth-meta">Bạn là thành viên ?</p>
                <span onClick={() => mediator.notify('SignUp', 'changeStatus', true)}>Đăng nhập</span>
            </div>
            <form className="auth-form" onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="auth-form_group">
                    <label>Email</label>
                    <div>
                        <input
                            {...register("email", {
                                required: "Trường này là bắt buộc",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-àáâãèéêìíòóôõùúăđĩũơưạ-ỹ]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Email không đúng định dạng" 
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Địa chỉ email không quá 30 kí tự" 
                                }
                            })}
                            type="text"
                        />
                    </div>
                    {errors.email && <span className="error-auth">{errors.email.message}</span>} 
                </div>
                <div className="auth-form_group">
                    <label>Họ</label>
                    <div>
                        <input
                            type="text"
                            {...register("firstName", {
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
                        />
                    </div>
                    {errors.firstName && <span className="error-auth">{errors.firstName.message}</span>}
                </div>
                <div className="auth-form_group">
                    <label>Tên</label>
                    <div>
                        <input
                            type="text"
                            {...register("lastName", {
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
                        />
                    </div>
                    {errors.lastName && <span className="error-auth">{errors.lastName.message}</span>}
                </div>
                <div className="auth-form_group">
                    <label>Số điện thoại</label>
                    <div>
                        <input
                            type="text"
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
                        />
                    </div>
                    {errors.phone && <span className="error-auth">{errors.phone.message}</span>} 
                </div>
                <div className="auth-form_group">
                    <label>Mật khẩu</label>
                    <div>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Trường này là bắt buộc", 
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
                        />
                    </div>
                    {errors.password && <span className="error-auth">{errors.password.message}</span>}
                </div>
                <button className="auth-form_btn">{isLoading ? <Spinner bgC="#5386e4" /> : "Đăng ký"}</button>
            </form>
        </div>
    );
};