
"use client"; // Marca el componente como cliente

import { useState } from 'react';

const Study: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  // URLs de los videos
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
    "https://www.youtube.com/embed/lqsVVH5Jb3o"
  ];

  // Descripciones de los videos
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
    "9-Errores y excepciones en PHP - DevNavigator."
  ];

  return (
    <div
      className="grid grid-cols-1 md:flex md:flex-col items-center justify-center  bg-tertiary p-6 "
      style={{ marginTop: '4.1rem' }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        Curso PHP - DevNavigator
      </h1>
      <div className="max-w-4xl w-full  md:flex">
        <div className="flex-1 flex justify-center">
          {activeVideo !== null && (
            <iframe
              className="rounded-2xl mb-4"
              width="100%"
              height="315"
              src={videoUrls[activeVideo]}
              title={`Video ${activeVideo + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="border mb-4 md:border-l-2 border-blue-500 mx-4 md:h-[315px]"></div>

        <div className="flex flex-col ml-4">
          {videoDescriptions.map((description, index) => (
            <a
              key={index}
              onClick={() => setActiveVideo(index)} // Video index
              className="text-blue-500 hover:underline mb-2 cursor-pointer"
            >
              {description}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Study;



