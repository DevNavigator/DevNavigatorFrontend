'use client';

import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { validateEmail, validatePassword } from '@/helpers/validation';
import { ILoginForm } from '@/interfaces/Iforms';
import { loginService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/authContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'; // Para mostrar iconos
import { useSession } from 'next-auth/react';

const MySwal = withReactContent(Swal);

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const initialData: ILoginForm = { email: '', password: '' };
  const initialDirty = { email: false, password: false };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [dirty, setDirty] = useState(initialDirty);
  const [valid, setValid] = useState({ email: false, password: false }); // Estado de validación corregido
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await loginService(apiUrl + '/auth/signIn', data);

    if (response.success || session?.user || session?.user === null) {
      MySwal.fire({
        title: `${
          response.user.name.toLocaleUpperCase() ||
          session?.user?.name?.toLocaleUpperCase()
        } ¡Bienvenido a DevNavigator!`,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        backdrop: true,
        toast: true,
        position: 'center',
      });
      setUser(response);
      router.push('/');
    } else {
      MySwal.fire({
        title: `¡${response.message}!`,
        text: 'Inténtalo de nuevo',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        backdrop: true,
        toast: true,
        position: 'center',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    // Validar los campos y establecer los errores
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Establecer la validez en función de los errores
    setValid({
      email: !emailError, // Si no hay error, es válido
      password: !passwordError, // Lo mismo para la contraseña
    });
  }, [data]);

  // Validación final para habilitar/deshabilitar el botón
  const isFormValid = valid.email && valid.password && data.email && data.password;

  return (
    <form onSubmit={handleSubmit} className=" ">
      <div className="flex flex-col w-[300px] mx-auto">
        {/* Email */}
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <input
          className="border-b-2 border-secondary"
          type="email"
          id="email"
          name="email"
          value={data.email}
          placeholder="email@email.com"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.email && (
          <p className={`mt-0 flex items-center ${valid.email ? 'text-green-500' : 'text-red-600'}`}>
            {valid.email ? (
              <FaCircleCheck className="h-4 w-4 mr-1" />
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" /> {errors.email}
              </>
            )}
          </p>
        )}

        {/* Contraseña */}
        <label htmlFor="password" className="mt-2">
          Contraseña
        </label>
        <input
          className="border-b-2 border-secondary"
          type="password"
          id="password"
          name="password"
          value={data.password}
          placeholder="********"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.password && (
          <p className={`mt-0 flex items-center ${valid.password ? 'text-green-500' : 'text-red-600'}`}>
            {valid.password ? (
               <>
              <FaCircleCheck className="h-4 w-4 mr-1" /> ¡Contraseña válida!
               </>
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" /> {errors.password}
              </>
            )}
          </p>
        )}

        {/* Botón de inicio de sesión */}
        <Button
          className="mt-4 w-36 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-secondary disabled:hover:text-white"
          type="submit"
          disabled={!isFormValid} // Deshabilitar el botón si el formulario no es válido
        >
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
