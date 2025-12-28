import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: url,
      });
      console.log("Fetch response==", response);
      setData(response?.data?.data || []);
      setIsloading(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred");
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return [data, isLoading, error];
};
