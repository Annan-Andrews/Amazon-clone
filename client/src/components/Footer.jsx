// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import AmazonLogo from "../assets/AmazonLogo.png";

const Footer = () => {
  return (
    <footer className="bg-amazon-dark text-white">
      {/* Back to top */}
      <div className="bg-amazon-scroll-to-top py-2 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Back to top
        </button>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Get to know Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get to know Us</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
            <ul className="space-y-3">
              <li>
                <button className="flex items-center text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  <Facebook size={18} className="mr-2" />
                  Facebook
                </button>
              </li>
              <li>
                <button className="flex items-center text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  <Twitter size={18} className="mr-2" />
                  Twitter
                </button>
              </li>
              <li>
                <button className="flex items-center text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  <Instagram size={18} className="mr-2" />
                  Instagram
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Let Us Help You */}
          <div>
            <h3 className="text-lg font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  Your Account
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  Cart
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white hover:underline text-sm transition-colors">
                  Help
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo and language selector */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link to="/" className="mb-4 md:mb-0">
              <img src={AmazonLogo} alt="Amazon Logo" className="h-6 md:h-7" />
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-gray-500 rounded-md px-3 py-1 hover:border-white transition-colors cursor-pointer">
                <img 
                  src="https://flagcdn.com/w20/in.png" 
                  alt="India flag" 
                  className="w-5 h-4 mr-2"
                />
                <span className="text-sm">English</span>
                <span className="ml-2 text-xs text-gray-400">IN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-amazon-blue py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-sm text-gray-400">
            <p>© 1996-2025, Amazon.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;