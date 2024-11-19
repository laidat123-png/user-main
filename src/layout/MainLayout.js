import { Footer } from '../components/Footer'; // Import component Footer từ thư mục components
import { Header } from '../components/Header'; // Import component Header từ thư mục components
import { SearchBar } from '../components/SearchBar'; // Import component SearchBar từ thư mục components
import { Title } from '../components/Title'; // Import component Title từ thư mục components

// Định nghĩa component MainLayout
export const MainLayout = (props) => {
    return (
        <div>
            <Header /> {/* Hiển thị component Header */}
            <Title /> {/* Hiển thị component Title */}
            <SearchBar /> {/* Hiển thị component SearchBar */}
            {props.children} {/* Hiển thị các component con được truyền vào */}
            <Footer /> {/* Hiển thị component Footer */}
        </div>
    )
}