import { ICourse } from "@/interfaces/Icourse";
import Image from "next/image";
import Button from "../Button/Button";
import BuyButton from "../BuyButton/BuyButton";

const Detail = (course: ICourse) => {
  return (
    <div className="container !mt-20 ">
      <h1>{course.title}</h1>
      <div className=" flex flex-col gap-10 mb-16 md:flex-row">
        <Image
          className="mix-blend-multiply object-contain rounded mt-5"
          src={course.image_url}
          alt={course.image_url}
          width={320}
          height={320}
        />

        <div className="flex flex-col gap-4 md:w-[800px] mt-5">
          <div className="flex justify-between items-center ">
            <p className="text-end font-bold pr-1">{course.type}</p>
          </div>
          <p className="py-4 text-xl">{course.description}</p>
          <BuyButton course={course} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
