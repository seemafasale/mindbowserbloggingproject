
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-4 border-top">
      <p className="mb-0">&copy; {new Date().getFullYear()} My Blog App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

