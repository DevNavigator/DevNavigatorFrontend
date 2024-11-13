// page.tsx

"use client"; // Añade esta línea al principio del archivo

import Button from "@/components/Button/Button";
import ButtonGoogle from "@/components/ButtonGoogle/ButtonGoogle";
import LoginForm from "@/components/LoginForm/LoginForm";
import ResetPasswordForm from "@/components/ResetPasswordForm/ResetPasswordForm";
import { useState } from "react";

const Page = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <div className={`container !mt-24`}>
      <div className="w-[400px] mx-auto p-10 rounded-3xl shadow-lg shadow-gray-700/40">
        <h1 className="text-center">
          {showResetPassword ? "Restablecer Contraseña" : "Inicia sesión"}
        </h1>
        {showResetPassword ? (
          <ResetPasswordForm />
        ) : (
          <>
            <LoginForm />
            <div className="mx-auto text-center mt-7">
              <p className="mb-3">¿No tienes cuenta?</p>
              <Button href="/register">Regístrate</Button>
            </div>
            <div className="mx-auto text-center mt-3 flex flex-col items-center">
              <h3 className="text-center">--------- ó ---------</h3>
              <ButtonGoogle />
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setShowResetPassword(true)}
                className="text-blue-500">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
