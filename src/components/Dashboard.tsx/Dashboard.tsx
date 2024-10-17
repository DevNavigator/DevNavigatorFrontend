'use client';

import { AuthContext } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaRegUser,
  FaUser,
} from 'react-icons/fa6';
import { FaShoppingBag } from 'react-icons/fa';

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  return moment(dateString)
    .tz('America/Sao_Paulo')
    .format('DD/MM/YYYY hh:mm a');
};

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.login) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="max-w-4xl mt-16 mb-16 mx-auto bg-primary rounded-xl shadow-lg overflow-hidden ">
      <div className="bg-primary p-6 text-secondary flex items-center justify-center border-b border-b-secondary">
        <h1 className="text-3xl font-bold text-secondary ">Mi Cuenta</h1>
      </div>
      <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center border-b border-b-secondary">
        <h2 className=" text-2xl font-bold text-secondary ">
          Información de la Cuenta
        </h2>
        <div className="w-auto mt-4 items-center bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="flex items-center p-1">
            <FaUser className="text-lg mr-4 text-secondary" />
            <span className="text-lg text-secondary font-medium">
              {user?.user.name.toLocaleUpperCase()}
            </span>
          </div>
          <div className="flex items-center p-1">
            <FaEnvelope className="text-lg mr-4 text-secondary" />
            <span className="text-lg text-secondary font-medium">
              {user?.user.email}
            </span>
          </div>
          <div className="flex items-center p-1">
            <FaLocationDot className="text-lg mr-4 text-secondary" />
            <span className="text-lg text-secondary font-medium">
              {user?.user.address}
            </span>
          </div>
          <div className="flex items-center p-1">
            <FaPhone className="text-lg mr-4 text-secondary" />
            <span className="text-lg text-secondary font-medium">
              {user?.user.phone}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center">
        <h2 className=" text-2xl font-bold text-secondary ">
          Historial de compras
        </h2>
        <div className="w-full rounded-lg p-6 space-y-4 mb-8 ">
          {user?.user.orders?.map((order, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
            >
              <div className="flex items-center">
                <FaShoppingBag className="text-3xl mr-4" />
                <span className="text-lg text-secondary font-medium">
                  <h6>N° de Orden: {order.id}</h6>
                  <p>{formatDate(order.date)}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
