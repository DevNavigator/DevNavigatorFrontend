'use client';

import { IProduct } from '@/interfaces/Iproduct';
import { AuthContext } from '@/contexts/authContext';
import { CartContext } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Button from '../Button/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface BuyButtonProps {
  product: IProduct;
}

const BuyButton = ({ product }: BuyButtonProps) => {
  const { user } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);
  const router = useRouter();

  const handleBuy = () => {
    if (!user?.login) {
      router.push('/login');
    } else {
      if (!cart.some((p: IProduct) => p.id === product.id)) {
        addToCart(product);
        // alert(`${product.name} added to your cart`);
        MySwal.fire({
          title: `${product.name} añadido a su carrito`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          backdrop: true,
          toast: true,
          position: 'center',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/products');
          }
        });
      } else {
        // alert(`${product.name} is already in your cart`);
        MySwal.fire({
          title: `${product.name} ya está en su carrito`,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          backdrop: true,
          toast: true,
          position: 'center',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/products');
          }
        }); 
      }
    }
  };
  return <Button onClick={handleBuy}>Comprar</Button>;
};

export default BuyButton;
