import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { axiosInstance } from "../config/axiosInstance";
import { toast, Zoom } from "react-toastify";
import { CheckCircle } from "lucide-react";

const Confirmation = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const createOrder = async () => {
      // Check if cart is empty
      if (!cartItems || cartItems.length === 0) {
        toast.error("No items in cart to place order", {
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
        navigate("/cart");
        return;
      }

      try {
        setIsLoading(true);

        // Prepare order data
        const items = cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        }));

        const totalAmount = getTotalPrice();

        // Create order API call
        const response = await axiosInstance.post("/order/create-order", {
          items,
          totalAmount,
        });

        if (response.data.success) {
          setOrderData(response.data.data);
          setOrderId(response.data.data._id);
          
          // Clear cart after successful order
          clearCart();

          toast.success("Order placed successfully!", {
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
      } catch (error) {
        console.error("Order creation error:", error);
        toast.error(
          error.response?.data?.message || "Failed to place order. Please try again.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          }
        );
        // Redirect to checkout on error
        navigate("/checkout");
      } finally {
        setIsLoading(false);
      }
    };

    createOrder();
  }, []); // Run only once on mount

  const subtotal = orderData ? orderData.totalAmount : getTotalPrice();
  const totalItems = orderData
    ? orderData.items.reduce((sum, item) => sum + item.quantity, 0)
    : cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Placing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500">
              Order ID: <span className="font-medium">{orderId}</span>
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order Summary
          </h2>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {(orderData?.items || cartItems).map((item) => (
              <div
                key={item._id || item.productId}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-600">
                    Price: {formatPrice(item.price)}
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({totalItems} items):</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Order Total:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex-1 sm:flex-initial bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-center transition duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            to="/user/orders"
            className="flex-1 sm:flex-initial bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-8 rounded-lg text-center transition duration-200"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;