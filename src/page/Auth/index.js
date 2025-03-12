import './index.css'; 
import { SignIn } from './SignIn'; 
import { SignUp } from './SignUp'; 
import { GrClose } from 'react-icons/gr'; 
import { useState, useEffect } from 'react'; 
import { signIn, signUp } from '../../actions/actionAuth'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory } from 'react-router'; 
import AuthMediator from './AuthMediator';

const mediator = new AuthMediator();

// Định nghĩa component Auth
export const Auth = () => {
    const isLoading = useSelector(state => state.loading.loadingauth); // Lấy trạng thái loading từ state
    const [status, setStatus] = useState(false); // Khởi tạo state status
    const history = useHistory(); // Sử dụng useHistory để điều hướng giữa các trang
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch

    useEffect(() => {
        mediator.register('Auth', { changeStatus });
    }, []);

    // Hàm thay đổi trạng thái đăng nhập/đăng ký
    const changeStatus = (bool) => {
        setStatus(bool); // Thiết lập trạng thái status
    }

    // Hàm xử lý đăng nhập
    const onSubmitLogin = (data) => {
        signIn(history, dispatch, data);
    }

    // Hàm xử lý đăng ký
    const onSubmitRegister = (data) => {
        signUp(history, dispatch, data);
    }

    return (
        <div className={`auth-wrap`}>
            <div className="auth-btn_close"
                onClick={() => history.goBack()} // Quay lại trang trước đó khi nhấp vào nút đóng
            >
                <GrClose
                    fontSize="1.5rem"
                />
            </div>
            {status ?
                <SignIn
                    mediator={mediator}
                    onSubmitLogin={onSubmitLogin}
                    changeStatus={changeStatus}
                    isLoading={isLoading}
                /> :
                <SignUp
                    mediator={mediator}
                    onSubmitRegister={onSubmitRegister}
                    changeStatus={changeStatus}
                    isLoading={isLoading}
                />
            }
        </div>
    )
}