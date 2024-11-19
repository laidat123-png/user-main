import { Footer } from '../components/Footer'; // Import component Footer từ thư mục components
import { Header } from '../components/Header'; // Import component Header từ thư mục components
import { OrderTitle } from '../components/OrderTitle'; // Import component OrderTitle từ thư mục components

// Định nghĩa component OrderLayout
export const OrderLayout = (props) => {
    return (
        <div>
            <Header /> {/* Hiển thị component Header */}
            <OrderTitle /> {/* Hiển thị component OrderTitle */}
            {props.children} {/* Hiển thị các component con được truyền vào */}
            <Footer /> {/* Hiển thị component Footer */}
        </div>
    )
}