"use client";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import Button from "../Button/Button";
import { signIn, useSession } from "next-auth/react";

const GoogleLoginButton = () => {
  const { data: session } = useSession();

  return (
    <Button
      onClick={async () => {
        await signIn("google", {
          callbackUrl: "/",
        });
      }}
      className="flex flex-row justify-center items-center w-[225px] "
    >
      <span className="me-2">
        <FaGoogle />
      </span>
      <span className="text-center">Continuar con Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
