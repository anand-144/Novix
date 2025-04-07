import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import {Login, Register} from "../components";
import Cart from "../pages/home/books/Cart";
import CheckOut from "../pages/home/books/CheckOut";
import SingleBooks from "../pages/home/books/SingleBooks";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/home/books/OrderPage"
import SearchResults from "../components/SearchResults";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/orders",
                element: <PrivateRoute> <Order /> </PrivateRoute>,
            },
            {
                path: "/about",
                element: <h1>About</h1>
            },
            {
                path: "/search",
                element: <SearchResults />
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <PrivateRoute> <CheckOut /> </PrivateRoute> 
            },
            {
                path: "/books/:id",
                element: <SingleBooks />
            },
        ]
    }
]);

export default router;