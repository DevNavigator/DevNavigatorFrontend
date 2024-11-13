import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "@/contexts/authContext";
import { IUser } from "@/interfaces/iuser";
import { MdDeleteForever } from "react-icons/md";

interface DeleteUserButtonProps {
  userId?: string;
  userType?: string | null;
  allUsers: IUser[];
  fetchAllUsers: () => void;
  buttonText?: string; // Para el texto del botón
  buttonClass?: string; // Para los estilos adicionales
  showIcon?: boolean; // Prop opcional para mostrar el ícono
  showText?: boolean; // Prop opcional para mostrar el texto
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  userType,
  allUsers,
  fetchAllUsers,
  buttonText = "Darse de baja",
  buttonClass = "bg-red-500 text-white p-2 px-3 rounded-3xl hover:bg-primary hover:text-red-500 hover:border hover:border-red-500 transition-all hover:scale-110 active:scale-95 ease-in-out duration-300", // Estilos predeterminados
  showIcon = true,
  showText = true,
}) => {
  const { user, userExternal } = useContext(AuthContext);
  const isADMIN = userType === "ADMIN";
  const isSUPER_ADMIN = userType === "SUPER_ADMIN";

  const handleDeleteUser = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const userToDelete = allUsers.find((user) => user.id === userId);

    if (userToDelete?.userType === "SUPER_ADMIN") {
      Swal.fire({
        icon: "error",
        title: "Acción no permitida",
        text: "No puedes eliminar al SUPER_ADMIN.",
      });
      return;
    }

    if (
      userId === user?.user?.id ||
      (userId === userExternal?.user?.id && (isADMIN || isSUPER_ADMIN))
    ) {
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
              Authorization: `Bearer ${user?.token || userExternal?.token}`,
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

  return (
    <button onClick={handleDeleteUser} className={buttonClass}>
      {showIcon && <MdDeleteForever className="w-8 h-6" />}
      {showText && buttonText}
    </button>
  );
};

export default DeleteUserButton;
