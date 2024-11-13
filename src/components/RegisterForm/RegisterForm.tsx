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
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'; // Para mostrar iconos

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
  const [valid, setValid] = useState(initialDirty); // Estado para validez de los campos
  const [dirty, setDirty] = useState(initialDirty); // Estado para saber si el campo fue tocado

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await registerService(apiUrl + '/auth/signUp', data);

    if (!response.message) {
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
        }
      });
    } else {
      MySwal.fire({
        title: `¡${response.message}!`,
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
      confirmPassword: validateConfirmPassword(
        data.password,
        data.confirmPassword
      ),
      address: validateAddress(data.address),
      phone: validatePhone(data.phone),
    });

    // Actualiza validez basada en errores
    setValid({
      name: !validateName(data.name),
      email: !validateEmail(data.email),
      password: !validatePassword(data.password),
      confirmPassword: !validateConfirmPassword(
        data.password,
        data.confirmPassword
      ),
      address: !validateAddress(data.address),
      phone: !validatePhone(data.phone),
    });
  }, [data]);

  const isFormValid =
    valid.name &&
    valid.email &&
    valid.password &&
    valid.confirmPassword &&
    valid.address &&
    valid.phone &&
    data.name &&
    data.email &&
    data.password &&
    data.confirmPassword &&
    data.address &&
    data.phone;

  return (
    <form
      onSubmit={handleSubmit}
      className=" "
    >
      <div className="flex flex-col w-[300px] mx-auto">
        {/* Nombre */}
        <label htmlFor="name">Nombre</label>
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
        {dirty.name && (
          <p
            className={`mt-0 flex items-center ${
              valid.name ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {valid.name ? (
              <>
                <FaCircleCheck className="h-4 w-4 mr-1" /> ¡Nombre válido!
              </>
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" /> {errors.name}
              </>
            )}
          </p>
        )}

        {/* Email */}
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
        {dirty.email && (
          <p
            className={`mt-0 flex items-center ${
              valid.email ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {valid.email ? (
              <>
                <FaCircleCheck className="h-4 w-4 mr-1" /> ¡Email válido!
              </>
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" /> {errors.email}
              </>
            )}
          </p>
        )}

        {/* Contraseña */}
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
        {dirty.password && (
          <p
            className={`mt-0 flex items-center ${
              valid.password ? 'text-green-500' : 'text-red-600'
            }`}
          >
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

        {/* Confirmar Contraseña */}
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
        {dirty.confirmPassword && (
          <p
            className={`mt-0 flex items-center ${
              valid.confirmPassword ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {valid.confirmPassword ? (
              <>
                <FaCircleCheck className="h-4 w-4 mr-1" /> ¡Las contraseñas
                coinciden!
              </>
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" />{' '}
                {errors.confirmPassword}
              </>
            )}
          </p>
        )}

        {/* Dirección */}
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
        {dirty.address && (
          <p
            className={`mt-0 flex items-center ${
              valid.address ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {valid.address ? (
              <>
                <FaCircleCheck className="h-4 w-4 mr-1" /> ¡Dirección válida!
              </>
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" /> {errors.address}
              </>
            )}
          </p>
        )}

        {/* Teléfono */}
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
          placeholder="542610000000"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {dirty.phone && (
          <p
            className={`mt-0 flex items-center ${
              valid.phone ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {valid.phone ? (
              <>
                <FaCircleCheck className="h-4 w-4 mr-1" /> ¡Teléfono válido!
              </>
            ) : (
              <>
                <FaCircleXmark className="h-4 w-4 mr-1" /> {errors.phone}
              </>
            )}
          </p>
        )}

        <Button
          type="submit"
          className="mt-4 w-36 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-secondary disabled:hover:text-white"
          disabled={!isFormValid} // Deshabilitar el botón si el formulario no es válido
        >
          Registrarse
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
