"use client";
import Link from "next/link";
import style from "./Navbar.module.css";
import UserWidget from "../UserWidget/UserWidget";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import imgLogo from "@/assets/DevNavigator.png";
import { AuthContext } from "@/contexts/authContext";
// import NotificationBell from "../Widget/NotificationBell";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
 
  const toggleNavbar = (): void => {
    setIsClick(!isClick);
  };

  const closeNavbar = (): void => {
    setIsClick(false);
  };
 
  return (
    <nav className={style.nav}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-evenly h-auto">
          <div className="flex items-center me-28">
            <div className="flex-shrink-0">
              <Link href="/" className="text-3xl font-bold text-start">
                <Image src={imgLogo} alt={""} width={150} />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link
                href="/"
                className="hover:bg-secondary hover:text-white rounded-lg p-2"
              >
                INICIO
              </Link>
              <Link
                href="/courses"
                className="hover:bg-secondary hover:text-white rounded-lg p-2"
              >
                CURSOS IT
              </Link>
              <Link
                href="/about"
                className="hover:bg-secondary hover:text-white rounded-lg p-2"
              >
                SOBRE NOSOTROS
              </Link>
              <div>
                <UserWidget />
              </div>
              
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isClick && (
        <div className="md:hidden">
          <div className="text-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="mt-1 hover:bg-secondary hover:text-white block rounded-lg text-base font-medium bg-primary p-2"
              onClick={closeNavbar}
            >
              INICIO
            </Link>
            <Link
              href="/courses"
              className="hover:bg-secondary hover:text-white block rounded-lg text-base font-medium bg-primary p-2"
              onClick={closeNavbar}
            >
              CURSOS
            </Link>
            <Link
              href="/about"
              className="hover:bg-secondary hover:text-white block rounded-lg text-base font-medium bg-primary p-2"
              onClick={closeNavbar}
            >
              SOBRE NOSOTROS
            </Link>

            <div onClick={closeNavbar}>
              <UserWidget />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
