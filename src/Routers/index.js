
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
        path: "/Bookstore",
        exact: true,
        component: BookStore,
        layout: true
    },
    {
        path: "/Detail-product/:id",
        exact: true,
        component: DetailProduct,
        layout: true
    },
    {
        path: "/Blog",
        exact: true,
        component: Blog,
        layout: true
    },
    {
        path: "/Detail-post/:id",
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
        path: "/Contact",
        exact: true,
        component: Contact,
        layout: true
    },
]