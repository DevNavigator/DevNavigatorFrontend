"use client";

import Button from "@/components/Button/Button";
import { AuthContext } from "@/contexts/authContext";
import { CartContext } from "@/contexts/CartContext";
// import { IOrderSuscription } from '@/interfaces/Iforms';
import { ICourse } from "@/interfaces/Icourse";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaDollarSign,
  FaRegTrashCan,
} from "react-icons/fa6";
import styles from "./Cart.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSession, signOut } from "next-auth/react";
import { fetchSubscriptionTypes } from "@/services/subsService";
import { purchaseCourse } from "@/components/MercadoPago/mercadopago";

const MySwal = withReactContent(Swal);

const Page = () => {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);

  const { user, userExternal, setUser } = useContext(AuthContext);
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  // Redirige a la página de inicio de sesión si el usuario no está autenticado
  // useEffect(() => {
  //   if (!user || (!session?.user || session?.user === null)) {
  //     router.push('/login');
  //   }
  // }, [user, router]);

  useEffect(() => {
    if (!user && !userExternal) {
      router.push("/login");
    }
  }, [user, userExternal, router]);

  useEffect(() => {
    if (user || userExternal) {
      setLoading(false);
    }
  }, [user, userExternal]);

  if (loading) {
    return <div>Cargando...</div>; // O algún spinner de carga
  }

  // useEffect(() => {
  //   if (!user || !session?.user) {
  //     router.push('/login');
  //   }
  // }, [user, router, session]);

  const handleRemove = (productId: string, productName: string) => {
    MySwal.fire({
      title: `¿Estás seguro que quieres eliminar ${productName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      backdrop: true,
      toast: true,
      position: "center",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId, productName);
      }
    });
  };

  const handleClearCart = () => {
    MySwal.fire({
      title: `¿Estás seguro que quieres vaciar el carrito?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      backdrop: true,
      toast: true,
      position: "center",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  };

  const handleOrderMercadopago = async () => {
    const suscription = await fetchSubscriptionTypes();
    const course = cart[0];
    let userId = null; // si es una unica suscripcion cart no deberia ser un array

    if (user?.user?.id) {
      userId = user?.user?.id;
    } else {
      userId = userExternal?.user?.id;
    }

    if (!userId) {
      console.error("Usuario no autenticado");
      return;
    }
    const url = await purchaseCourse(userId, suscription, course);
    router.push(url);
  };

  const handleOrder = async () => {
    /* const userId = user?.user?.id;
    const url = `http://localhost:3001/subscriptions/${userId}`; */
    // console.log(user?.token);

    // Preguntar al usuario si desea confirmar la suscripción
    const result = await MySwal.fire({
      title: "¿Deseas abonar la suscripción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      backdrop: true,
      toast: false, // Cambiado a false para que no sea un toast
      position: "center",
    });

    // Si el usuario confirma, proceder con la solicitud de suscripción
    if (result.isConfirmed) {
      handleOrderMercadopago();
      clearCart();
    }
  };

  // const handleOrder = () => {
  //   const userId = user?.user.id;
  //   const url = `http://localhost:3001/subscriptions/${userId}`;
  //   console.log(user?.token);

  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${user?.token}`,
  //     },
  //     body: JSON.stringify({
  //       userId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       const subscriptionId = json.status_sub;
  //       console.log(subscriptionId);

  //       // Actualiza el estado del usuario con la nueva suscripción
  //       if (subscriptionId) {
  //         setUser({
  //           ...user,
  //           user: {
  //             ...user?.user,
  //             Subscription: {
  //               id: json.id,
  //               start_sub: json.start_sub,
  //               end_sub: json.end_sub,
  //               status_sub: json.status_sub,
  //             },
  //           },
  //         });
  //       }
  //       MySwal.fire({
  //         title: '¡Te has suscripto con éxito!',
  //         icon: 'success',
  //         confirmButtonText: 'Aceptar',
  //         backdrop: true,
  //         toast: true,
  //         position: 'center',
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error placing order:', error);
  //       MySwal.fire({
  //         title:
  //           'Se ha producido un error al realizar el pedido. Por favor, inténtelo de nuevo.',
  //         icon: 'error',
  //         confirmButtonText: 'Aceptar',
  //         backdrop: true,
  //         toast: true,
  //         position: 'center',
  //       });
  //     });
  // };

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="max-w-4xl mt-16 mb-16 mx-auto bg-primary rounded-xl shadow-lg overflow-hidden ">
        <div className="bg-primary p-6 text-secondary flex items-center justify-center">
          <h1 className="text-3xl font-bold text-secondary text-center">
            Suscríbete a Dev {"</>"} Navigator
          </h1>
          {/* <p>{session?.user?.name ?? 'Unknown'}</p>
          <p>{session?.user?.email ?? 'Unknown'}</p>
          <img
            src={session?.user?.image ?? ''}
            alt=""
          /> */}

          {/* <FaShoppingCart className="text-3xl" /> */}
        </div>
        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center text-secondary py-8">
              <FaShoppingCart className="mx-auto mb-4 text-5xl" />
              <p className="text-xl">No hay cursos en el carrito</p>
              <Button onClick={() => router.push("/courses")} className="mt-4">
                Ir a cursos
              </Button>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {cart.map((course: ICourse) => (
                <div
                  key={course.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center">
                    <FaShoppingBag className="text-3xl mr-4" />
                    <span className="text-lg text-secondary font-medium">
                      Suscribite para iniciar el curso {course.title}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Button
                      // onClick={() => handleRemove(course.id, course.title)}
                      className={styles.buttonClearUnit}
                      aria-label={`Remove ${course.title} from cart`}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between">
                {/* <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                  <div className="flex items-center mr-8 mb-2 sm:mb-0">
                    <FaShoppingBag className="text-3xl mr-4" />
                    <span className="font-bold text-secondary">
                      Cantidad de Productos:{' '}
                      <span className="text-secondary/70 font-medium">
                        {cart.length}
                      </span>
                    </span>
                  </div>
                </div> */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleOrder}
                    disabled={cart.length === 0}
                    className={styles.buttonFinish}
                  >
                    <FaCircleCheck className="text-lg mr-2" />
                    Abonar Suscripcion
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
