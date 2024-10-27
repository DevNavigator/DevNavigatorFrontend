"use client";

import { AuthContext } from "@/contexts/authContext";
import Button from "../Button/Button";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { FaEnvelope, FaLocationDot, FaPhone, FaUser } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import axios from "axios";
import UserEditForm from "./UserEditForm";
import Swal from "sweetalert2";
import { IUser } from "@/interfaces/iuser";
import { UserType } from "@/interfaces/userData";
import ChangePasswordForm from "./ChangePasswordForm ";
import ChangeUserTypeModal from "./admin dashboard/changeUserTypeModal";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  types: string;
}

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userType, setUserType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [showEditPanel, setShowEditPanel] = useState<boolean>(false);
  const [showUsersPanel, setShowUsersPanel] = useState<boolean>(false);
  const [showChangePasswordPanel, setShowChangePasswordPanel] =
    useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<IUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [showActiveUsers, setShowActiveUsers] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showChangeUserTypeModal, setShowChangeUserTypeModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );

  useEffect(() => {
    if (user?.success && user.token) {
      const decodedToken = jwtDecode<JwtPayload>(user.token);
      setUserType(decodedToken.types);
    }
  }, [user]);

  const isADMIN = userType === "ADMIN";
  const isSUPER_ADMIN = userType === "SUPER_ADMIN";

  const fetchAllUsers = useCallback(async () => {
    const url = "http://localhost:3001";
    try {
      const response = await axios.get(`${url}/user`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const activeUsers = response.data.filter(
        (user: IUser) => user.statusUser === true
      );
      const inactiveUsers = response.data.filter(
        (user: IUser) => user.statusUser === false
      );
      setAllUsers(activeUsers);
      setInactiveUsers(inactiveUsers);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  }, [user]);

  const handleChangeUserType = (userId: string, currentType: UserType) => {
    setSelectedUserId(userId);
    setSelectedUserType(currentType);
    setShowChangeUserTypeModal(true);
  };

  const saveUserType = async (newType: UserType) => {
    const url = "http://localhost:3001";
    if (!selectedUserId) return;
    try {
      await axios.patch(
        `${url}/user/userType/${selectedUserId}`,
        { userType: newType },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      Swal.fire(
        "Éxito",
        "Tipo de usuario actualizado correctamente",
        "success"
      );
      fetchAllUsers();
    } catch (error) {
      console.error("Error al actualizar el tipo de usuario:", error);
      Swal.fire("Error", "No se pudo actualizar el tipo de usuario", "error");
    }
  };

  const handleActivateUser = async (userId: string) => {
    const url = "http://localhost:3001";
    try {
      await axios.patch(
        `${url}/user/changeStatus/${userId}`,
        { statusUser: true },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      fetchAllUsers();
      Swal.fire(
        "¡Usuario activado!",
        "El usuario ha sido activado.",
        "success"
      );
    } catch (error) {
      console.error("Error al activar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al activar el usuario. Inténtalo de nuevo.",
      });
    }
  };

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

  const handleEditUser = (userId: string) => () => {
    setSelectedUserId(userId);
    setShowEditPanel(true);
    setShowUsersPanel(false);
    setShowChangePasswordPanel(false);
  };

  const handleDeleteUser = (userId: string) => async () => {
    const url = "http://localhost:3001";
    const userToDelete = allUsers.find(user => user.id === userId);

    if (userToDelete?.UserType === "SUPER_ADMIN") {
      Swal.fire({
        icon: "error",
        title: "Acción no permitida",
        text: "No puedes eliminar al SUPER_ADMIN.",
      });
      return;
    }

    if (userId === user?.user.id && (isADMIN || isSUPER_ADMIN)) {
      Swal.fire({
        icon: "warning",
        title: "Acción no permitida",
        text: "No puedes darte de baja a ti mismo.",
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
      });

      if (result.isConfirmed) {
        await axios.patch(
          `${url}/user/changeStatus/${userId}`,
          { statusUser: false },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        fetchAllUsers();
        Swal.fire(
          "¡Usuario dado de baja!",
          "El usuario ha sido eliminado.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al eliminar el usuario. Inténtalo de nuevo.",
      });
    }
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

  const closePanels = () => {
    setShowEditPanel(false);
    setShowUsersPanel(false);
    setShowChangePasswordPanel(false);
    updateUserInfo();
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-12 mb-16 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-50 md:w-1/3 p-6 border-r border-gray-200 flex flex-col items-center md:items-start">
        <div className="flex justify-center items-center mb-4 w-full">
          <div
            className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg cursor-pointer flex justify-center items-center"
            onClick={() => fileInputRef.current?.click()}>
            <Image
              src={user?.user.imgProfile || "/assets/DevNavigator.png"}
              alt="Foto de Perfil"
              layout="fill"
              className="object-cover absolute inset-0"
            />
          </div>
        </div>

        {file && (
          <Button onClick={handleUpload} disabled={uploading} className="mb-4">
            {uploading ? "Cargando..." : "Subir"}
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="text-gray-700 space-y-2">
          <div className="flex items-center">
            <FaUser className="mr-2 text-lg" />
            <span>{user?.user.name}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-lg" />
            <span>{user?.user.email}</span>
          </div>
          <div className="flex items-center">
            <FaLocationDot className="mr-2 text-lg" />
            <span>{user?.user.address}</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-lg" />
            <span>{user?.user.phone}</span>
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={handleEditUser(user?.user.id)}>
          Modificar Información
        </Button>

        <Button
          onClick={() => {
            setShowChangePasswordPanel(true);
            setShowEditPanel(false);
            setShowUsersPanel(false);
          }}
          className="mt-4 w-full">
          Cambiar Contraseña
        </Button>

        {(isADMIN || isSUPER_ADMIN) && (
          <div className="mt-4 w-full">
            <Button
              onClick={() => {
                setShowActiveUsers(true);
                fetchAllUsers(); // Obtener usuarios activos
                setShowUsersPanel(true);
                setShowEditPanel(false);
                setShowChangePasswordPanel(false);
              }}
              className="w-full mb-2">
              Ver Usuarios Activos
            </Button>
            <Button
              onClick={() => {
                setShowActiveUsers(false);
                fetchAllUsers(); // Obtener usuarios inactivos
                setShowUsersPanel(true);
                setShowEditPanel(false);
                setShowChangePasswordPanel(false);
              }}
              className="w-full mb-4">
              Ver Usuarios Inactivos
            </Button>
          </div>
        )}

        <button
          onClick={handleDeleteUser(user?.user.id)}
          className="mt-4 w-full bg-red-500 text-white p-2 px-3 rounded-3xl hover:bg-primary hover:text-red-500 hover:border hover:border-red-500 transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
          Darse de baja
        </button>
      </div>

      {/* Columna Derecha: Paneles Dinámicos */}
      <div className="flex-1 p-6">
        {showEditPanel && (
          <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Editar Información</h2>
            <UserEditForm
              userId={selectedUserId}
              token={user?.token}
              closeModal={closePanels}
            />
            <Button onClick={closePanels} className="mt-4">
              Cerrar
            </Button>
          </div>
        )}

        {showChangePasswordPanel && (
          <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
            <ChangePasswordForm token={user?.token} closeModal={closePanels} />
            <Button onClick={closePanels} className="mt-4">
              Cerrar
            </Button>
          </div>
        )}

        {showUsersPanel && (
          <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

            {showActiveUsers ? (
              allUsers.length > 0 ? (
                allUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center mb-4">
                    <span className="flex-grow flex items-center">
                      <Image
                        src={user.imgProfile || "/assets/DevNavigator.png"} // Ruta de la imagen de perfil
                        alt={`${user.name}'s profile`}
                        width={40} // Ajusta el tamaño según sea necesario
                        height={40} // Ajusta el tamaño según sea necesario
                        className="rounded-full mr-2" // Estilo para que sea redonda
                      />
                      <div className="font-bold">{user.email}</div>{" "}
                      {/* Muestra el correo electrónico */}
                      <div>{user.UserType}</div>{" "}
                      {/* Muestra el tipo de usuario */}
                    </span>
                    <div className="flex items-center">
                      <Button
                        onClick={handleEditUser(user.id)}
                        className="mr-2 px-3">
                        Editar
                      </Button>
                      <Button
                        onClick={() =>
                          handleChangeUserType(user.id, user.UserType)
                        }
                        className="mr-2 px-3  bg-slate-600 text-white">
                        Cambiar Tipo usuario
                      </Button>
                      <button
                        onClick={handleDeleteUser(user.id)}
                        className="bg-red-500 text-white p-2 px-3 rounded-3xl hover:bg-primary hover:text-red-500 hover:border hover:border-red-500 transition-all hover:scale-110 active:scale-95 ease-in-out duration-300">
                        Dar de baja
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No hay usuarios activos.</div>
              )
            ) : inactiveUsers.length > 0 ? (
              inactiveUsers.map(user => (
                <div
                  key={user.id}
                  className="flex justify-between items-center mb-4">
                  <span className="flex-grow flex items-center">
                    <Image
                      src={user.imgProfile || "/assets/DevNavigator.png"} // Ruta de la imagen de perfil
                      alt={`${user.name}'s profile`}
                      width={40} // Ajusta el tamaño según sea necesario
                      height={40} // Ajusta el tamaño según sea necesario
                      className="rounded-full mr-2" // Estilo para que sea redonda
                    />
                    <div className="font-bold">{user.name}</div>{" "}
                    {/* Muestra el nombre */}
                    <div>{user.UserType}</div>{" "}
                    {/* Muestra el tipo de usuario */}
                  </span>
                  <div className="flex items-center">
                    <Button
                      onClick={() => handleActivateUser(user.id)}
                      className="mr-2 px-3 bg-green-500 text-white">
                      Activar Usuario
                    </Button>
                    <Button
                      onClick={handleEditUser(user.id)}
                      className="mr-2 px-3">
                      Editar
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div>No hay usuarios inactivos.</div>
            )}
            <div className="flex justify-center">
              <Button onClick={closePanels} className="mt-10">
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para Cambiar Tipo de Usuario */}
      <ChangeUserTypeModal
        isOpen={showChangeUserTypeModal}
        onClose={() => setShowChangeUserTypeModal(false)}
        userId={selectedUserId}
        currentType={selectedUserType ?? UserType}
        token={user?.token}
        onSave={saveUserType}
      />
    </div>
  );
};

export default Dashboard;
