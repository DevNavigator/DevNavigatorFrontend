// services/authServices.ts
import axios from "axios";
import { ILoginForm, IRegisterForm } from "@/interfaces/Iforms";

export const loginService = async (url: string, data: ILoginForm) => {
  const response = await axios.post(url, data);
  return response.data;
};

export const registerService = async (url: string, data: IRegisterForm) => {
  const response = await axios.post(url, data);
  return response.data;
};

// Servicio para solicitar el restablecimiento de contraseña
export const requestPasswordResetService = async (
  url: string,
  data: { email: string }
) => {
  const response = await axios.post(url, data);
  return response.data;
};

// Servicio para restablecer la contraseña
export const resetPasswordService = async (
  url: string,
  data: { token: string; newPassword: string }
) => {
  const response = await axios.post(url, data);
  return response.data;
};

// 'use client'
// import { ILoginForm, IRegisterForm } from "@/interfaces/Iforms";

// export const loginService = async (url:string, data:ILoginForm) => {
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     const json = await response.json();
//     return json
// }
// export const registerService = async (url:string , data:IRegisterForm) => {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     const json = await response.json();
//     return json
// }
