import { ICourse } from "@/interfaces/Icourse";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  course: ICourse;
}

const Card = ({ course }: ProductProps) => {
  return (
    <div className="bg-primary border text-secondary rounded-3xl p-4 flex flex-col  hover:border-secondary hover:shadow-lg hover:shadow-gray-400">
      <Link href={`/products/${course.id}`} className=" ">
        <div className="flex justify-between items-center">
          <h3>{course.title}</h3>
          <p className="text-secondary text-base">
            Suscripción {course.status_courses}
          </p>
        </div>
        <div className="flex justify-center my-auto  h-[280px] ">
          <Image
            className="mix-blend-multiply content-center object-contain hover:scale-105"
            src={course.image_url}
            alt={course.title}
            width={200}
            height={200}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
