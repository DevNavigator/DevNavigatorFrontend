// components/ResetPasswordForm/ResetPasswordForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // components/ResetPasswordForm/ResetPasswordForm.tsx
  const handleRequestToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(
        `${apiUrl}/user/request-password-reset`,
        {
          email,
        }
      );

      if (response.status === 200) {
        // Mostrar mensaje de éxito
        await MySwal.fire({
          title: "¡Se ha enviado correo de restablecimiento!",
          text: response.data.message,
          icon: "info",
        });

        // Redirigir al usuario a la página de inicio de sesión
        router.push("/login");
      } else {
        // Mostrar mensaje de error
        await MySwal.fire({
          title: "¡Error!",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      // Manejar errores de red
      await MySwal.fire({
        title: "¡Error!",
        text: "Hubo un problema al enviar la solicitud. Por favor, verifica el correo al cual estás intentando reestablecer la contraseña o inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col w-[300px] mx-auto">
      <form onSubmit={handleRequestToken}>
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 border-secondary"
          placeholder="email@email.com"
          required
        />
        <Button type="submit" className="mt-4">
          Solicitar restablecimiento
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
