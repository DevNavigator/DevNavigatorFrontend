"use client";

import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaCamera,
} from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import axios from "axios";
import UserEditForm from "./UserEditForm";
import Swal from "sweetalert2";

const Dashboard = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const [userType, setUserType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!user?.success) {
      router.push("/login");
    } else if (user.token) {
      const decodedToken = jwtDecode(user.token);
      setUserType(decodedToken.types);
    }
  }, [user, router]);

  const isAdmin = userType === "admin";
  const isSuperAdmin = userType === "superAdmin";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const url = "http://localhost:3001";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      try {
        const response = await axios.post(
          `${url}/files/imgprofile/${user?.user.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Imagen subida con éxito:", response.data);
          const updatedUserResponse = await axios.get(
            `${url}/user/${user?.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );

          const updatedUser = {
            ...user,
            user: {
              ...user.user,
              imgProfile:
                updatedUserResponse.data.imgProfile || user.user.imgProfile,
            },
          };

          setUser(updatedUser);
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleEditUser = () => {
    setShowEditModal(true);
  };

  const updateUserInfo = async () => {
    const url = "http://localhost:3001";
    try {
      const updatedUserResponse = await axios.get(
        `${url}/user/${user?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          ...updatedUserResponse.data, // Actualizar con los datos recibidos
        },
      };

      setUser(updatedUser); // Actualizar el estado del usuario
    } catch (error) {
      console.error("Error al obtener el usuario actualizado:", error);
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
    updateUserInfo(); // Actualizar los datos del usuario cuando se cierre el modal
  };

  return (
    <div className="max-w-4xl mt-16 mb-16 mx-auto bg-primary rounded-xl shadow-lg overflow-hidden">
      <div className="bg-primary p-6 text-secondary flex items-center justify-center border-b border-b-secondary">
        <h1 className="text-3xl font-bold text-secondary">Mi Cuenta</h1>
      </div>

      <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center border-b border-b-secondary">
        <h2 className="text-2xl font-bold text-secondary">
          Información de la Cuenta
        </h2>
        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            <Image
              src={user?.user.imgProfile || "/assets/DevNavigator.png"}
              alt="Foto de Perfil"
              width={200} // Ancho fijo
              height={200} // Alto fijo
              className="rounded-full border-2 border-secondary object-cover" // Ajusta la imagen al contenedor
              style={{ width: "200px", height: "200px" }} // Tamaño fijo adicional
            />
            <label className="absolute bottom-0 right-0 cursor-pointer z-10">
              <FaCamera className="text-secondary bg-white p-1 h-10 w-10" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {file && (
            <div className="mt-4">
              <button
                className={`bg-secondary text-white p-2 rounded ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleUpload}
                disabled={uploading}>
                {uploading ? "Cargando..." : "Subir Imagen"}
              </button>
              <button
                className="ml-4 bg-red-500 text-white p-2 rounded"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}>
                Cancelar
              </button>
            </div>
          )}
          <div className="w-auto mt-4 items-center bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center p-1">
              <FaUser className="text-lg mr-4 text-secondary" />
              <span className="text-lg text-secondary font-medium">
                {user?.user.name}
              </span>
            </div>
            <div className="flex items-center p-1">
              <FaEnvelope className="text-lg mr-4 text-secondary" />
              <span className="text-lg text-secondary font-medium">
                {user?.user.email}
              </span>
            </div>
            <div className="flex items-center p-1">
              <FaLocationDot className="text-lg mr-4 text-secondary" />
              <span className="text-lg text-secondary font-medium">
                {user?.user.address}
              </span>
            </div>
            <div className="flex items-center p-1">
              <FaPhone className="text-lg mr-4 text-secondary" />
              <span className="text-lg text-secondary font-medium">
                {user?.user.phone}
              </span>
            </div>
            <button
              className="mt-4 bg-secondary text-white p-2 rounded"
              onClick={handleEditUser}>
              Modificar Información
            </button>
          </div>
        </div>
      </div>
      {/* Rutas disponibles tanto para Admin como SuperAdmin */}
      {(isAdmin || isSuperAdmin) && (
        <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center border-b border-b-secondary">
          <h2 className="text-2xl font-bold text-secondary">
            Panel de Administración
          </h2>
          <div className="w-full mt-4">
            <button className="bg-secondary text-white p-2 rounded">
              Gestionar Usuarios
            </button>
            <button className="bg-secondary text-white p-2 rounded ml-4">
              Crear Cursos
            </button>
            <button className="bg-secondary text-white p-2 rounded ml-4">
              Crear Suscripción
            </button>
          </div>
        </div>
      )}
      {/* Panel exclusivo para SuperAdmin */}
      {isSuperAdmin && (
        <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center border-b border-b-secondary">
          <h2 className="text-2xl font-bold text-secondary">
            Panel de SuperAdmin
          </h2>
          <div className="w-full mt-4">
            <button className="bg-secondary text-white p-2 rounded">
              Gestionar Usuarios Admin
            </button>
            <button className="bg-secondary text-white p-2 rounded ml-4">
              Dar de baja a un usuario
            </button>
            <button className="bg-secondary text-white p-2 rounded ml-4">
              Cancelar Suscripción usuario
            </button>
          </div>
        </div>
      )}

      {/* Submodal para editar información del usuario */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Editar Información</h2>
            <UserEditForm
              userId={user.user.id}
              token={user.token}
              closeModal={closeModal} // Pasar la función para cerrar el modal
            />
            <button
              className="mt-4 bg-red-500 text-white p-2 rounded"
              onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
