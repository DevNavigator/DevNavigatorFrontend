"use client"; // Marca el componente como cliente

import { useEffect, useState } from "react";

const Study: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videoCompleted, setVideoCompleted] = useState<boolean[]>(
    new Array(10).fill(false)
  );
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const videoUrls = [
    "https://www.youtube.com/embed/qUei-wOdbnw",
    "https://www.youtube.com/embed/cV_dFN9UFao",
    "https://www.youtube.com/embed/jQ2ph0eP4D4",
    "https://www.youtube.com/embed/y3UpXb2liI0",
    "https://www.youtube.com/embed/nVm5MbmUlnA",
    "https://www.youtube.com/embed/QAm2A3ALB1o",
    "https://www.youtube.com/embed/Gc6hDHsSdSI",
    "https://www.youtube.com/embed/oZep0vGtCxY",
    "https://www.youtube.com/embed/mbE1gJH_HW4",
    "https://www.youtube.com/embed/lqsVVH5Jb3o",
  ];

  const videoDescriptions = [
    "1-Introducción al curso en PHP - DevNavigator.",
    "2-Tipos de Variables y Constantes en PHP - DevNavigator.",
    "3-Operadores en PHP - DevNavigator.",
    "4.1-Estructuras de control en PHP - DevNavigator.",
    "4.2-Estructuras de control en PHP - DevNavigator.",
    "5-Arrays en PHP - DevNavigator.",
    "6-Funciones en PHP - DevNavigator.",
    "7-Funciones, clases y objetos en PHP - DevNavigator.",
    "8-Funciones, clases y objetos en PHP - DevNavigator.",
    "9-Errores y excepciones en PHP - DevNavigator.",
  ];

  const videoQuestions = [
    [
      {
        question: "¿Qué es PHP?",
        options: [
          "Un lenguaje de programación",
          "Un sistema operativo",
          "Un editor de texto",
          "Una base de datos",
        ],
        correct: 0,
      },
      {
        question: "¿Qué se puede hacer con PHP?",
        options: [
          "Desarrollar aplicaciones web",
          "Crear videojuegos",
          "Diseñar gráficos",
          "Ninguna de las anteriores",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo se ejecuta un script PHP?",
        options: [
          "En el servidor",
          "En el navegador",
          "En la base de datos",
          "Ninguna de las anteriores",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es un framework en PHP?",
        options: [
          "Conjunto de herramientas",
          "Un lenguaje de programación",
          "Un tipo de base de datos",
          "Ninguna de las anteriores",
        ],
        correct: 0,
      },
      {
        question: "¿PHP es un lenguaje compilado o interpretado?",
        options: ["Interpretado", "Compilado", "Ambos", "Ninguno"],
        correct: 0,
      },
    ],
    [
      {
        question: "¿Qué es una variable en PHP?",
        options: [
          "Un contenedor de datos",
          "Una constante",
          "Una función",
          "Un tipo de dato",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo se declara una variable en PHP?",
        options: [
          "$variableName",
          "var variableName",
          "let variableName",
          "const variableName",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es una constante en PHP?",
        options: [
          "Una variable que no cambia",
          "Un tipo de dato",
          "Una función",
          "Un bucle",
        ],
        correct: 0,
      },
      {
        question: "¿Cuáles son los tipos de datos en PHP?",
        options: [
          "String, int, bool",
          "Object, array, float",
          "Ambos",
          "Ninguno",
        ],
        correct: 2,
      },
      {
        question: "¿Qué son las variables superglobales?",
        options: [
          "Variables que son globales",
          "Variables locales",
          "Variables temporales",
          "Variables de sesión",
        ],
        correct: 0,
      },
    ],
    [
      {
        question: "¿Qué son los operadores en PHP?",
        options: [
          "Símbolos que realizan operaciones",
          "Funciones",
          "Variables",
          "Clases",
        ],
        correct: 0,
      },
      {
        question: "¿Cuáles son los tipos de operadores?",
        options: [
          "Aritméticos, de comparación",
          "Lógicos, de asignación",
          "Ambos",
          "Ninguno",
        ],
        correct: 2,
      },
      {
        question: "¿Qué hace el operador '=='?",
        options: ["Compara valores", "Asigna valores", "Suma", "Resta"],
        correct: 0,
      },
      {
        question: "¿Qué hace el operador '==='?",
        options: ["Compara tipos y valores", "Suma", "Resta", "Ninguno"],
        correct: 0,
      },
      {
        question: "¿Qué son los operadores lógicos?",
        options: [
          "Y, O, NO",
          "Suma, Resta",
          "Multiplicación, División",
          "Comparación",
        ],
        correct: 0,
      },
    ],
    [
      {
        question: "¿Qué es una estructura de control?",
        options: [
          "Permite tomar decisiones",
          "Un tipo de variable",
          "Una función",
          "Un bucle",
        ],
        correct: 0,
      },
      {
        question: "¿Cuáles son las estructuras de control más comunes?",
        options: ["If, switch", "For, while", "Ambos", "Ninguno"],
        correct: 2,
      },
      {
        question: "¿Cómo se usa un bucle for?",
        options: [
          "for (i=0; i<10; i++)",
          "foreach (item)",
          "while (i<10)",
          "if (condition)",
        ],
        correct: 0,
      },
      {
        question: "¿Qué hace el bloque else?",
        options: [
          "Ejecuta código si la condición es falsa",
          "Ejecuta código si la condición es verdadera",
          "Ninguno",
          "Ambos",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es un bucle while?",
        options: [
          "Ejecuta código mientras la condición sea verdadera",
          "Ejecuta código un número determinado de veces",
          "Ninguno",
          "Ambos",
        ],
        correct: 0,
      },
    ],
    [
      {
        question:
          "¿Cuál es la función de una estructura de control en un programa?",
        options: [
          "Organizar el código",
          "Tomar decisiones basadas en condiciones",
          "Definir funciones",
          "Gestionar errores",
        ],
        correct: 1,
      },
      {
        question: "¿Qué hace un bucle 'for'?",
        options: [
          "Itera sobre un rango de valores",
          "Verifica condiciones",
          "Ejecuta una sola vez",
          "Ninguna de las anteriores",
        ],
        correct: 0,
      },
      {
        question: "¿Cuál es la diferencia principal entre 'if' y 'switch'?",
        options: [
          "No hay diferencia",
          "Switch evalúa una sola expresión",
          "If no permite múltiples condiciones",
          "Switch es más lento",
        ],
        correct: 1,
      },
      {
        question:
          "¿Qué operador se usa para comparar igualdad estricta en condiciones?",
        options: ["==", "=", "===", "!="],
        correct: 2,
      },
      {
        question: "¿Qué hace la instrucción 'continue' en un bucle?",
        options: [
          "Termina el bucle",
          "Sigue con la siguiente iteración",
          "Reinicia el bucle",
          "Ninguna de las anteriores",
        ],
        correct: 1,
      },
    ],
    [
      {
        question: "¿Qué es un array en PHP?",
        options: [
          "Estructura que almacena múltiples valores",
          "Variable simple",
          "Tipo de dato",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo se declara un array en PHP?",
        options: [
          "$array = []",
          "$array = array()",
          "$array = new Array()",
          "Ambos",
        ],
        correct: 3,
      },
      {
        question: "¿Cómo se accede a un elemento de un array?",
        options: ["$array[0]", "$array.0", "array[0]", "Ninguno"],
        correct: 0,
      },
      {
        question: "¿Qué es un array asociativo?",
        options: [
          "Array con claves y valores",
          "Array numérico",
          "Array vacío",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo puedes contar los elementos de un array?",
        options: ["count($array)", "sizeof($array)", "Ambos", "Ninguno"],
        correct: 2,
      },
    ],
    [
      {
        question: "¿Qué es una función en PHP?",
        options: [
          "Bloque de código reutilizable",
          "Variable",
          "Clase",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo se define una función en PHP?",
        options: [
          "function name() {}",
          "def name() {}",
          "func name() {}",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es el alcance de una variable?",
        options: [
          "Visibilidad de la variable",
          "Tipo de dato",
          "Operador",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué son las funciones anónimas?",
        options: [
          "Funciones sin nombre",
          "Funciones sin parámetros",
          "Funciones que devuelven valores",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es un callback en PHP?",
        options: [
          "Función pasada como argumento",
          "Una variable",
          "Un tipo de dato",
          "Ninguno",
        ],
        correct: 0,
      },
    ],
    [
      {
        question: "¿Qué son clases y objetos?",
        options: [
          "Plantillas para crear objetos",
          "Funciones",
          "Variables",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo se define una clase en PHP?",
        options: [
          "class ClassName {}",
          "def ClassName {}",
          "function ClassName {}",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es un método?",
        options: [
          "Función dentro de una clase",
          "Variable",
          "Objeto",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es la herencia?",
        options: [
          "Capacidad de una clase de heredar propiedades",
          "Método",
          "Variable",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué son los traits?",
        options: [
          "Reutilización de métodos en varias clases",
          "Clase base",
          "Objeto",
          "Ninguno",
        ],
        correct: 0,
      },
    ],
    [
      {
        question: "¿Qué es un objeto en PHP?",
        options: ["Instancia de una clase", "Variable", "Función", "Ninguno"],
        correct: 0,
      },
      {
        question: "¿Cómo se crea un objeto?",
        options: [
          "$obj = new ClassName()",
          "$obj = ClassName()",
          "$obj = create ClassName()",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es un constructor?",
        options: [
          "Método especial que inicializa un objeto",
          "Variable",
          "Método",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es la encapsulación?",
        options: [
          "Protección de propiedades y métodos",
          "Clase",
          "Variable",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué son los métodos estáticos?",
        options: [
          "Métodos que pertenecen a la clase en lugar de a un objeto",
          "Funciones",
          "Variables",
          "Ninguno",
        ],
        correct: 0,
      },
    ],
    [
      {
        question: "¿Qué es un error en PHP?",
        options: [
          "Problema en el código que impide su ejecución",
          "Variable",
          "Método",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué son las excepciones?",
        options: [
          "Errores que se pueden manejar",
          "Variables",
          "Funciones",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Cómo se maneja una excepción?",
        options: ["try-catch", "if-else", "switch", "Ninguno"],
        correct: 0,
      },
      {
        question: "¿Qué es un error fatal?",
        options: [
          "Error que detiene la ejecución",
          "Advertencia",
          "Notificación",
          "Ninguno",
        ],
        correct: 0,
      },
      {
        question: "¿Qué son los logs de errores?",
        options: [
          "Registro de errores ocurridos",
          "Variables",
          "Métodos",
          "Ninguno",
        ],
        correct: 0,
      },
    ],
  ];

  const handleVideoEnd = () => {
    if (activeVideo !== null) {
      const newVideoCompleted = [...videoCompleted];
      newVideoCompleted[activeVideo] = true;
      setVideoCompleted(newVideoCompleted);
      setShowQuestions(true);
    }
  };

  useEffect(() => {
    if (activeVideo !== null) {
      const player = new window.YT.Player(`youtube-player-${activeVideo}`, {
        events: {
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              handleVideoEnd();
            }
          },
        },
      });
    }
  }, [activeVideo]);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    };
    loadYouTubeAPI();
  }, []);

  const handleQuizSubmit = () => {
    setQuizCompleted(true);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  return (
    <div
      className="grid grid-cols-1 md:flex md:flex-col items-center justify-center bg-gray-100 p-6"
      style={{ marginTop: "4.1rem" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center  text-secondary">
        Curso PHP - DevNavigator
      </h1>
      <div className="max-w-4xl w-full md:flex">
        <div className="flex-1 flex justify-center">
          {activeVideo !== null && (
            <iframe
              id={`youtube-player-${activeVideo}`}
              className="rounded-2xl shadow-lg mb-4"
              width="100%"
              height="315"
              src={`${videoUrls[activeVideo]}?autoplay=1&enablejsapi=1`}
              title={`Video ${activeVideo + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="border-l-2 border-blue-500 mx-4 md:h-[315px] hidden md:block"></div>

        <div className="flex flex-col ml-4">
          {videoDescriptions.map((description, index) => (
            <a
              key={index}
              onClick={() => {
                if (index === 0 || videoCompleted[index - 1]) {
                  setActiveVideo(index);
                  setShowQuestions(false);
                  setQuizCompleted(false);
                  setUserAnswers([]);
                }
              }}
              className={` text-secondary hover:underline mb-2 cursor-pointer transition duration-300 ${
                index > 0 && !videoCompleted[index - 1]
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-700"
              }`}
            >
              {description}
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
            {videoQuestions[activeVideo].map((q, index) => (
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
              <h3 className="font-bold">Respuestas Correctas:</h3>
              {videoQuestions[activeVideo].map((q, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{q.question}</span>:{" "}
                  {q.options[q.correct]}
                  {userAnswers[index] !== undefined &&
                    userAnswers[index] !== q.correct && (
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

export default Study;
