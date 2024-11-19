import React from 'react'; // Import React để sử dụng JSX
import { Redirect, Route } from 'react-router-dom'; // Import Redirect và Route từ react-router-dom để điều hướng giữa các trang
import { authentication } from './authentication'; // Import đối tượng authentication để kiểm tra xác thực

// Định nghĩa component PrivateRoute
export function PrivateRoute({ layout: Layout, component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => (
            authentication.isAuthentication() ? // Kiểm tra xem người dùng đã xác thực hay chưa
                <Layout {...props}> {/* Nếu đã xác thực, hiển thị layout và component được truyền vào */}
                    <Component
                        {...props}
                    />
                </Layout>
                : <Redirect to='/Auth' /> // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
        )
        } />
    )
}