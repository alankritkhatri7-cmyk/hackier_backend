import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Hackier. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
