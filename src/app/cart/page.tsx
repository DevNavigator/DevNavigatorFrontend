'use client';

import Button from '@/components/Button/Button';
import { AuthContext } from '@/contexts/authContext';
import { CartContext } from '@/contexts/CartContext';
import { IOrder } from '@/interfaces/Iforms';
import { IProduct } from '@/interfaces/Iproduct';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import {
  FaCircleCheck,
  FaCircleXmark,
  FaDollarSign,
  FaRegTrashCan,
} from 'react-icons/fa6';
import styles from './Cart.module.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Page = () => {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  // Redirige a la página de inicio de sesión si el usuario no está autenticado
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const handleRemove = (productId: number, ProducName: string) => {
      MySwal.fire({
        title: `Estas seguro que quieres eliminar ${ProducName}? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        backdrop: true,
        toast: true,
        position: 'center',
      }).then((result) => {
        if (result.isConfirmed) {
          removeFromCart(productId, ProducName);
        }
      });
    
  };
  const handleClearCart = () => {
     MySwal.fire({
       title: `Estas seguro que quieres vaciar el carrito? `,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Aceptar',
       cancelButtonText: 'Cancelar',
       backdrop: true,
       toast: true,
       position: 'center',
     }).then((result) => {
       if (result.isConfirmed) {
         clearCart();         
       }
     });
  };

  const handleOrder = () => {
    const url =
      process.env.NEXT_PUBLIC_API_URL + '/orders' ||
      'http://localhost:3001/orders';
    const products = cart.map((product: IProduct) => product.id);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user?.token as string,
      },
      body: JSON.stringify({
        userId: user?.user.userId,
        products: products,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        clearCart();
        const userWithNewOrder = user;
        userWithNewOrder?.user.orders?.push({
          id: json.id,
          date: json.date,
        } as IOrder);
        //     alert('Success!!');
       // alert('Order placed successfully!');
        MySwal.fire({
          title: '¡Pedido realizado con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          backdrop: true,
          toast: true,
          position: 'center',
        });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
       //alert('There was an error placing your order. Please try again.');
          MySwal.fire({
            title:
              'Se ha producido un error al realizar el pedido. Por favor, inténtelo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            backdrop: true,
            toast: true,
            position: 'center',
          });
      });
  };
  return (
    <div
      className="container"
      style={{ marginTop: '5rem' }}
    >
      <div className="max-w-4xl mt-16 mb-16 mx-auto bg-primary rounded-xl shadow-lg overflow-hidden ">
        <div className="bg-primary p-6 text-secondary flex items-center justify-between">
          <h1 className="text-3xl font-bold text-secondary">Carrito</h1>
          <FaShoppingCart className="text-3xl" />
        </div>
        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center text-secondary py-8">
              <FaShoppingCart className="mx-auto mb-4 text-5xl" />
              <p className="text-xl"> Tú carrito esta vacío</p>
              <Button
                onClick={() => router.push('/products')}
                className="mt-4"
              >
                Ir a la tienda
              </Button>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {cart.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center">
                    <FaShoppingBag className="text-3xl mr-4" />
                    <span className="text-lg text-secondary font-medium">
                      {product.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg text-secondary font-medium">
                      U$S {product.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => handleRemove(product.id, product.name)}
                      className={styles.buttonClearUnit}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </div>
                </div>
              ))}
              <div className=" bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                  <div className="flex items-center mr-8 mb-2 sm:mb-0">
                    <FaShoppingBag className="text-3xl mr-4" />
                    <span className="font-bold text-secondary">
                      Cantidad de Productos:{' '}
                      <span className="text-secondary/70 font-medium">
                        {cart.length}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-secondary mr-2 text-lg" />
                    <span className="text-lg text-secondary font-bold">
                      Precio Total:{' '}
                      <span className="text-secondary/70 font-medium">
                        {' '}
                        U$S
                        {totalPrice.toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={handleOrder}
                    disabled={cart.length === 0}
                    className={styles.buttonFinish}
                  >
                    <FaCircleCheck className="text-lg mr-2" />
                    Finalizar Orden
                  </Button>
                  <Button
                    className={styles.buttonClearCart}
                    onClick={handleClearCart}
                    disabled={cart.length === 0}
                  >
                    <FaCircleXmark className="text-lg mr-2" />
                    Limpiar Carrito
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
