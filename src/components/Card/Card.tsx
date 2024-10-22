import { ICourse } from '@/interfaces/Icourse';
import Link from 'next/link';
import Image from 'next/image';

interface ProductProps {
  course: ICourse;
}

const Card = ({ course }: ProductProps) => {
  return (
    <div className="w-[240px] mx-auto bg-primary border-2 text-secondary rounded-3xl p-4 flex flex-col shadow-lg shadow-gray-700/40 hover:border-secondary hover:shadow-lg hover:shadow-gray-400 hover:scale-105 ease-in-out   duration-200">
      <Link href={`/courses/${course.id}`}>
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
            Más Información {course.status_courses}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
