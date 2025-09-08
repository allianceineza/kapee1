// Footer.tsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaFlickr, FaRss, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-12 pb-6">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Info */}
        <div>
          <h2 className=" text-2xl font-bold mb-2">kapee.</h2>
          <p className="text-2xl  mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
          <ul className="space-y-2 text-sm">
            <li className=" text-2xl flex items-center gap-2">
              <span className=" text-2xl material-icons">home</span> Lorem Ipsum, 2046 Lorem Ipsum
            </li>
            <li className=" text-2xl flex items-center gap-2">
              <span className="text-2xl material-icons">phone</span> 576-245-2478
            </li>
            <li className="text-2xl flex items-center gap-2">
              <span className="text-2xl material-icons">email</span> info@kapee.com
            </li>
            <li className="text-2xl flex items-center gap-2">
              <span className="text-2xl material-icons">schedule</span> Mon - Fri / 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">INFORMATION</h3>
          <ul className="text-2xl space-y-2 ">
            <li>About Us</li>
            <li>Store Location</li>
            <li>Contact Us</li>
            <li>Shipping & Delivery</li>
            <li>Latest News</li>
            <li>Our Sitemap</li>
          </ul>
        </div>

        {/* Our Service */}
        <div>
          <h3 className="font-semibold mb-4">OUR SERVICE</h3>
          <ul className="text-2xl  space-y-2 ">
            <li>Privacy Policy</li>
            <li>Terms of Sale</li>
            <li>Customer Service</li>
            <li>Delivery Information</li>
            <li>Payments</li>
            <li>Saved Cards</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">NEWSLETTER</h3>
          <p className="text-2xl  mb-2">Subscribe to our mailing list to get the new updates!</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="border border-gray-300 rounded-l px-3 py-2 text-sm w-full"
            />
            <button className="bg-gray-900 text-yellow-500 px-4 py-2 rounded-r font-semibold text-sm">
              SIGN UP
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <FaFacebookF className="w-6 h-6 bg-blue-700 text-white p-1 rounded-sm" />
            <FaTwitter className="w-6 h-6 bg-black text-white p-1 rounded-sm" />
            <FaLinkedinIn className="w-6 h-6 bg-blue-500 text-white p-1 rounded-sm" />
            <FaInstagram className="w-6 h-6 bg-pink-500 text-white p-1 rounded-sm" />
            <FaFlickr className="w-6 h-6 bg-pink-400 text-white p-1 rounded-sm" />
            <FaRss className="w-6 h-6 bg-orange-500 text-white p-1 rounded-sm" />
            <FaYoutube className="w-6 h-6 bg-red-600 text-white p-1 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
        <span>Kapee © 2025 by PressLayouts All Rights Reserved.</span>
        <div className="flex gap-2 mt-2 md:mt-0">
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/paypal.png" alt="PayPal" className="h-6" />
          <img src="/discover.png" alt="Discover" className="h-6" />
          <img src="/maestro.png" alt="Maestro" className="h-6" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          <img src="/amex.png" alt="Amex" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
