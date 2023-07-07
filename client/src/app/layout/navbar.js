"use client";
import React, { useContext } from "react";
import UserContext from "../../userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  const handleLogout = () => {
    setIsUserLoggedIn(false);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-8xl mx-auto px-5 py-2 flex justify-between items-center">
        <Link href="/">Book Store</Link>
        {isUserLoggedIn ? (
          <>
            <div className="px-5 py-2  flex justify-items: center">
              <Link href="/login" onClick={handleLogout()}>
                logout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="px-5 py-2  flex justify-items: center">
              <Link href="/login">Login</Link>
            </div>
            <div className="px-5 py-2 flex justify-items: start">
              <Link href="/register">Sign up</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
