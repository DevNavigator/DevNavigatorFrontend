"use client"; // Añade esta línea al principio del archivo

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Usa useParams para obtener parámetros de la URL
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/contexts/authContext";

interface Video {
  url: string;
  title: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // Cambiado a number para referencia de índice
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
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videoCompleted, setVideoCompleted] = useState<boolean[]>([]);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3001/courses/${id}`);
          const data: Course = await response.json();
          setCourse(data);
          setVideoCompleted(new Array(data.content.length).fill(false)); // Inicializar videoCompleted
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
      setShowQuestions(true);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    setQuizCompleted(true);
  };

  if (loading) {
    return <div className="text-center text-lg">Cargando curso...</div>;
  }

  if (!course) {
    return <div className="text-center text-lg">Curso no encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:flex md:flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">{course.title}</h1>
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
              onLoad={() => handleVideoEnd()} // Asegúrate de manejar el fin de video
            ></iframe>
          )}
        </div>

        <div className="border-l-2 border-blue-500 mx-4 md:h-[315px] hidden md:block"></div>

        <div className="flex flex-col ml-4">
          {course.content.map((video, index) => (
            <a
              key={index}
              onClick={() => {
                setActiveVideo(index);
                setShowQuestions(false);
                setQuizCompleted(false);
                setUserAnswers([]);
              }}
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

      {showQuestions && activeVideo !== null && (
        <div className="mt-8 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Cuestionario</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuizSubmit();
            }}
          >
            {course.questions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{q.question}</p>
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="block mb-1">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optIndex}
                      checked={userAnswers[index] === optIndex}
                      onChange={() => handleAnswerChange(index, optIndex)}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
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
              {course.questions.map((q, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{q.question}</span>:{" "}
                  {q.options[q.correctAnswer]}
                  {userAnswers[index] !== undefined &&
                    userAnswers[index] !== q.correctAnswer && (
                      <span className="text-red-500">
                        {" "}
                        (Tu respuesta: {q.options[userAnswers[index]]})
                      </span>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyPage;
