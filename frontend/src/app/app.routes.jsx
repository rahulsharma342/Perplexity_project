import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path:"/login",
        element: <h1>Login</h1>
    },
    {
        path:"/register",
        element: <h1>Register</h1>
    },
    {
        path: "/",
        element: <h1>Home</h1>
    },

])