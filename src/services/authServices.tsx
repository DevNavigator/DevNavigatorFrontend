'use client'
import { ILoginForm, IRegisterForm } from "@/interfaces/Iforms";

export const loginService = async (url:string, data:ILoginForm) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();
    return json
}
export const registerService = async (url:string , data:IRegisterForm) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json
}
