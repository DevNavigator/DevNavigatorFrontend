'use client';

import { ICourse } from '@/interfaces/Icourse';
import { AuthContext } from '@/contexts/authContext';
import { CartContext } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Button from '../Button/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface BuyButtonProps {
  course: ICourse;
}

const BuyButton = ({ course }: BuyButtonProps) => {
  const { user } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);
  const router = useRouter();

  const handleBuy: any = () => {
    if (!user?.success) {
      router.push('/login');
    } else {
      if (!cart.some((p: ICourse) => p.id === course.id)) {
        addToCart(course);
        // alert(`${product.name} added to your cart`);
        MySwal.fire({
          title: `${course.title} añadido a su carrito`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          backdrop: true,
          toast: true,
          position: 'center',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/courses');
          }
        });
      } else {
        // alert(`${product.name} is already in your cart`);
        MySwal.fire({
          title: `${course.title} ya está en su carrito`,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          backdrop: true,
          toast: true,
          position: 'center',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/courses');
          }
        });
      }
    }
  };
  return <Button onClick={handleBuy}>Suscribirse</Button>;
};

export default BuyButton;
