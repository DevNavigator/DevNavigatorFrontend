"use client";
import { IUserLogin, IUserSession, IUserNavigator } from "@/interfaces/Iforms";
import { createContext, useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MySwal = withReactContent(Swal);

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IAuthContextProps {
  user: IUserNavigator | null;
  userExternal: IUserNavigator | null;
  setUser: (user: IUserNavigator | null) => void;
  setUserExternal: (user: IUserNavigator | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextProps>({
  user: null,
  userExternal: null,
  setUser: () => {},
  setUserExternal: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUserNavigator | null>(null);
  const [userExternal, setUserExternal] = useState<IUserNavigator | null>(null);
  const { data: session } = useSession();
  const userCreatedRef = useRef(false);

  const createUserExternal = useCallback(async () => {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Si ya se creó o ya existe en sessionStorage, no crear de nuevo
    const storedUser = sessionStorage.getItem("userDevNavigator");
    const existingUser = storedUser ? JSON.parse(storedUser) : null;
    /* const existingUser = JSON.parse(sessionStorage.getItem("userDevNavigator")); */
    if (existingUser || userCreatedRef.current) return;

    if (session?.user) {
      userCreatedRef.current = true; // Evita duplicados al establecerlo antes de crear

      try {
        const response = await axios.post(`${url}/auth/create-user`, {
          email: session.user.email,
          name: session.user.name,
          imgProfile: session.user.image,
        });

        if (response.data) {
          sessionStorage.setItem(
            "userDevNavigator",
            JSON.stringify(response.data)
          );
          setUserExternal(response.data);
        }
      } catch (error) {
        console.error("Error al crear usuario externo:", error);
        userCreatedRef.current = false; // Restablece en caso de error
      }
    }
  }, [session]);

  const forceLogout = useCallback(async () => {
    await signOut({ redirect: false });
    sessionStorage.removeItem("userLocal");
    sessionStorage.removeItem("userDevNavigator");
    localStorage.removeItem("user");
    setUser(null);
    setUserExternal(null);
    await MySwal.fire({
      title: "Cierre forzado de DevNavigator💙💻",
      text: "Se ha cerrado sesión por seguridad de tus datos, por favor inicia sesión nuevamente para seguir estudiando.",
      icon: "info",
      confirmButtonText: "cerrar",
      backdrop: true,
      toast: false,
      position: "center",
    });
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, [setUser, setUserExternal]);

  const checkTokenExpiration = useCallback(() => {
    // Chequeo para el usuario externo
    const userDevNavigator = JSON.parse(
      sessionStorage.getItem("userDevNavigator")!
    );
    const tokenExternal = userDevNavigator?.token;

    if (tokenExternal) {
      const decodedExternal: any = jwtDecode(tokenExternal);
      const expExternal = decodedExternal.exp * 1000;
      const now = Date.now();

      if (now >= expExternal) {
        console.warn(
          "Se cierra sesión debido a que el token de usuario externo ha expirado"
        );
        sessionStorage.removeItem("userDevNavigator");
        forceLogout();
      }
    }

    // Chequeo para el usuario normal
    const usersessionStorage = JSON.parse(sessionStorage.getItem("userLocal")!);
    const tokenUser = usersessionStorage?.token;

    if (tokenUser) {
      const decodedUser: any = jwtDecode(tokenUser);
      const expUser = decodedUser.exp * 1000;
      const now = Date.now();

      if (now >= expUser) {
        console.warn(
          "Se cierra sesión debido a que el token de usuario normal ha expirado"
        );
        sessionStorage.removeItem("userLocal");
        forceLogout();
      }
    }
  }, [forceLogout]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("userLocal", JSON.stringify(user));
    }

    if (session?.user) {
      createUserExternal();
    }

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [user, session, checkTokenExpiration, createUserExternal]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const localUserExternal = JSON.parse(
        sessionStorage.getItem("userDevNavigator")!
      );
      const localUserNormal = JSON.parse(sessionStorage.getItem("userLocal")!);

      if (localUserExternal) {
        if (localUserExternal.success && localUserExternal.user) {
          setUser(null); // No establecer user si hay un usuario externo
          setUserExternal(localUserExternal as IUserNavigator);
        }
      } else if (localUserNormal) {
        setUser(localUserNormal as IUserSession);
        setUserExternal(null); // No establecer userExternal si hay un usuario normal
      }
    }
  }, []);

  const logout = async () => {
    const result = await MySwal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      backdrop: true,
      toast: true,
      position: "center",
    });

    if (result.isConfirmed) {
      await signOut({ redirect: false });
      MySwal.fire("Sesión cerrada", "", "success");
      sessionStorage.removeItem("userLocal");
      sessionStorage.removeItem("userDevNavigator");
      localStorage.removeItem("user");
      setUser(null);
      setUserExternal(null);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userExternal, setUser, setUserExternal, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
