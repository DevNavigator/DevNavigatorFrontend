'use client';

import { ICourse } from '@/interfaces/Icourse';
import Image from 'next/image';
import Button from '../Button/Button';
import BuyButton from '../BuyButton/BuyButton';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter

const Detail = (course: ICourse) => {
  const { user } = useContext(AuthContext);
  const isUserSubscribed = user?.user?.Subscription?.status_sub === true;
  const isUserLoggedIn = !!user; // Verifica si el usuario está logueado
  const router = useRouter(); // Inicializa el router

  return (
    <div className="container grid grid-cols-1 justify-center !mt-20 bg-primary border-2 text-secondary rounded-3xl p-4 shadow-lg shadow-gray-700/40 ">
      <h1 className="text-center mt-5">{course?.title}</h1>
      <div className="mx-auto mb-16">
        <Image
          className="mix-blend-multiply object-contain mx-auto rounded-2xl mt-5"
          src={course?.image_url}
          alt={course?.image_url}
          width={320}
          height={320}
        />

        <div className="md:w-[800px]">
          <p className="py-7 font-bold text-xl text-center">
            {course?.description}
          </p>
          <div className="flex flex-col justify-between items-center">
            <p className="py-1 text-xl text-center">
              Tipo de Curso:{' '}
              {(course.type ?? '').charAt(0).toUpperCase() +
                (course.type ?? '').slice(1)}
            </p>
            <p className="py-1 text-xl text-center">
              Dificultad:{' '}
              {(course.difficulty ?? '').charAt(0).toUpperCase() +
                (course.difficulty ?? '').slice(1)}
            </p>
            <p className="py-1 text-xl text-center">
              Duración: {course.duration} horas
            </p>
            <p className="py-1 text-xl text-center">
              Instructor: {course.instructor}
            </p>
            <div className="text-center">
              {isUserSubscribed ? (
                <Button disabled>Inscribirme</Button>
              ) : (
                <>
                  {isUserLoggedIn ? (
                    <BuyButton course={course} />
                  ) : (
                    <Button onClick={() => router.push('/login')}>
                      Suscribirme
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

// 'use client'

// import { ICourse } from '@/interfaces/Icourse';
// import Image from 'next/image';
// import Button from '../Button/Button';
// import BuyButton from '../BuyButton/BuyButton';
// import { useContext } from 'react';
// import { AuthContext } from '@/contexts/authContext';

// const Detail = (course: ICourse) => {
//   const { user } = useContext(AuthContext);
//   const isUserSubscribed = user?.user?.Subscription?.status_sub === true;

//   return (
//     <div className="container grid grid-cols-1 justify-center !mt-20 bg-primary border-2 text-secondary rounded-3xl p-4 shadow-lg shadow-gray-700/40 ">
//       <h1 className="text-center mt-5">{course?.title}</h1>
//       <div className="mx-auto mb-16">
//         <Image
//           className="mix-blend-multiply object-contain mx-auto rounded-2xl mt-5"
//           src={course?.image_url}
//           alt={course?.image_url}
//           width={320}
//           height={320}
//         />

//         <div className="md:w-[800px]">
//           <p className="py-7 font-bold text-xl text-center">
//             {course?.description}
//           </p>
//           <div className="flex flex-col justify-between items-center">
//             <p className="py-1 text-xl text-center">
//               Tipo de Curso:{' '}
//               {(course.type ?? '').charAt(0).toUpperCase() +
//                 (course.type ?? '').slice(1)}
//             </p>
//             <p className="py-1 text-xl text-center">
//               Dificultad:{' '}
//               {(course.difficulty ?? '').charAt(0).toUpperCase() +
//                 (course.difficulty ?? '').slice(1)}
//             </p>
//             <p className="py-1 text-xl text-center">
//               Duración: {course.duration} horas
//             </p>
//             <p className="py-1 text-xl text-center">
//               Instructor: {course.instructor}
//             </p>
//             <div className="text-center">
//               {isUserSubscribed ? (
//                 <Button disabled>Inscribirme</Button>
//               ) : (
//                 <BuyButton course={course} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Detail;

// import { ICourse } from '@/interfaces/Icourse';
// import Image from 'next/image';
// import Button from '../Button/Button';
// import BuyButton from '../BuyButton/BuyButton';

// const Detail = (course: ICourse) => {
//   return (
//     <div className="container grid grid-cols-1 justify-center !mt-20 bg-primary border-2 text-secondary rounded-3xl p-4 shadow-lg shadow-gray-700/40 ">
//       <h1 className="text-center mt-5">{course.title}</h1>
//       <div className="mx-auto mb-16 ">
//         <Image
//           className="mix-blend-multiply object-contain mx-auto rounded-2xl mt-5"
//           src={course.image_url}
//           alt={course.image_url}
//           width={320}
//           height={320}
//         />

//         <div className=" md:w-[800px]">
//           {/* <p className="text-2xl font-bold text-end">{course.title}</p> */}
//           <p className="py-7 font-bold text-xl text-center">
//             {course.description}
//           </p>
//           <div className="flex flex-col  justify-between items-center ">
//             <p className="py-1 text-xl text-center">
//               Tipo de Curso:{' '}
//               {(course.type ?? '').charAt(0).toUpperCase() +
//                 (course.type ?? '').slice(1)}
//             </p>
//             <p className="py-1 text-xl text-center">
//               {' '}
//               Dificultad:{' '}
//               {(course.difficulty ?? '').charAt(0).toUpperCase() +
//                 (course.difficulty ?? '').slice(1)}
//             </p>
//             <p className="py-1 text-xl text-center">
//               Duración : {course.duration} horas
//             </p>
//             <p className="py-1 text-xl text-center">
//               Instructor: {course.instructor}
//             </p>
//             <div className="text-center ">
//               <BuyButton course={course} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Detail;
