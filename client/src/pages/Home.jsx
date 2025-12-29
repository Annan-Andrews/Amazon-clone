import React, { useMemo, useState } from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { Skeleton } from "../components/Skeleton";
import { ChevronDown } from "lucide-react";

export const Home = () => {
  const [productList, isLoading, error] = useFetch("/product/getAllProducts");
  const [priceSort, setPriceSort] = useState("");
  const [ratingFilter, setRatingFilter] = useState([]);

  // Memoize filtered and sorted product list
  const filteredProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];

    let filtered = [...productList];

    // Apply rating filter
    if (ratingFilter.length > 0) {
      filtered = filtered.filter((product) => {
        const rating = product.rating || 0;
        return ratingFilter.some((minRating) => rating >= minRating);
      });
    }

    // Apply price sort
    if (priceSort === "low-high") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (priceSort === "high-low") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return filtered;
  }, [productList, priceSort, ratingFilter]);

  // Handle rating filter toggle
  const handleRatingToggle = (rating) => {
    setRatingFilter((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  // Reset filters
  const handleResetFilters = () => {
    setPriceSort("");
    setRatingFilter([]);
  };

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
      <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 px-6">
        {/* Filters Sidebar */}
        <div className="hidden space-y-4 lg:block">
          {/* Sort By */}
          <p className="block text-xs font-medium text-gray-700 mb-2">
              Sort By
            </p>
          <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium">Sort By</span>
              <span className="transition group-open:-rotate-180">
                <ChevronDown className="size-4" />
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  {priceSort ? "1 Selected" : "0 Selected"}
                </span>
                {priceSort && (
                  <button
                    type="button"
                    onClick={() => setPriceSort("")}
                    className="text-sm text-gray-900 underline underline-offset-4 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="SortLowHigh"
                    className="inline-flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id="SortLowHigh"
                      name="priceSort"
                      value="low-high"
                      checked={priceSort === "low-high"}
                      onChange={(e) => setPriceSort(e.target.value)}
                      className="size-5 rounded-sm border-gray-300 shadow-sm text-amazon-blue focus:ring-amazon-blue"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Price: Low → High
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="SortHighLow"
                    className="inline-flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id="SortHighLow"
                      name="priceSort"
                      value="high-low"
                      checked={priceSort === "high-low"}
                      onChange={(e) => setPriceSort(e.target.value)}
                      className="size-5 rounded-sm border-gray-300 shadow-sm text-amazon-blue focus:ring-amazon-blue"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Price: High → Low
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>

          {/* Filters Section */}
          <div>
            <p className="block text-xs font-medium text-gray-700 mb-2">
              Filters
            </p>

            {/* Rating Filter */}
            <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium">Rating</span>
                <span className="transition group-open:-rotate-180">
                  <ChevronDown className="size-4" />
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">
                    {ratingFilter.length} Selected
                  </span>
                  {ratingFilter.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-sm text-gray-900 underline underline-offset-4 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    <label
                      htmlFor="FilterRating3"
                      className="inline-flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="FilterRating3"
                        checked={ratingFilter.includes(3)}
                        onChange={() => handleRatingToggle(3)}
                        className="size-5 rounded-sm border-gray-300 shadow-sm text-amazon-blue focus:ring-amazon-blue"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        3★ & above
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterRating4"
                      className="inline-flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="FilterRating4"
                        checked={ratingFilter.includes(4)}
                        onChange={() => handleRatingToggle(4)}
                        className="size-5 rounded-sm border-gray-300 shadow-sm text-amazon-blue focus:ring-amazon-blue"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        4★ & above
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center py-10">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
