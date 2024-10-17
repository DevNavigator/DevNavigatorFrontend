import { div } from "framer-motion/client";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="container" style={{ marginTop: "6.1rem" }}>
      <div className="max-w-4xl mb-16 mx-auto bg-primary rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary p-6 text-secondary flex items-center justify-center border-b border-b-secondary">
          <h1 className="text-3xl font-bold text-secondary">Sobre Nosotros</h1>
        </div>
        <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-secondary">Nuestra Misión</h2>
          <p className="mt-4 text-lg text-secondary">
            En <b>Dev Navigator</b>, nos dedicamos a ofrecer la más alta calidad
            en productos tecnológicos, inspirados en la innovación y el diseño
            de marcas líderes como el <b>Google</b>. Nuestra misión es brindar a
            nuestros clientes una experiencia de compra excepcional, combinando
            productos de última generación con un servicio al cliente
            insuperable. Creemos en la importancia de la tecnología en la vida
            diaria y trabajamos para facilitar el acceso a herramientas que
            mejoren la productividad y el conocimiento. Comprometidos con la
            sostenibilidad, buscamos ofrecer soluciones que no solo transformen
            vidas.
          </p>
        </div>
        <h2 className="text-2xl text-center font-bold text-secondary">
          Nuestro Equipo
        </h2>
        <div className="bg-primary p-6 text-secondary flex flex-col items-center justify-center">
          <div className="mt-4 w-auto">
            <div className=" grid grid-col-3 gap-4 md:grid-cols-3">
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-secondary font-medium">
                  John - CEO
                </span>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-secondary font-medium">
                  Mauricio - CEO
                </span>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-secondary font-medium">
                  Damian - CEO
                </span>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-secondary font-medium">
                  Jorge - CEO
                </span>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-secondary font-medium">
                  German - CEO
                </span>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-secondary font-medium">
                  Thom - CEO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
