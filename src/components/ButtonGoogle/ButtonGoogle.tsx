"use client";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import Button from "../Button/Button";
import { signIn, useSession } from "next-auth/react";

const GoogleLoginButton = () => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Solo se ejecuta en el cliente
  }, []);

  if (!isMounted) {
    return null; // No renderizar nada hasta que se monte el componente en el cliente
  }

  return (
    <Button
      onClick={async () => {
        await signIn("google", {
          callbackUrl: "/",
        });
      }}
      className="flex flex-row justify-center items-center w-[225px]"
    >
      <span className="me-2">
        <FaGoogle />
      </span>
      <span className="text-center">Continuar con Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
