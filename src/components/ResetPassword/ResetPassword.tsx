// components/ResetPassword/ResetPassword.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "../Button/Button";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validatePassword } from "@/helpers/validation";

const MySwal = withReactContent(Swal);

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errors, setErrors] = useState({ password: "" });

  useEffect(() => {
    // Obtener el token de la URL
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setErrors({ password: validatePassword(newPassword) });
  }, [newPassword]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/user/reset-password`, {
        token,
        newPassword,
      });

      if (response.status === 200) {
        // Mostrar mensaje de éxito y redirigir al usuario a la página de inicio de sesión
        MySwal.fire({
          title: "¡Contraseña restablecida!",
          text: response.data.message,
          icon: "success",
        });
        setNewPassword("");
        setToken("");
        router.push("/login");
      } else {
        // Mostrar mensaje de error
        MySwal.fire({
          title: "¡Error!",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      // Manejar errores de red
      MySwal.fire({
        title: "¡Error!",
        text: "Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-[300px]">
        <form onSubmit={handleResetPassword}>
          <label htmlFor="newPassword" className="mt-2">
            Nueva Contraseña
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
          {errors.password && (
            <p className="text-blue-400 text-sm mt-1">{errors.password}.</p>
          )}
          <Button
            type="submit"
            className="mt-4"
            disabled={!!errors.password || newPassword === ""}
          >
            Restablecer contraseña
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
