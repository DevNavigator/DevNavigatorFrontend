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

const MySwal = withReactContent(Swal);

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const initialData: ILoginForm = { email: '', password: '' };
  const initialDirty = { email: false, password: false };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {      
    e.preventDefault();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await loginService(apiUrl + "/users/login", data);
    
    if (response.login) {
      //alert("Login correcto");
       MySwal.fire({
         title: `${response.user.name.toLocaleUpperCase()} ¡Bienvenido a DamiShop!`,
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
      // router.back();   
      
    } else {
      //alert("Login incorrecto");
       MySwal.fire({
         title: '¡Login incorrecto!',
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
    setErrors({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
    });
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" "
    >
      <div className="flex flex-col w-[300px] mx-auto">
        <label htmlFor="email">Email</label>
        <input
          className="border-b-2 border-secondary mb-4 "
          type="email"
          id="email"
          name="email"
          value={data.email}
          placeholder="email@email.com"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.email ? <p className="text-red-600">{errors.email}</p> : null}
        
        <label htmlFor="password">Contraseña</label>
        <input
          className="border-b-2 border-secondary "
          type="password"
          id="password"
          name="password"
          value={data.password}
          placeholder="********"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.password ? (
          <p className="text-red-600">{errors.password}</p>
        ) : null}
        <Button
          className="mt-4 w-36 mx-auto"
          type="submit"
        >
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
