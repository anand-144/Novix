import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import {Login, Register} from "../components";
import Cart from "../pages/home/books/Cart";


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
                element: <h1>Orders</h1>
            },
            {
                path: "/about",
                element: <h1>About</h1>
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
            }
        ]
    }
]);

export default router;