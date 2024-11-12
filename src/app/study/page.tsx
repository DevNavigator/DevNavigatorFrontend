"use client"; // Marca el componente como cliente

import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  content: Video[];
  questions: Question[];
}

interface Video {
  url: string;
  title: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const Study: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videoCompleted, setVideoCompleted] = useState<boolean[]>(
    new Array(10).fill(false)
  );
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${url}/courses`);

        if (!response.ok) {
          throw new Error("Error al cargar los cursos");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("No se pudieron cargar los cursos");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {loading && (
        <p className="text-center text-lg text-blue-500">Cargando cursos...</p>
      )}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      {!loading && !error && courses.length === 0 && (
        <p className="text-center text-lg text-gray-700">
          No hay cursos disponibles.
        </p>
      )}
      {!loading && !error && courses.length > 0 && (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Lista de Cursos
          </h2>
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className="bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-700">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-2">{course.description}</p>

                <div className="mt-6">
                  <h4 className="font-semibold text-lg text-gray-800">
                    Videos
                  </h4>
                  <ul className="space-y-2 mt-2">
                    {course.content.map((video, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer text-blue-500 hover:underline ${
                          videoCompleted[index]
                            ? "line-through text-gray-400"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveVideo(index);
                          setShowQuestions(false);
                          setQuizCompleted(false);
                          setUserAnswers([]);
                        }}
                      >
                        {video.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {activeVideo !== null && (
            <div className="mt-6">
              <iframe
                className="w-full h-64 md:h-96 rounded-lg shadow-lg"
                src={`${courses[0].content[activeVideo].url}?autoplay=1&enablejsapi=1`}
                title={`Video ${activeVideo + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleVideoEnd}
              />
            </div>
          )}

          {showQuestions && activeVideo !== null && (
            <div className="mt-8 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4">Cuestionario</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleQuizSubmit();
                }}
              >
                {courses[0].questions.map((q, index) => (
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
                  {courses[0].questions.map((q, index) => (
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
      )}
    </div>
  );
};

export default Study;
