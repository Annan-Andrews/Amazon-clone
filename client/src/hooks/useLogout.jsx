import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../config/axiosInstance";
import { clearUser } from "../redux/userSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserAuth = useSelector((state) => state.user.isUserAuth);

  const handleLogout = async () => {
    if (!isUserAuth) {
      toast.error("No active session found!");
      return;
    }

    try {
      const response = await axiosInstance.get("/user/logout");

      if (response.status === 200) {
        toast.success("Logout successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 500);
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return handleLogout;
};

export default useLogout;
