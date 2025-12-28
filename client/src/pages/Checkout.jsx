import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AmazonLogo from "../assets/AmazonLogo.png";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCart();
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const [selectedPayment, setSelectedPayment] = useState("creditCard");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const shippingAddress = {
    name: userData?.name || "User",
    email: userData?.email || "User",
    city: "Kochi",
    state: "Kerala",
    zip: "123456",
  };

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18;
  const orderTotal = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleMakePayment = () => {
    // Validate cart has items
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
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
      return;
    }

    // Navigate to confirmation page
    navigate("/user/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Dark Blue */}
      <header className="bg-amazon-blue text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={AmazonLogo} alt="Amazon.in" className="h-8 w-auto" />
            </Link>
            <div className="text-sm font-medium">
              Checkout ({totalItems} {totalItems === 1 ? "item" : "items"})
            </div>

            {/* Account Dropdown Indicator */}
            <div
              className="relative"
              onMouseEnter={() => setShowAccountDropdown(true)}
              onMouseLeave={() => setShowAccountDropdown(false)}
            >
              <div className="flex items-center gap-1 px-2 py-1 rounded hover:border hover:border-white cursor-pointer">
                <span className="text-sm text-gray-300">
                  Hello, {isUserAuth ? userData?.name || "User" : "sign in"}
                </span>
                <ChevronDown size={16} />
              </div>

              {/* Account Dropdown (simplified for checkout header) */}
              {showAccountDropdown && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white text-gray-900 shadow-2xl border border-gray-200 rounded-sm z-50">
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  <div className="p-4">
                    {!isUserAuth ? (
                      <Link
                        to="/login"
                        className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md text-center mb-3"
                      >
                        Sign in
                      </Link>
                    ) : (
                      <div className="mb-3">
                        <div className="font-medium text-sm mb-2">Account</div>
                        <button
                          onClick={logout}
                          className="text-sm text-gray-700 hover:text-orange-600"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-6">
              <div className="flex items-start gap-4">
                {/* Step 1 */}
                <div className="flex-1">
                  <div className="text-sm font-bold text-green-600 mb-2">
                    1 Shipping address
                  </div>
                  <div className="p-4 bg-white border border-gray-300 rounded">
                    <div className="font-medium text-sm">
                      {shippingAddress.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {shippingAddress.address}
                    </div>
                    <div className="text-xs text-gray-600">
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.zip}
                    </div>
                    <Link
                      to="/address"
                      className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Change
                    </Link>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex-1">
                  <div className="text-sm font-bold mb-2">
                    2 Choose a payment method
                  </div>
                  <div className="p-4 bg-white border-2 border-green-500 rounded">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">
                        Payment Method
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-400 mb-2">
                    3 Review items and shipping
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white border border-gray-300 rounded p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Choose a payment method
              </h2>

              {/* Credit/Debit Card */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="creditCard"
                      name="payment"
                      checked={selectedPayment === "creditCard"}
                      onChange={() => setSelectedPayment("creditCard")}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400"
                    />
                    <label
                      htmlFor="creditCard"
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Add a credit or debit card
                    </label>
                  </div>
                  <span className="text-gray-400 text-sm">›</span>
                </div>
              </div>

              {/* Buy Now Pay Later */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      id="payLater"
                      name="payment"
                      checked={selectedPayment === "payLater"}
                      onChange={() => setSelectedPayment("payLater")}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 mt-1"
                    />
                    <div>
                      <label
                        htmlFor="payLater"
                        className="text-sm font-medium text-gray-900 cursor-pointer block"
                      >
                        Buy Now, Pay Later
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cash on Delivery */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      checked={selectedPayment === "cod"}
                      onChange={() => setSelectedPayment("cod")}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 mt-1"
                      disabled
                    />
                    <div>
                      <label
                        htmlFor="cod"
                        className="text-sm font-medium text-gray-900 cursor-not-allowed block"
                      >
                        Cash on Delivery (COD)
                      </label>
                      <p className="text-xs text-red-600 mt-1">
                        Cash on delivery is not available for this order. Why?
                        Please use another payment method to proceed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items and Shipping Section */}
            <div className="bg-white border border-gray-300 rounded p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Items and shipping
              </h2>

              <div className="space-y-3 mb-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <div className="text-xs text-gray-600 mt-1">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No items in cart</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/cart"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Change
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Yellow Highlight Box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                <button
                  onClick={handleMakePayment}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 rounded text-sm mb-2"
                >
                  Make Payment
                </button>
                <p className="text-xs text-gray-700">
                  Choose a payment method to continue checking out. You'll still
                  have a chance to review and edit your order before it's final.
                </p>
              </div>

              <div className="bg-white border border-gray-300 rounded p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order total:</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
