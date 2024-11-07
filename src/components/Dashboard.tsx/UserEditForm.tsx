"use client";
import { UserData } from "@/interfaces/userData";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../Button/Button";

interface UserEditFormProps {
  userId: string;
  token: string | undefined;
  closeModal: () => void;
}

const UserEditForm = ({ userId, token, closeModal }: UserEditFormProps) => {
  console.log("TOKEN 1", token);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    statusUser: true,
  });
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    statusUser: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("ID de usuario no válido.");
      return;
    }
    if (!token) {
      console.error("Token invalido");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { name, email, address, phone } = response.data;

        setFormData({
          name,
          email,
          address,
          phone,
          statusUser: true,
        });
        setOriginalData({ name, email, address, phone, statusUser: true });
      } catch (err) {
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cambiar los datos del usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar!",
      cancelButtonText: "No, cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    const userData: Partial<UserData> = {}; // Cambia a Partial para evitar errores de propiedades faltantes

    if (formData.name && formData.name !== originalData.name) {
      userData.name = formData.name;
    }
    if (formData.email && formData.email !== originalData.email) {
      userData.email = formData.email;
    }
    if (formData.address && formData.address !== originalData.address) {
      userData.address = formData.address;
    }
    if (formData.phone && formData.phone !== originalData.phone) {
      userData.phone = formData.phone;
    }

    try {
      console.log("USERDATA", userData);
      console.log("TOKEN", token);
      const response = await axios.patch(
        `http://localhost:3001/user/update/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Mostrar mensaje de éxito
      await Swal.fire({
        title: "¡Actualizado!",
        text: "El usuario se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      closeModal(); // Cerrar el modal después de actualizar
    } catch (error: any) {
      if (error.response) {
        console.log(error);

        await Swal.fire({
          title: "¡Error!",
          text: "Error al actualizar el usuario, intentalo nuevamente",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error:", error.message);
        setError("Error de conexión");
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="address">
          Dirección
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="phone">
          Teléfono
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="text-center">
        <Button type="submit">Guardar Cambios</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default UserEditForm;
