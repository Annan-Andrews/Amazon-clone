import React, { useState, useRef, useEffect } from "react";
import { MapPin, Search, ChevronDown, ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import AmazonLogo from "../assets/AmazonLogo.png";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

export const Navbar = () => {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const logout = useLogout();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };

    if (showAccountDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountDropdown]);

  return (
    <nav className="bg-amazon-blue text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-amazon-blue min-h-[60px]">
        {/* Left section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <Link to="/">
              <img src={AmazonLogo} alt="Amazon Logo" className="h-6 md:h-7" />
            </Link>
          </div>

          {/* Deliver to */}
          <div className="hidden md:flex items-center space-x-1 cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
            <MapPin size={20} className="text-white" />
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-gray-300">Deliver to</span>
              <span className="font-bold">Kerala 123456</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 max-w-3xl mx-auto">
          <div className="flex bg-white rounded-md overflow-hidden w-full">
            <div className="hidden md:flex items-center bg-gray-100 px-3 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-800 text-sm">All</span>
              <ChevronDown size={16} className="ml-1 text-gray-600" />
            </div>

            <input
              type="text"
              className="w-full px-3 md:px-4 py-2 text-gray-800 outline-none text-sm"
              placeholder="Search Amazon.in"
            />

            <button className="bg-amazon-yellow hover:bg-yellow-500 px-4 md:px-6 py-2 transition-colors">
              <Search size={20} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* Right section - Top links */}
        <div className="flex items-center space-x-2 md:space-x-4 text-sm">
          <div className="hidden md:flex items-center cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
            <img
              src="https://flagcdn.com/w20/in.png"
              alt="India flag"
              className="w-5 h-4 mr-1"
            />
            <span className="font-bold">EN</span>
            <ChevronDown size={14} className="ml-1" />
          </div>

          {/* Account & Lists Dropdown */}
          <div
            className="hidden md:block relative"
            ref={dropdownRef}
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
              {!isUserAuth ? (
                <Link to="/login">
                  <div className="flex items-center">
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="text-gray-300">Hello, sign in</span>
                      <span className="font-bold">Account & Lists</span>
                    </div>
                    <ChevronDown size={16} className="ml-1" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center">
                  <div className="flex flex-col text-xs leading-tight">
                    <span className="text-gray-300 font-semibold">
                      Hello, {userData?.name || "User"}
                    </span>
                    <span className="font-bold">Account & Lists</span>
                  </div>
                  <ChevronDown size={16} className="ml-1" />
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {showAccountDropdown && (
              <div className="absolute right-0 top-full mt-1 w-96 bg-white text-gray-900 shadow-2xl border border-gray-200 rounded-sm">
                {/* Arrow pointing up */}
                <div className="absolute -top-2 right-2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

                {/* Dropdown Content */}
                <div className="p-4">
                  {/* Sign In Section (Only for non-authenticated) */}
                  {!isUserAuth && (
                    <>
                      <Link to="/login">
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors mb-3">
                          Sign in
                        </button>
                      </Link>
                      <div className="text-sm text-center mb-4">
                        New customer?{" "}
                        <Link
                          to="/signup"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Start here.
                        </Link>
                      </div>
                      <div className="border-t border-gray-200 mb-4"></div>
                    </>
                  )}

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column - Your Lists */}
                    <div>
                      <h3 className="font-bold text-sm mb-2">Your Lists</h3>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <Link
                            to="/wishlist"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Create a Wish List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/wishlist"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Wish from Any Website
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/wishlist"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Baby Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/discover"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Discover Your Style
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/showroom"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Explore Showroom
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Right Column - Your Account */}
                    <div>
                      <h3 className="font-bold text-sm mb-2">Your Account</h3>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <Link
                            to="/profile"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Your Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/user/orders"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Your Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/wishlist"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Your Wish List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Keep Shopping
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/recommendations"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Your Recommendations
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/prime"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Your Prime membership
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/prime-video"
                            className="text-gray-700 hover:text-orange-600 hover:underline"
                          >
                            Your Prime Video
                          </Link>
                        </li>
                        {/* Logout (Only for authenticated users) */}
                        {isUserAuth && (
                          <li className="mt-2 pt-2 border-t border-gray-200">
                            <button
                              onClick={logout}
                              className="text-gray-700 hover:text-orange-600 hover:underline"
                            >
                              Log Out
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
            <Link to="/user/orders" className="flex flex-col text-xs leading-tight">
              <span className="text-gray-300">Returns</span>
              <span className="font-bold">& Orders</span>
            </Link>
          </div>

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="flex items-center cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors relative"
          >
            <div className="relative">
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span className="font-bold ml-1 hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Categories bar (desktop) */}
      <div className="hidden md:flex items-center px-4 py-2 space-x-4 text-sm bg-amazon-dark">
        <div className="flex items-center cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          <Menu size={18} className="mr-1" />
          <span className="font-bold">All</span>
        </div>

        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Best Sellers
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Today's Deals
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Mobiles
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Customer Service
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Electronics
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Prime
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Fashion
        </div>
        <div className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
          Home & Kitchen
        </div>
      </div>
    </nav>
  );
};
