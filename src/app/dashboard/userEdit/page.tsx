// app/dashboard/userEdit/page.tsx
"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import UserEditForm from "@/components/Dashboard.tsx/UserEditForm";

const UserEdit = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const userId = new URLSearchParams(window.location.search).get("id");

  // Verificar que el usuario esté autenticado
  if (!user?.success) {
    router.push("/login");
    return null; // Evitar renderizar antes de redirigir
  }

  // Función vacía para closeModal, ya que este componente no necesita cerrar un modal
  const closeModal = () => {};

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h1 className="text-2xl font-bold">Editar Usuario</h1>
      <UserEditForm
        userId={userId}
        token={user.token}
        closeModal={closeModal}
      />
    </div>
  );
};

export default UserEdit;
