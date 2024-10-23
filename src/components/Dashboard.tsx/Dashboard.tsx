"use client";

import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaCamera,
} from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  return moment(dateString)
    .tz("America/Sao_Paulo")
    .format("DD/MM/YYYY hh:mm a");
};

// Define la interfaz para el payload del JWT
interface CustomJwtPayload {
  id: string;
  email: string;
  types: string;
  iat: number;
  exp: number;
}

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [userType, setUserType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user?.success) {
      router.push("/login");
    } else if (user.token) {
      // Decodificar el token
      const decodedToken = jwtDecode<CustomJwtPayload>(user.token);
      setUserType(decodedToken.types); // Guardar el tipo de usuario en el estado
    }
  }, [user, router]);

  const isAdmin = userType === "admin" || userType === "superAdmin";

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

      try {
        const response = await fetch(
          `${url}/files/imgprofile/${user?.user.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          // Actualizar el estado del usuario o hacer algo con los datos actualizados
          console.log("Imagen subida con éxito:", updatedUser);
          // Opcional: Actualiza el estado del usuario en el contexto si es necesario
        } else {
          console.error("Error al subir la imagen:", response.statusText);
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mt-16 mb-16 mx-auto bg-primary rounded-xl shadow-lg overflow-hidden">
      <div className="bg-primary p-6 text-secondary flex items-center justify-center border-b border-b-secondary">
        <h1 className="text-3xl font-bold text-secondary">Mi Cuenta</h1>
      </div>

      {/* Información del Usuario */}
      <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center border-b border-b-secondary">
        <h2 className="text-2xl font-bold text-secondary">
          Información de la Cuenta
        </h2>
        <div className="flex flex-col items-center mt-4">
          {/* Foto de Perfil */}
          <div className="relative">
            <Image
              src={user?.user.imgProfile || "/assets/DevNavigator.png"}
              alt="Foto de Perfil"
              width={128} // Ajusta el tamaño
              height={128} // Ajusta el tamaño
              className="rounded-full border-2 border-secondary"
            />
            <label className="absolute bottom-0 right-0 cursor-pointer">
              <FaCamera className="text-secondary bg-white rounded-full p-1" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {/* Mostrar botón solo si hay un archivo seleccionado */}
          {file && (
            <button
              className="mt-4 bg-secondary text-white p-2 rounded"
              onClick={handleUpload}>
              Subir Imagen
            </button>
          )}
          <div className="w-auto mt-4 items-center bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center p-1">
              <FaUser className="text-lg mr-4 text-secondary" />
              <span className="text-lg text-secondary font-medium">
                {user?.user.name.toLocaleUpperCase()}
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
            <button className="mt-4 bg-secondary text-white p-2 rounded">
              Modificar Información
            </button>
          </div>
        </div>
      </div>

      {/* Panel de Administración solo para Admin y SuperAdmin */}
      {isAdmin && (
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
    </div>
  );
};

export default Dashboard;
