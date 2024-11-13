"use client";
import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../Button/Button";
import { AuthContext } from "@/contexts/authContext";

interface ChangePasswordFormProps {
  token: string | undefined;
  closeModal: () => void;
}

const ChangePasswordForm = ({ token, closeModal }: ChangePasswordFormProps) => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    const id = user?.user?.id;
    if (!id) {
      console.error("Id no existe");
      return;
    }
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await axios.patch(
        `${url}/user/changePassword/${user?.user?.id}`, 
        {
          currentPassword: formData.currentPassword,
          password: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Swal.fire({
        title: "¡Éxito!",
        text: "La contraseña ha sido cambiada correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      closeModal(); // Cerrar el modal después de cambiar la contraseña
    } catch (error: any) {
      if (error.response) {
        await Swal.fire({
          title: "¡Error!",
          text: "Error al cambiar la contraseña, verifica tus datos e intenta de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error:", error.message);
        setError("Error de conexión");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="currentPassword">
          Contraseña Actual
        </label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="newPassword">
          Nueva Contraseña
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="confirmPassword">
          Confirmar Nueva Contraseña
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="text-center">
        <Button type="submit">Cambiar Contraseña</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ChangePasswordForm;
