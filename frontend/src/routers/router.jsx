import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";


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
            }
        ]
    }
]);

export default router;