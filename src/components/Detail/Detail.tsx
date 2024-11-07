"use client";

import { ICourse } from "@/interfaces/Icourse";
import Image from "next/image";
import Button from "../Button/Button";
import BuyButton from "../BuyButton/BuyButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation"; // Asegúrate de importar useRouter
import { fetchUserData } from "@/services/userService";
import axios from "axios";

const Detail = (course: ICourse) => {
  const { user, userExternal, setUserExternal, setUser } =
    useContext(AuthContext);
  const isUserLoggedIn = !!user || !!userExternal;
  const router = useRouter(); // Inicializa el router
  const [isUserInscript, setIsUserInscript] = useState(false);
  let userId = user?.user?.id;
  let token = user?.token;
  let isUserExternal = false;

  if (user?.user?.id) {
    userId = user.user.id;
    token = user?.token;
  } else {
    if (userExternal?.user?.id) {
      isUserExternal = true;
      userId = userExternal.user.id;
      token = userExternal.token;
    }
  }

  useEffect(() => {
    const refreshUser = async () => {
      if (!userId || !token) return;

      const data = await fetchUserData(userId, token);
      console.log(data);

      if (data.Courses) {
        const isUserAlreadyInscript = data.Courses.some(
          (userCourse: { id: string }) => userCourse.id === course.id
        );
        setIsUserInscript(isUserAlreadyInscript);
      }
      let updatedUser;
      if (isUserExternal) {
        updatedUser = {
          ...userExternal,
          user: {
            ...userExternal?.user,
            Subscription: data.Subscription
              ? {
                  id: data.Subscription.id,
                  start_sub: data.Subscription.start_sub,
                  end_sub: data.Subscription.end_sub,
                  status_sub: data.Subscription.status_sub,
                }
              : null,
          },
        };
      } else {
        updatedUser = {
          ...user,
          user: {
            ...user?.user,
            Subscription: data.Subscription
              ? {
                  id: data.Subscription.id,
                  start_sub: data.Subscription.start_sub,
                  end_sub: data.Subscription.end_sub,
                  status_sub: data.Subscription.status_sub,
                }
              : null,
          },
        };
      }

      if (isUserExternal) {
        setUserExternal(updatedUser);
      }
      if (!isUserExternal) {
        setUser(updatedUser);
      }
    };
    refreshUser();
  }, [
    userId,
    token,
    isUserExternal,
    course.id,
    user,
    userExternal,
    setUser,
    setUserExternal,
  ]);

  const handleOnClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/courses/link-user",
        {
          userId,
          courseId: course.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        router.push(`/study/${course.id}`);
      }
    } catch (error) {
      console.error("Error al inscribir al usuario", error);
    }
  };

  const isUserSubscribed =
    (isUserExternal
      ? userExternal?.user?.Subscription?.status_sub
      : user?.user?.Subscription?.status_sub) === true;

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
              Tipo de Curso:{" "}
              {(course.type ?? "").charAt(0).toUpperCase() +
                (course.type ?? "").slice(1)}
            </p>
            <p className="py-1 text-xl text-center">
              Dificultad:{" "}
              {(course.difficulty ?? "").charAt(0).toUpperCase() +
                (course.difficulty ?? "").slice(1)}
            </p>
            <p className="py-1 text-xl text-center">
              Duración: {course.duration} horas
            </p>
            <p className="py-1 text-xl text-center">
              Instructor: {course.instructor}
            </p>
            <div className="text-center">
              {isUserSubscribed ? (
                isUserInscript ? (
                  <Button onClick={() => router.push(`/study/${course.id}`)}>
                    Ver Curso
                  </Button>
                ) : (
                  <Button onClick={handleOnClick}>Inscribirme</Button>
                )
              ) : (
                <>
                  {isUserLoggedIn ? (
                    <BuyButton course={course} />
                  ) : (
                    <Button onClick={() => router.push("/login")}>
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
