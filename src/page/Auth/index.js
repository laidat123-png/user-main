
import './index.css';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import { signIn, signUp } from '../../actions/actionAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
export const Auth = () => {
    const isLoading = useSelector(state => state.loading.loadingauth);
    const [status, setStatus] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const changeStatus = (bool) => {
        setStatus(bool);
    }
    const onSubmitLogin = (data) => {
        signIn(history, dispatch, data);
    }
    const onSubmitRegister = (data) => {
        signUp(history, dispatch, data);
    }
    return (
        <div className={`auth-wrap`}>
            <div className="auth-btn_close"
                onClick={() => history.goBack()}
            >
                <GrClose
                    fontSize="1.5rem"
                />
            </div>
            {status ?
                <SignIn
                    onSubmitLogin={onSubmitLogin}
                    changeStatus={changeStatus}
                    isLoading={isLoading}
                /> :
                <SignUp
                    onSubmitRegister={onSubmitRegister}
                    changeStatus={changeStatus}
                    isLoading={isLoading}
                />
            }
        </div>
    )
}