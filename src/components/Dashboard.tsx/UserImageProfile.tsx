import { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../Button/Button";

interface UserProfileImageProps {
  userId?: string;
  token?: string;
  imgProfile?: string | null;
  onUpdate: () => void;
}

const UserProfileImage = ({
  userId,
  token,
  imgProfile,
  onUpdate,
}: UserProfileImageProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      await axios.post(`${url}/files/imgprofile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire(
        "Éxito",
        "Imagen de perfil actualizada correctamente",
        "success"
      );
      onUpdate();
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al subir la imagen. Inténtalo de nuevo.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <div
        className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg cursor-pointer mb-5"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={imgProfile || "/DevNavigator.png"}
          alt="Foto de Perfil"
          layout="fill"
          className="object-cover absolute inset-0 "
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {file && (
        <Button onClick={handleUpload} disabled={uploading} className="m-5">
          {uploading ? "Cargando..." : "Subir"}
        </Button>
      )}
    </div>
  );
};

export default UserProfileImage;
