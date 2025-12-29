import { useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

const GoogleSignIn = () => {
  const handleGoogleResponse = async (response) => {
    try {
      await axiosInstance.post("/user/auth/google", {
        credential: response.credential,
      });

      window.location.href = "/";
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed");
    }
  };

  useEffect(() => {
    /* global google */
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google-signin"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id="google-signin"></div>;
};

export default GoogleSignIn;
