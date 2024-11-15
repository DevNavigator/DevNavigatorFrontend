"use client";

import { ICourse } from "@/interfaces/Icourse";
import Image from "next/image";
import Button from "../Button/Button";
import BuyButton from "../BuyButton/BuyButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/services/userService";
import axios from "axios";

const Detail = (course: ICourse) => {
  const { user, userExternal, setUserExternal, setUser } =
    useContext(AuthContext);
  const isUserLoggedIn = !!user || !!userExternal;
  const router = useRouter();
  const [isUserInscript, setIsUserInscript] = useState(false);

  const userId = user?.user?.id || userExternal?.user?.id;
  const token = user?.token || userExternal?.token;
  const isUserExternal = !!userExternal;

  const refreshUser = useCallback(async () => {
    if (!userId || !token) return;

    const data = await fetchUserData(userId, token);

    // Verificar si el usuario ya está inscrito en el curso
    const isUserAlreadyInscript = data.Courses?.some(
      (userCourse: { id: string }) => userCourse.id === course.id
    );
    setIsUserInscript(isUserAlreadyInscript);

    const updatedUser = isUserExternal
      ? {
          ...userExternal,
          user: {
            ...userExternal?.user,
            Subscription: data.Subscription || null,
          },
        }
      : {
          ...user,
          user: {
            ...user?.user,
            Subscription: data.Subscription || null,
          },
        };

    // Verificar si hubo un cambio en la suscripción antes de actualizar
    const currentSubscription = isUserExternal
      ? userExternal?.user?.Subscription?.status_sub
      : user?.user?.Subscription?.status_sub;

    if (
      (isUserExternal &&
        currentSubscription !== data.Subscription?.status_sub) ||
      (!isUserExternal && currentSubscription !== data.Subscription?.status_sub)
    ) {
      // Solo actualizar si hubo un cambio en la suscripción
      if (isUserExternal) {
        setUserExternal(updatedUser);
      } else {
        setUser(updatedUser);
      }
    }
  }, [
    userId,
    token,
    course.id,
    isUserExternal,
    user,
    userExternal,
    setUser,
    setUserExternal,
  ]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const handleOnClick = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await axios.post(
        `${url}/courses/link-user`,
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
