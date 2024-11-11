import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserType } from "@/interfaces/userData";

interface ChangeUserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentType: UserType | null;
  token: string | undefined;
  onSave: (newType: UserType) => Promise<void>;
}

const ChangeUserTypeModal = ({
  isOpen,
  onClose,
  userId,
  currentType,
  token,
}: ChangeUserTypeModalProps) => {
  const [newType, setNewType] = useState(currentType);

  const handleChangeUserType = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    try {
      const response = await axios.patch(
        `${url}/user/userType/${userId}`,
        {
          userType: newType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Éxito", response.data.message, "success");
      onClose();
    } catch (error) {
      console.error("Error al actualizar el tipo de usuario:", error);
      Swal.fire("Error", "No se pudo actualizar el tipo de usuario", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cambiar Tipo de Usuario</h2>
        <div className="flex flex-col space-y-2">
          {Object.values(UserType).map((type) => (
            <button
              key={type}
              onClick={() => setNewType(type)}
              className={`p-2 rounded border ${
                newType === type ? "bg-blue-500 text-white" : "bg-gray-200"
              } hover:bg-blue-400 transition duration-200`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="modal-actions mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="btn btn-secondary p-2 rounded border bg-red-400 text-white"
          >
            Cerrar
          </button>
          <button
            onClick={handleChangeUserType}
            className="btn btn-primary p-2 rounded border bg-slate-600 text-white"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};
//
export default ChangeUserTypeModal;
