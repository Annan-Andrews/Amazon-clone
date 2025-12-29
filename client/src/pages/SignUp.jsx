import { Link, useLocation, useNavigate } from "react-router-dom";
import AmazonLogoBL from "../assets/AmazonLogoBL.png";
import { useForm } from "react-hook-form";
import { toast, Zoom } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";
import GoogleSignIn from "../components/GoogleSignIn";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const location = useLocation()

  // Watch password to compare with confirmPassword
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...requestData } = data;

      const response = await axiosInstance({
        method: "POST",
        url: "/user/signup",
        data: requestData,
      });

      if (response.status === 201) {
        toast.success("Account Created successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });

        setTimeout(() => {
          navigate(location.state?.from || "/");
        }, 500);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Link to="/">
            <img src={AmazonLogoBL} alt="Amazon.in" className="h-20" />
          </Link>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-lg border border-gray-300 p-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">
            Create Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Your name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="First and last name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Your Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="At least 6 characters"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Passwords must be at least 6 characters.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Verify password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Re-enter password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Terms and Conditions */}
          <p className="mt-4 text-xs text-gray-600">
            By creating an account or logging in, you agree to Amazon's{" "}
            <Link
              to="/#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link
              to="/#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Privacy Notice
            </Link>
            .
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Login Button */}
          {/* <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition duration-200"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Login with Google
          </button> */}

          <GoogleSignIn />

          {/* Already have account */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-900">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600 mb-4">
            <Link to="/#" className="hover:text-blue-600 hover:underline">
              Conditions of Use
            </Link>
            <Link to="/#" className="hover:text-blue-600 hover:underline">
              Privacy Notice
            </Link>
            <Link to="/#" className="hover:text-blue-600 hover:underline">
              Help
            </Link>
          </div>
          <p className="text-xs text-gray-600">© 1996-2025, Amazon.com</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
