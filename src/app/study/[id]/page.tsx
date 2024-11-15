"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Video {
  url: string;
  title: string;
}

interface Question {
  question: string;
  options: string[];
  correct: number; // Usamos `correct` como índice para la respuesta correcta
}

interface Course {
  id: number;
  title: string;
  description: string;
  image_url: string;
  content: Video[];
  questions: Question[];
}

const StudyPage: React.FC = () => {
  const { id } = useParams(); // Obtiene el ID del curso
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeVideo, setActiveVideo] = useState<number | null>(0);
  const [videoCompleted, setVideoCompleted] = useState<boolean[]>([]);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { user, userExternal } = useContext(AuthContext);
  const { status } = useSession();
  const router = useRouter();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (status === "loading" && typeof window === "undefined") {
      return;
    }
    if (!user && !userExternal) {
      router.push("/login");
    }
  }, [status, user, userExternal, router]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const url =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
          const response = await fetch(`${url}/courses/${id}`);

          const data: Course = await response.json();
          setCourse(data);
          setVideoCompleted(new Array(data.content.length).fill(false));
        } catch (error) {
          console.error("Error fetching course:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourse();
  }, [id]);

  const handleVideoEnd = () => {
    if (activeVideo !== null) {
      const newVideoCompleted = [...videoCompleted];
      newVideoCompleted[activeVideo] = true;
      setVideoCompleted(newVideoCompleted);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    let calculatedPoints = 0;

    if (!course) return;
    course.questions.forEach((q, index) => {
      if (userAnswers[index] === q.correct) {
        calculatedPoints += 10;
      }
    });

    let total = points;
    let pointsToBack = total + calculatedPoints;
    setPoints(calculatedPoints + total);
    sendPoint(pointsToBack);
    setQuizCompleted(true);
  };

  const sendPoint = async (pointBack: number) => {
    const userId = user?.user?.id || userExternal?.user?.id;
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.patch(`${url}/statistics/${userId}/update`, {
        points: pointBack,
        achievements: [{ title: course?.title, date: new Date() }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoOnClick = (index: number) => {
    if (index === 0 || videoCompleted[index - 1]) {
      setActiveVideo(index);
      setShowQuestions(false);
      setQuizCompleted(false);
      setUserAnswers([]);
    }
  };

  const handleShowQuestionsClick = () => {
    if (videoCompleted.every((completed) => completed)) {
      setShowQuestions(true);
      setPoints(100);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Cargando curso...</div>;
  }

  if (!course) {
    return <div className="text-center text-lg">Curso no encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:flex md:flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center mt-20">
        {course.title}
      </h1>
      <div className="max-w-4xl w-full md:flex">
        <div className="flex-1 flex justify-center">
          {activeVideo !== null && (
            <iframe
              className="rounded-2xl shadow-lg mb-4"
              width="100%"
              height="315"
              src={`${course.content[activeVideo].url}?autoplay=1&enablejsapi=1`}
              title={`Video ${activeVideo + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoEnd}
            ></iframe>
          )}
        </div>

        <div className="border-l-2 border-blue-500 mx-4 md:h-[315px] hidden md:block"></div>

        <div className="flex flex-col ml-4">
          {course.content.map((video, index) => (
            <a
              key={index}
              onClick={() => handleVideoOnClick(index)}
              className={`text-secondary hover:underline mb-2 cursor-pointer transition duration-300 ${
                videoCompleted[index]
                  ? "hover:text-blue-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {video.title}
            </a>
          ))}
        </div>
      </div>

      {videoCompleted.every((completed) => completed) && !showQuestions && (
        <div className="mt-8">
          <button
            onClick={handleShowQuestionsClick}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition duration-200"
          >
            Ver Cuestionario
          </button>
        </div>
      )}

      {showQuestions && (
        <div className="mt-8 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Cuestionario</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuizSubmit();
            }}
          >
            {course.questions && course.questions.length > 0 ? (
              course.questions.map((q, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{q.question}</p>
                  {q.options.map((option, optIndex) => {
                    const isSelected = userAnswers[index] === optIndex;

                    return (
                      <label key={optIndex} className="block mb-1">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={optIndex}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(index, optIndex)}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span
                          className={
                            isSelected ? "text-blue-600" : "text-black"
                          }
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ))
            ) : (
              <div>No hay preguntas disponibles.</div>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition duration-200"
            >
              Enviar
            </button>
          </form>

          {quizCompleted && (
            <div className="mt-4">
              <h3 className="font-bold">Resultados:</h3>
              {course.questions.map((q, index) => {
                const isCorrect = userAnswers[index] === q.correct;
                const isIncorrect = userAnswers[index] !== q.correct;
                const correctAnswer = q.options[q.correct];
                const userAnswer = q.options[userAnswers[index]];

                return (
                  <div key={index} className="mb-2">
                    <span className="font-semibold">{q.question}:</span>{" "}
                    {isCorrect ? (
                      <span className="text-blue-600">
                        Correcta: {correctAnswer}
                      </span>
                    ) : (
                      <span className="text-red-600">
                        Incorrecta: {userAnswer}{" "}
                        <span className="text-blue-600">
                          {" "}
                          (Respuesta correcta: {correctAnswer})
                        </span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyPage;
