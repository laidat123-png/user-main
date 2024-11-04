
import { Home } from '../page/Home';
import { BookStore } from '../page/BookStore';
import { DetailProduct } from '../page/DetailProduct';
import { Blog } from '../page/Blog';
import { DetailPost } from '../page/DetailPost';
import { Auth } from '../page/Auth';
import { Contact } from '../page/Contact';
export const routers = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/SANPHAM",
        exact: true,
        component: BookStore,
        layout: true
    },
    {
        path: "/CHITIETSANPHAM/:id",
        exact: true,
        component: DetailProduct,
        layout: true
    },
    {
        path: "/BAIVIET",
        exact: true,
        component: Blog,
        layout: true
    },
    {
        path: "/CHITIETBAIVIET/:id",
        exact: true,
        component: DetailPost,
        layout: true
    },
    {
        path: "/Auth",
        exact: true,
        component: Auth
    },
    {
        path: "/LIENHE",
        exact: true,
        component: Contact,
        layout: true
    },
]