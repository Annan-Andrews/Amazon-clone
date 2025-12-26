import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/Home";



export const router  = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      }
    ]
  }
])