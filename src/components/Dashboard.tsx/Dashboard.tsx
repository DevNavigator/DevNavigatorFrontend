"use client";

import { AuthContext } from "@/contexts/authContext";
import Button from "../Button/Button";
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
  const [showUsers, setShowUsers] = useState<boolean>(false);
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
              ...user?.user,
              imgProfile:
                updatedUserResponse.data.imgProfile || user?.user.imgProfile,
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al subir la imagen. Inténtalo de nuevo.",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleEditUser = () => {
    setShowEditModal(true);
    setShowUsers(false);
  };
  const handleShowUsers = () => {
    setShowUsers(true);
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
          ...user?.user,
          ...updatedUserResponse.data,
        },
      };

      setUser(updatedUser);
    } catch (error) {
      console.error("Error al obtener el usuario actualizado:", error);
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowUsers(false);
    updateUserInfo();
  };

  return (
    <div className="max-w-4xl mt-16 mb-16 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary p-6 text-secondary flex items-center justify-center border-b border-gray-200">
        <h1 className="text-3xl font-bold text-secondary">Mi Cuenta</h1>
      </div>

      <div className="flex flex-col md:flex-row p-6">
        {/* Avatar - Columna izquierda */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 p-4">
          <div className="relative">
            <div className="relative w-52 h-52 rounded-full overflow-hidden border-2 border-secondary">
              <Image
                src={user?.user.imgProfile || "/assets/DevNavigator.png"}
                alt="Foto de Perfil"
                layout="fill"
                className="object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 cursor-pointer">
              <FaCamera className="text-secondary bg-white p-1 h-8 w-8 rounded-full" />
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
            <div className="mt-5 flex items-center">
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Cargando..." : "Subir"}
              </Button>
              <button
                className="ml-4 bg-red-500 p-2 px-5 rounded-3xl border border-transparent text-primary transition-all hover:bg-primary hover:text-red-500 hover:border-red-500 hover:border hover:scale-110 active:scale-95 ease-in-out duration-300"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Información del usuario - Columna derecha */}
        <div className="flex-1 p-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Información de la Cuenta
          </h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FaUser className="mr-3 text-xl" />
              <span>{user?.user.name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaEnvelope className="mr-3 text-xl" />
              <span>{user?.user.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaLocationDot className="mr-3 text-xl" />
              <span>{user?.user.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaPhone className="mr-3 text-xl" />
              <span>{user?.user.phone}</span>
            </div>
          </div>
          <div>
            <Button className="mt-10" onClick={handleEditUser}>
              Modificar Información
            </Button>
          </div>

          {isAdmin && (
            <div className="flex items-center justify-center m-5">
              <Button onClick={handleShowUsers} className="m-2">
                Ver Usuarios
              </Button>
            </div>
          )}
          {isSuperAdmin && (
            <div className="flex mt-5">
              <Button className="" onClick={handleShowUsers}>
                Ver Usuarios
              </Button>
            </div>
          )}
        </div>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Editar Información</h2>
            <UserEditForm
              userId={user?.user.id}
              token={user?.token}
              closeModal={closeModal}
            />
            <div className="flex items-center justify-center mt-4">
              <button
                className="flex text-center justify-center items-center bg-red-500 p-2 px-5 rounded-3xl border border-transparent text-primary transition-all hover:bg-primary hover:text-red-500 hover:border-red-500 hover:border hover:scale-110 active:scale-95 ease-in-out duration-300"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {showUsers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
            <div className="flex justify-around items-center mb-4">
              usuario1: admin
              <button
                onClick={handleEditUser}
                className="bg-secondary text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300"
              >
                Editar
              </button>
              <button className=" bg-red-500 text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                Eliminar
              </button>
            </div>
            <div className="flex justify-around items-center mb-4">
              usuario1: admin
              <button
                onClick={handleEditUser}
                className="bg-secondary text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300"
              >
                Editar
              </button>
              <button className=" bg-red-500 text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                Eliminar
              </button>
            </div>
            <div className="flex justify-around items-center mb-4">
              usuario1: admin
              <button
                onClick={handleEditUser}
                className="bg-secondary text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300"
              >
                Editar
              </button>
              <button className=" bg-red-500 text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                Eliminar
              </button>
            </div>
            <div className="flex justify-around items-center mb-4">
              usuario1: admin
              <button
                onClick={handleEditUser}
                className="bg-secondary text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300"
              >
                Editar
              </button>
              <button className=" bg-red-500 text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                Eliminar
              </button>
            </div>
            <div className="flex justify-around items-center mb-4">
              usuario1: admin
              <button
                onClick={handleEditUser}
                className="bg-secondary text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300"
              >
                Editar
              </button>
              <button className=" bg-red-500 text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                Eliminar
              </button>
            </div>
            <div className="flex justify-around items-center mb-4">
              usuario1: admin
              <button
                onClick={handleEditUser}
                className="bg-secondary text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300"
              >
                Editar
              </button>
              <button className=" bg-red-500 text-white rounded-lg p-1 hover:transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                Eliminar
              </button>
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                className="flex text-center mt-5 justify-center items-center bg-red-500 p-2 px-5 rounded-3xl border border-transparent text-primary transition-all hover:bg-primary hover:text-red-500 hover:border-red-500 hover:border hover:scale-110 active:scale-95 ease-in-out duration-300"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
