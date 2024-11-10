'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { ICourse } from '../interfaces/Icourse';
import { AuthContext } from './authContext';
  import Swal from 'sweetalert2';
  import withReactContent from 'sweetalert2-react-content';

  const MySwal = withReactContent(Swal);

interface CartContextProps {
  cart: ICourse[];
  addToCart: (product: ICourse) => void;
  removeFromCart: (productId: string, ProducName: string )  => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ICourse[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = (course: ICourse) => {
    const updatedCart = [...cart, course];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string, ProducName: string) => {
    MySwal.fire({
      title: 'Eliminado',
      text: `${ProducName} ha sido eliminado del carrito`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      backdrop: true,
      toast: true,
      position: 'center',
    });  
    //const updatedCart = cart.filter((course) => course.id !== productId);
    //setCart(updatedCart);
    //localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    //  MySwal.fire({
    //    title: 'Carrito vacio',
    //    text: 'Todos los productos han sido eliminados del carrito',
    //    icon: 'success',
    //    confirmButtonText: 'Aceptar',
    //    backdrop: true,
    //    toast: true,
    //    position: 'center',
    //  });  
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

