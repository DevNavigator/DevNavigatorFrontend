// app/pages/reset-password/[token].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button/Button";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Obtener el token de la URL}
    const { token } = router.query;
    if (token) {
      setToken(token as string);
    }
  }, [router.query]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/user/reset-password`, {
        token,
        newPassword,
      });

      if (response.data.success) {
        // Mostrar mensaje de éxito y redirigir al usuario a la página de inicio de sesión
        await MySwal.fire({
          title: "¡Contraseña restablecida!",
          text: response.data.message,
          icon: "success",
        });
        setNewPassword("");
        setToken("");
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
        text: "Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col w-[300px] mx-auto">
      <form onSubmit={handleResetPassword}>
        <label htmlFor="newPassword" className="mt-2">
          Nueva Contraseña token
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-b-2 border-secondary"
          placeholder="********"
          required
        />
        <Button type="submit" className="mt-4">
          Restablecer contraseña
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
