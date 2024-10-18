import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { OrderTitle } from '../components/OrderTitle';

export const OrderLayout = (props) => {
    return (
        <div>
            <Header />
            <OrderTitle />
            {props.children}
            <Footer />
        </div>
    )
}