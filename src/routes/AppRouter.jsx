import { createBrowserRouter } from "react-router-dom";
import Services from "../layouts/Services";
import Register from "../layouts/Register";
import Login from "../layouts/Login";

export const router = createBrowserRouter([
  { path: "/", element: <Services /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);