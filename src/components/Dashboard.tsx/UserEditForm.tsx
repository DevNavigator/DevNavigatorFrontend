"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../Button/Button";

const UserEditForm = ({ userId, token, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    currentPassword: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("ID de usuario no válido.");
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
          password: "",
          currentPassword: "",
        });
        setOriginalData({ name, email, address, phone });
      } catch (err) {
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
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

    const dataToSend = {};
    if (formData.name && formData.name !== originalData.name) {
      dataToSend.name = formData.name;
    }
    if (formData.email && formData.email !== originalData.email) {
      dataToSend.email = formData.email;
    }
    if (formData.address && formData.address !== originalData.address) {
      dataToSend.address = formData.address;
    }
    if (formData.phone && formData.phone !== originalData.phone) {
      dataToSend.phone = formData.phone;
    }
    if (formData.password) {
      if (!formData.currentPassword) {
        setError(
          "La contraseña actual es obligatoria para actualizar la información."
        );
        return;
      }
      dataToSend.password = formData.password;
      dataToSend.currentPassword = formData.currentPassword;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3001/user/userupdate/${userId}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuario actualizado:", response.data);

      // Mostrar mensaje de éxito
      await Swal.fire({
        title: "¡Actualizado!",
        text: "El usuario se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      closeModal(); // Cerrar el modal después de actualizar
    } catch (error) {
      if (error.response) {
        console.error("Error al actualizar el usuario:", error.response.data);
        setError(
          "Error al actualizar el usuario: " + error.response.data.message
        );
      } else {
        console.error("Error:", error.message);
        setError("Error de conexión");
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="password">
          Nueva Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
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
