'use client';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateAddress,
  validatePhone,
} from '@/helpers/validation';
import { IRegisterForm } from '@/interfaces/Iforms';
import { registerService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RegisterForm = () => {
  const router = useRouter();
  const initialData: IRegisterForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  };

  const initialDirty = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    address: false,
    phone: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await registerService(apiUrl + '/users/register', data);

    if (!response.message) {
      // alert('Registrado correctamente');
       MySwal.fire({
         title: '¡Registrado correctamente!',
         icon: 'success',
         confirmButtonText: 'OK',
         backdrop: true,
         toast: true,
         position: 'center',
       }).then((result) => {
         if (result.isConfirmed) {
           router.push('/login');
           //  router.back();
         }
       });
      
    } else {
      // alert(response.message);
       MySwal.fire({
         title: `Completa todos los campos`,
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
      name: validateName(data.name),
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),        
      address: validateAddress(data.address),
      phone: validatePhone(data.phone),
    });
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" "
    >
      <div className="flex flex-col w-[300px] mx-auto ">
        <label
          htmlFor="name"
          className=""
        >
          Nombre
        </label>
        <input
          className="border-b-2 border-secondary"
          type="text"
          id="name"
          name="name"
          value={data.name}
          placeholder="Pepe"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.name ? <p className="text-red-600 mt-0">{errors.name}</p> : null}

        <label
          htmlFor="email"
          className="mt-2"
        >
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
        {dirty.email ? (
          <p className="text-red-600 mt-0">{errors.email}</p>
        ) : null}

        <label
          htmlFor="password"
          className="mt-2"
        >
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
        {dirty.password ? (
          <p className="text-red-600">{errors.password}</p>
        ) : null}

        <label
          htmlFor="confirmPassword"
          className="mt-2"
        >
          Confirmar Contraseña
        </label>
        <input
          className="border-b-2 border-secondary"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={data.confirmPassword}
          placeholder="********"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.confirmPassword ? (
          <p className="text-red-600">{errors.confirmPassword}</p>
        ) : null}

        <label
          htmlFor="address"
          className="mt-2"
        >
          Dirección
        </label>
        <input
          className="border-b-2 border-secondary"
          type="text"
          id="address"
          name="address"
          value={data.address}
          placeholder="Dirección"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.address ? (
          <p className="text-red-600 mt-0">{errors.address}</p>
        ) : null}

        <label
          htmlFor="phone"
          className="mt-2"
        >
          Número de Teléfono
        </label>
        <input
          className="border-b-2 border-secondary"
          type="text"
          id="phone"
          name="phone"
          value={data.phone}
          placeholder="+542610000000"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.phone ? (
          <p className="text-red-600 mt-0">{errors.phone}</p>
        ) : null}

        <Button
          type="submit"
          className="mt-4 w-36 mx-auto "
        >
          Registrarse
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
