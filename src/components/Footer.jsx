// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm space-y-2 md:space-y-0">
      <p className="text-center md:text-left">
        We value your privacy. We and our partners use trackers to measure the audience of our website and to provide you with offers and improve our own Tinder marketing operations.
        <span className="underline cursor-pointer ml-1">More info</span>.
      </p>
      <div className="flex gap-2">
        <button className="border border-gray-400 px-3 py-1 rounded-full hover:bg-gray-700">
          Personalize my choices
        </button>
        <button className="bg-white text-black px-3 py-1 rounded-full font-semibold hover:bg-gray-200">
          I accept
        </button>
        <button className="border border-gray-400 px-3 py-1 rounded-full hover:bg-gray-700">
          I decline
        </button>
      </div>
    </footer>
  );
};

export default Footer;
