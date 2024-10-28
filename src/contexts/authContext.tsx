'use client';
import { IUserSession } from '@/interfaces/Iforms';
import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSession, signOut } from 'next-auth/react';

const MySwal = withReactContent(Swal);

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IAuthContextProps {
  user: IUserSession | null;
  setUser: (user: IUserSession | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUserSession | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (user || session?.user) {
      localStorage.setItem('user', JSON.stringify({ user, session }));
    }
  }, [user, session]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localUser = JSON.parse(localStorage.getItem('user')!);
      setUser(localUser?.user);
    }
  }, []);

  const logout = async () => {
    const result = await MySwal.fire({
      title: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      backdrop: true,
      toast: true,
      position: 'center',
    });

    if (result.isConfirmed) {
      await signOut({ redirect: false }); // No redirigir automáticamente
      MySwal.fire('Sesión cerrada', '', 'success');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/'; // Redirección manual
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
