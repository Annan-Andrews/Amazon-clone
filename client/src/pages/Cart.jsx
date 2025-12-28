import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const navigate = useNavigate();
  const { isUserAuth } = useSelector((state) => state.user);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();

  const handleProceedToCheckout = () => {
    if (!isUserAuth) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Cart is empty
            </h2>
            <p className="text-gray-600 mb-8">Your shopping cart is waiting.</p>
            <Link
              to="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="shrink-0">
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-md hover:opacity-90 transition"
                          />
                        </Link>
                      </div>

                      {/* Product Info */}
                      <div className="grow">
                        <div className="flex flex-col md:flex-row md:items-start justify-between">
                          <div className="mb-4 md:mb-0">
                            <Link to={`/product/${item._id}`}>
                              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                                {item.name}
                              </h3>
                            </Link>

                            {/* Stock Status */}
                            <div className="mt-2">
                              <span className="text-green-600 text-sm font-medium">
                                In stock
                              </span>
                            </div>

                            {/* Delivery Date */}
                            <div className="text-sm text-gray-600 mt-1">
                              Delivery:{" "}
                              <span className="font-medium">
                                {"Wed, Jan 26"}
                              </span>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col items-end">
                            <div className="text-xl font-bold text-gray-900 mb-4">
                              {formatPrice(item.price)}
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center border border-gray-300 rounded">
                                <button
                                  onClick={() => decreaseQuantity(item._id)}
                                  className="px-3 py-1 hover:bg-gray-100"
                                  disabled={item.quantity <= 1}
                                >
                                  <span className="text-lg">−</span>
                                </button>
                                <span className="px-4 py-1 border-x border-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => increaseQuantity(item._id)}
                                  className="px-3 py-1 hover:bg-gray-100"
                                >
                                  <span className="text-lg">+</span>
                                </button>
                              </div>

                              {/* Delete Button */}
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                Item total:
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Subtotal for Mobile */}
              <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
                <div className="text-lg font-bold text-gray-900 mb-2">
                  Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""}):{" "}
                  {formatPrice(subtotal)}
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                    </span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Order Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Proceed to Buy Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg mb-4 transition duration-200"
                >
                  Proceed to Checkout ({totalItems} item
                  {totalItems !== 1 ? "s" : ""})
                </button>

                {/* Security Message */}
                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Safe and Secure Payments</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>Eligible for</span>
                    <span className="text-green-600 font-medium">
                      FREE delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-4">
                <Link
                  to="/"
                  className="block text-center text-blue-600 hover:text-blue-800 font-medium py-3 bg-white rounded-lg shadow-sm hover:shadow transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
