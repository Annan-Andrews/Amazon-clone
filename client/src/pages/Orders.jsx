import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Package, Truck, CheckCircle } from "lucide-react";
import { useFetch } from "../hooks/useFetch";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [timeFilter, setTimeFilter] = useState("3months");

  // Fetch orders from backend
  const [ordersData, isLoading, error] = useFetch("/order/get-orders");

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  const orders = ordersData?.map((order) => ({
    id: order._id,
    date: formatDate(order.createdAt),
    total: order.totalAmount,
    status: "Delivered",
    items: order.items.map((item) => ({
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      productId: item.productId?._id || item.productId,
    })),
  }));

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Link to="/" className="text-blue-600 hover:text-orange-600">
                Home
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Your Orders</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Link to="/" className="text-blue-600 hover:text-orange-600">
                Home
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">Your Orders</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="mb-4">
              <Package className="w-24 h-24 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Unable to load orders
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state for no orders
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="mb-6">
        <Package className="w-24 h-24 text-gray-300 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        0 orders placed 
      </h2>
      <p className="text-gray-600 mb-8">
        Looks like you haven't placed an order yet.
      </p>
      <Link
        to="/"
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-md"
      >
        Start Shopping
      </Link>
    </div>
  );

  // Order status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "processing":
        return <Package className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Link to="/" className="text-blue-600 hover:text-orange-600">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Your Orders</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-t-lg border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-4 font-medium text-sm border-b-2 ${
                activeTab === "orders"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-gray-200 border-t-0 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {orders.length} order{orders.length !== 1 ? "s" : ""} placed in
              </span>
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                >
                  <option value="3months">past 3 months</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="alltime">All time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search all orders"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-6 rounded-md">
                Search Orders
              </button>
            </div>
          </div>
        </div>

        {/* Orders List or Empty State */}
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg">
          {orders.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Order placed {order.date}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Order #{order.id}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span className="font-medium text-gray-900">
                              {order.status}
                            </span>
                            {order.status === "Delivered" && (
                              <span className="text-sm text-gray-600">
                                on {order.date}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">
                            Total
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-4 border border-gray-200 rounded-md"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <Link
                                to={`/product/${item.productId}`}
                                className="text-blue-600 hover:text-orange-600 hover:underline font-medium"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-gray-600 mt-1">
                                Quantity: {item.quantity}
                              </div>
                              <div className="text-sm text-gray-600">
                                Price: {formatPrice(item.price)}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium rounded-md">
                                Buy it again
                              </button>
                              <Link
                                to={`/product/${item.productId}`}
                                className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md text-center"
                              >
                                View item
                              </Link>
                              {order.status === "Delivered" && (
                                <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
                                  Write a product review
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap gap-3 mt-6">
                        <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
                          View order details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
                          Invoice
                        </button>
                        {order.status === "Delivered" && (
                          <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
                            Archive order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            renderEmptyState()
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Orders;