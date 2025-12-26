import React from "react";
import { MapPin, Search, ChevronDown, ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import AmazonLogo from "../assets/AmazonLogo.png"

export const Navbar = ({ cartCount = 0 }) => {
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

          <div className="hidden md:block cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-gray-300">Hello, sign in</span>
              <span className="font-bold">Account & Lists</span>
            </div>
          </div>

          <div className="hidden md:block cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors">
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-gray-300">Returns</span>
              <span className="font-bold">& Orders</span>
            </div>
          </div>

          {/* Cart with badge */}
          <div className="flex items-center cursor-pointer hover:border hover:border-white px-2 py-1 rounded transition-colors relative">
            <div className="relative">
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span className="font-bold ml-1 hidden md:inline">Cart</span>
          </div>
        </div>
      </div>

      {/* Bottom bar - Search and Categories */}

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
