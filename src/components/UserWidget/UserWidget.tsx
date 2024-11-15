"use client";

import { AuthContext } from "@/contexts/authContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { CartContext } from "@/contexts/CartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSession } from "next-auth/react";

const MySwal = withReactContent(Swal);

const UserWidget = () => {
  const { user, userExternal, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { data: session } = useSession();

  let isUserExternal = userExternal?.user ? true : false;

  const isUserSubscribed =
    (isUserExternal
      ? userExternal?.user?.Subscription?.status_sub
      : user?.user?.Subscription?.status_sub) === true;

  if (user?.success || session?.user) {
    return (
      <div className="flex justify-center items-center gap-4 ">
        <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
          <Link href="/dashboard">
            <FaUserCheck />
          </Link>
        </div>
        <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
          <Link href="/study">
            <FaUserGraduate />
          </Link>
        </div>
        {!isUserSubscribed ? (
          <div className=" relative hover:bg-secondary hover:text-white rounded-lg p-2">
            <Link href="/cart">
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className=" absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        ) : (
          <></>
        )}
        <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
          <button
            // onClick={logout}
            onClick={logout}
          >
            <Link href="/">
              <FaSignInAlt />
            </Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-4 ">
      <Link href="/login">
        <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
          <FaRegUser />
        </div>
      </Link>
    </div>
  );
};

export default UserWidget;
