"use client";

import { ICourse } from "@/interfaces/Icourse";
import { AuthContext } from "@/contexts/authContext";
import { CartContext } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Button from "../Button/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSession } from "next-auth/react";

const MySwal = withReactContent(Swal);

interface BuyButtonProps {
  course: ICourse;
}

const BuyButton = ({ course }: BuyButtonProps) => {
  const { user } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Espera a que se cargue la sesión
    if (status === "loading") return;

    // Verifica si el usuario está autenticado
    if (user || session?.user) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [user, session, status, router]);

  const handleBuy = () => {
    if (loading) return; // Evita la ejecución si está cargando

    if (!cart.some((p: ICourse) => p.id === course.id)) {
      addToCart(course);
      MySwal.fire({
        title: `${course.title} añadido a su carrito`,
        icon: "success",
        confirmButtonText: "Aceptar",
        backdrop: true,
        toast: true,
        position: "center",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/cart");
        }
      });
    } else {
      MySwal.fire({
        title: `${course.title} ya está en su carrito`,
        icon: "warning",
        confirmButtonText: "Aceptar",
        backdrop: true,
        toast: true,
        position: "center",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/courses");
        }
      });
    }
  };

  // Muestra un loading mientras se verifica la sesión
  if (loading) {
    return <div>Cargando...</div>; // O algún spinner de carga
  }

  return <Button onClick={handleBuy}>Suscribirse</Button>;
};

export default BuyButton;
