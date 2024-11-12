// import { AuthContext } from "@/contexts/authContext";
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import Image from "next/image";

// interface Video {
//   url: string;
//   title: string;
// }

// interface Question {
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

// interface Course {
//   id: string; // Cambiado a string para coincidir con UUID
//   title: string;
//   description: string;
//   image_url: string;
//   content: Video[];
//   questions: Question[];
// }

// const CourseDetail: React.FC = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [userAnswers, setUserAnswers] = useState<{
//     [questionIndex: number]: string;
//   }>({});
//   const [feedback, setFeedback] = useState<{ [index: number]: string }>({});
//   const [error, setError] = useState<string | null>(null); // Para manejar errores

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
//         const response = await fetch(`${url}/courses/${courseId}`);
//         if (!response.ok) {
//           throw new Error("Curso no encontrado");
//         }
//         const data: Course = await response.json();
//         setCourse(data);
//       } catch (error: any) {
//         console.error("Error fetching course:", error);
//         setError(error.message); // Guardar mensaje de error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   const handleAnswerChange = (questionIndex: number, answer: string) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [questionIndex]: answer,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!course) return;

//     const correctAnswers = course.questions.map((q) => q.correctAnswer);
//     const feedbackObj: { [index: number]: string } = {};

//     course.questions.forEach((question, index) => {
//       const userAnswer = userAnswers[index];
//       const correctAnswer = correctAnswers[index];

//       if (userAnswer === correctAnswer) {
//         feedbackObj[index] = "Correcto";
//       } else {
//         feedbackObj[
//           index
//         ] = `Incorrecto. La respuesta correcta es: ${correctAnswer}`;
//       }
//     });

//     setFeedback(feedbackObj);
//   };

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!course) {
//     return <div>Curso no encontrado</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
//       <Image
//         src={course.image_url}
//         alt={course.title}
//         className="rounded-lg mb-2"
//       />
//       <p className="mb-2">{course.description}</p>

//       <h3 className="font-bold mt-4">Videos</h3>
//       <ul className="list-disc ml-5 mb-4">
//         {course.content.map((video, index) => (
//           <li key={index}>
//             <a
//               href={video.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               {video.title}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <h3 className="font-bold mt-4">Preguntas</h3>
//       <ul className="list-disc ml-5">
//         {course.questions.map((question, index) => (
//           <li key={index} className="mb-2">
//             {question.question}
//             <ul className="list-disc ml-5">
//               {question.options.map((option, idx) => (
//                 <li key={idx} className="flex items-center">
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     onChange={() => handleAnswerChange(index, option)}
//                     checked={userAnswers[index] === option}
//                   />
//                   {option}
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//       <button
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={handleSubmit}
//       >
//         Enviar Respuestas
//       </button>

//       {Object.keys(feedback).length > 0 && (
//         <div className="mt-4">
//           {Object.entries(feedback).map(([index, message]) => (
//             <div key={index} className="text-sm text-gray-600">
//               {message}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseDetail;
