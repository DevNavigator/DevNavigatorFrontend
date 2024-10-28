"use client";

import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="container grid grid-cols-1 !mb-28 md:flex h-[calc(100vh-70px)] w-screen  md:!mb-16 mx-auto">
      {/* Imagen a la izquierda */}
      <div className=" mb-5 md:w-[calc(400px)] rounded-3xl md:flex-1 md:flex items-center justify-center relative mt-2  shadow-lg shadow-gray-700">
        <div className="w-full h-[calc(200px)] md:h-full">
          <Image
            className="h-[calc(200px)] w-full md:h-full object-cover object-center rounded-3xl"
            sizes="100vw"
            fill
            alt="Image"
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXBvZjhrMHk3bmZvc2d4c3pkdHl3a2t6bzA0ajI5dWE3czJreWttMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qgQUggAC3Pfv687qPC/giphy.gif"
            unoptimized
          />
        </div>
      </div>

      {/* Contenido a la derecha */}
      <div className="  flex-1 flex flex-col justify-center md:p-8">
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <div className="md:mr-2">
              <Image
                width={100}
                height={100}
                src="data:image/svg+xml,%3csvg%20id='icon_bullet_desplegable'%20xmlns='http://www.w3.org/2000/svg'%20width='21.49'%20height='39'%20viewBox='0%200%2021.49%2039'%3e%3cpath%20id='icon_bullet'%20d='M20.893,18.061a2.04,2.04,0,0,1,0,2.885L3.486,38.4h0A2.042,2.042,0,0,1,0,36.955V35.723a2.017,2.017,0,0,1,.594-1.435l3.088-3.11h0L13.846,20.946a2.045,2.045,0,0,0,0-2.877L1.457,5.589h0L.594,4.718A2.035,2.035,0,0,1,0,3.275V2.043A2.042,2.042,0,0,1,3.486.6l7.25,7.272h0Zm-15.274,0L3.486,15.919A2.041,2.041,0,0,0,0,17.362v4.282a2.042,2.042,0,0,0,3.486,1.442L5.62,20.946A2.04,2.04,0,0,0,5.62,18.061Z'%20transform='translate(0%200.001)'%20fill='%23f1f1f1'/%3e%3c/svg%3e"
                alt="rightArrow"
                className="w-5 h-5"
              />
            </div>
            <h2 className="text-xl font-semibold">IT: Cursos Online</h2>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            <span className="block">
              ¡Convertite en Developer <br /> y preparate para el Futuro!
            </span>
          </h1>
          <div className="mb-4">
            <ul className="list-disc pl-5">
              <li>
                <p className="text-base">
                  Desarrollá tu perfil en tecnologías informáticas
                </p>
              </li>
              <li>
                <p className="text-base">
                  Formá parte de nuestra Bolsa de Trabajo
                </p>
              </li>
            </ul>
          </div>
          <div className=" flex justify-center md:justify-normal items-center mt-4">
            <Link href="/courses">
              <Button>Ver Oferta Académica</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
