'use client';

import { AuthContext } from '@/contexts/authContext';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '@/contexts/CartContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UserWidget = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  if (user?.login) {
    return (
      <div className="flex justify-center items-center gap-4 ">
        <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
          <Link href="/dashboard">
            <FaUserCheck />
          </Link>
        </div>
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
        <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
          <button onClick={logout}>
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
      <div className="hover:bg-secondary hover:text-white rounded-lg p-2">
        <Link href="/login">
          <FaRegUser />
        </Link>
      </div>
    </div>
  );
};

export default UserWidget;
