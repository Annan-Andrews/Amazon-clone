import React, { useMemo } from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { Skeleton } from "../components/Skeleton";

export const Home = () => {
  const [productList, isLoading, error] = useFetch("/product/getAllProducts");

  // Memoize product list to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => {
    return productList && productList.length > 0 ? productList : [];
  }, [productList]);

  if (isLoading) {
    return (
      <>
        <Carousel />
        <Skeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Carousel />
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Carousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-6">
        {memoizedProducts.length > 0 ? (
          memoizedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-10">No products found</p>
        )}
      </div>
    </>
  );
};
