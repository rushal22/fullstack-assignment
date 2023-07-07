'use client'
import React from 'react';
import Link from 'next/link';

const Navbar = ({ loggedIn, onLogout }) => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-8xl mx-auto px-5 py-2 flex justify-between items-center">
        <Link href="/">
          Book Store
        </Link>
        
        {/* <div>
          {loggedIn ? (
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
                Login
            </Link>
          )}
        </div> */}
        <div className="px-5 py-2  flex justify-items: center">
         <Link href = '/login'>Login</Link>
         </div>
         <div className="px-5 py-2 flex justify-items: start">
         <Link href='/register'>Sign up</Link>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;