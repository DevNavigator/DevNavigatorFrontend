import { ICourse } from "@/interfaces/Icourse";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";

interface ProductProps {
  course: ICourse;
}
export const MiCurso = ({ course }: ProductProps) => {
  return (
    <div className="w-[240px] mx-auto bg-primary border-2 text-secondary rounded-3xl p-4 flex flex-col shadow-lg shadow-gray-700/40 hover:border-secondary hover:shadow-lg hover:shadow-gray-400 hover:scale-105 ease-in-out   duration-200">
      <Link href={`/study/${course.id}`}>
        <div className="!rounded-lg flex justify-center my-auto h-[185px]">
          <Image
            className="mix-blend-multiply content-center object-contain hover:scale-105 ease-in-out duration-300 "
            src={course.image_url}
            alt={course.title}
            width={180}
            height={200}
          />
        </div>
        <div className="grid grid-cols-1 items-center h-[200px]">
          <h3
            //data-tip={course.title} // Usa data-tip para el tooltip overflow-hidden text-ellipsis whitespace-nowrap
            className=""
          >
            {course.title}
          </h3>
          <p className="text-secondary text-base">
            <span className="text-">Tipo de curso: </span>
            {(course.type ?? "").charAt(0).toUpperCase() +
              (course.type ?? "").slice(1)}
          </p>
          <p className="text-secondary text-base">
            Dificultad:{" "}
            {(course.difficulty ?? "").charAt(0).toUpperCase() +
              (course.difficulty ?? "").slice(1)}
          </p>
          <Button className="hover:scale-95">Ver Curso</Button>
        </div>
      </Link>
    </div>
  );
};
