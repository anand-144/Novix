import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import {Login, Register} from "../components";
import Cart from "../pages/books/Cart";
import CheckOut from "../pages/books/CheckOut";
import SingleBooks from "../pages/books/SingleBooks";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/books/OrderPage"
import SearchResults from "../components/SearchResults";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBook/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import SingleNews from "../pages/news/SingleNews";
import AddNews from "../pages/dashboard/addNews/AddNews";
import EditNews from "../pages/dashboard/editNews/EditNews";
import ManageNews from "../pages/dashboard/manageNews/ManageNews";


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
            {
                path: "/news/:id",
                element: <SingleNews />
            },
        ]
    },

    {
        path: "/admin",
        element: <AdminLogin />,
    },

    {
        path: "/dashboard",
        element: <AdminRoute>
            <DashboardLayout />
        </AdminRoute>,
        children:[
            {
                path : "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddBook /></AdminRoute>   
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><div><UpdateBook /></div> </AdminRoute>  
            },
            {
                path: "manage-books",
                element:<AdminRoute> <ManageBooks /> </AdminRoute>  
            },
            {
                path: "add-news",
                element:<AdminRoute> <AddNews /> </AdminRoute>  
            },
            {
                path: "edit-news/:id",
                element:<AdminRoute> <EditNews /> </AdminRoute>  
            },
            {
                path: "manage-news",
                element:<AdminRoute> <ManageNews /> </AdminRoute>  
            },
        ]
    }
]);

export default router;