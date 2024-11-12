// app/dashboard/userEdit/page.tsx
"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import UserEditForm from "@/components/Dashboard.tsx/UserEditForm";

const UserEdit = () => {
  const { user, userExternal } = useContext(AuthContext);
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = user?.user?.id || userExternal?.user?.id;
    if (!id) {
      console.error("no existe el id");
      return;
    }
    setUserId(id);
  }, [user?.user?.id, userExternal?.user?.id]);

  if (!user?.success && typeof window !== "undefined") {
    router.push("/login");
    return null;
  }
  const token = user?.token || "";

  const closeModal = () => {};

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h1 className="text-2xl font-bold">Editar Usuario</h1>
      <UserEditForm userId={userId} token={token} closeModal={closeModal} />
    </div>
  );
};

export default UserEdit;
