'use client';
import { IUserSession } from '@/interfaces/Iforms';
import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
  setUser: () => { },
  logout: () => { }
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUserSession | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify({ user }));
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localUser = JSON.parse(localStorage.getItem('user')!);
      setUser(localUser?.user);
    }
  }, []);

  const logout = () => {
    MySwal.fire({
      title: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      backdrop: true,
      toast: true,
      position: 'center',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire('Sesion cerrada', '', 'success');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
      }
    })
  
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
