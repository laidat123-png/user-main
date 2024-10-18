import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { Title } from '../components/Title';

export const MainLayout = (props) => {
    return (
        <div>
            <Header />
            <Title />
            <SearchBar />
            {props.children}
            <Footer />
        </div>
    )
}