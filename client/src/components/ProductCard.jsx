import { Link } from "react-router-dom";
import { memo, useMemo } from "react";

const ProductCard = memo(({ product }) => {
  // Function to render star ratings
  // Memoize star rendering function
  const renderStars = useMemo(() => {
    return (rating) => {
      if (!rating && rating !== 0) return null;

      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      const uniqueId = `star-${product._id}`; // Unique ID per product

      return (
        <div className="flex items-center gap-1">
          {/* Full stars */}
          {[...Array(fullStars)].map((_, i) => (
            <svg
              key={`full-${i}`}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}

          {/* Half star */}
          {hasHalfStar && (
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`half-star-${uniqueId}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#half-star-${uniqueId})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          )}

          {/* Empty stars */}
          {[...Array(emptyStars)].map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-4 h-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}

          <span className="ml-1 text-sm text-gray-600">{rating}</span>
        </div>
      );
    };
  }, [product._id]);

  // Memoize formatted price
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(product.price || 0);
  }, [product.price]);

  // Memoize stars element
  const starsElement = useMemo(() => {
    return renderStars(product.rating || 0);
  }, [product.rating, renderStars]);

  return (
    <Link
      to={`/product/${product._id}`}
      className="block rounded-lg p-4 shadow-md shadow-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="overflow-hidden rounded-md">
        <img
          alt={product.name}
          src={product.image}
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105 will-change-transform"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {formattedPrice}
          </div>
        </div>

        <div className="mt-2">{starsElement}</div>
      </div>
    </Link>
  );
});

export default ProductCard;
