import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { ToastContainer, Zoom } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUser, clearUser } from "../redux/userSlice";
import { useEffect } from "react";

export const UserLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const hideNavbarFooter = [ "/user/checkout" ];

  const shouldShowNavbarFooter = !hideNavbarFooter.includes(location.pathname);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });

      console.log("check-user response ====", response);

      dispatch(saveUser(response?.data?.data));
    } catch (error) {
      dispatch(clearUser());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
      {shouldShowNavbarFooter && <Navbar />}
      <ScrollToTop />
      <div className="grow pb-20">
        <Outlet />
      </div>
      {shouldShowNavbarFooter && <Footer />}
    </div>
  );
};
