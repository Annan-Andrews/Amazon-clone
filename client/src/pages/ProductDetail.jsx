import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, isLoading, error] = useFetch(
    `/product/getProduct/${productId}`
  );

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Optional: Show success message or navigate to cart
      // navigate('/cart');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [deliveryLocation, setDeliveryLocation] = useState("Kerala 123456");

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="half-star">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half-star)"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center items-center py-20">
            <p className="text-lg">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center items-center py-20">
            <p className="text-lg">Product not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="mx-auto ">
        {/* Main product section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Product Image */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Image */}
                <div className="md:col-span-1">
                  <div className="sticky top-8">
                    <div className="rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:col-span-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h1>

                  {/* Rating and reviews */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(product.rating)}
                      <span className="text-blue-600 font-medium">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {product.reviews.length} ratings
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Inclusive of all taxes
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-6"></div>

                  {/* Product Description */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Product Description
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Buy Box */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-green-600 font-medium mb-4">
                    Free delivery
                  </div>
                </div>

                {/* Delivery Location */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Delivery to</div>
                  <div className="flex items-center gap-2 p-3 bg-white border border-gray-300 rounded">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">{deliveryLocation}</span>
                    <button
                      onClick={() =>
                        setDeliveryLocation(
                          prompt("Enter your location:", deliveryLocation) ||
                            deliveryLocation
                        )
                      }
                      className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Quantity</div>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <div className="text-sm text-gray-500 mt-2">
                    Total: {formatPrice(totalPrice)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>7-day return policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Secure transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left - Overall Rating */}
            <div className="lg:col-span-1">
              <div className="text-center lg:text-left">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {product.rating}
                </div>
                <div className="flex justify-center lg:justify-start mb-4">
                  {renderStars(product.rating)}
                </div>
                <div className="text-gray-600">
                  Based on {product.reviews.length} reviews
                </div>
              </div>
            </div>

            {/* Right - Reviews List */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {review.user}
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
