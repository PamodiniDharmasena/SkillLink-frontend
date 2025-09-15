import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8 mb-1">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Contact Information */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm">Email: support@example.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Links */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Links</h4>
          <ul className="text-sm">
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
              <i className="fab fa-facebook-f fa-lg"></i>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <i className="fab fa-twitter fa-lg"></i>
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
              <i className="fab fa-instagram fa-lg"></i>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
              <i className="fab fa-linkedin-in fa-lg"></i>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
