import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import { ProtectedRoute } from "./ProtectedRoute";
import Confirmation from "../pages/Confirmation";
import Orders from "../pages/Orders";

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user",
        element: <ProtectedRoute />,
        children: [
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "confirmation",
            element: <Confirmation />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
