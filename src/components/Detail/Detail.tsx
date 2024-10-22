import { ICourse } from '@/interfaces/Icourse';
import Image from 'next/image';
import Button from '../Button/Button';
import BuyButton from '../BuyButton/BuyButton';

const Detail = (course: ICourse) => {
  return (
    <div className="container grid grid-cols-1 justify-center !mt-20 ">
      <h1 className="text-center">{course.title}</h1>
      <div className="mx-auto mb-16 ">
        <Image
          className="mix-blend-multiply object-contain mx-auto rounded-2xl mt-5"
          src={course.image_url}
          alt={course.image_url}
          width={320}
          height={320}
        />

        <div className=" md:w-[800px]">
          {/* <p className="text-2xl font-bold text-end">{course.title}</p> */}
          <p className="py-4 text-xl text-center">{course.description}</p>
          <div className="text-center ">       
            <BuyButton course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

// import { ICourse } from '@/interfaces/Icourse';
// import Image from 'next/image';
// import BuyButton from '../BuyButton/BuyButton';

// const Detail = (course: ICourse) => {
//   return (
//     <div className="container !mt-24">
//       <h1>{course.title}</h1>
//       <div className="flex flex-col gap-24 mb-16 md:flex-row">
//         <Image
//           className="mix-blend-multiply object-contain rounded mt-5"
//           src={course.image_url}
//           alt={course.image_url}
//           width={320}
//           height={320}
//         />

//         <div className="flex flex-col gap-4 md:w-[800px]">
//           <p className="text-2xl font-bold text-end">U$S {product.name}</p>
//           <div className="flex justify-between items-center ">
//             <p className="text-end font-bold pr-1 ">{} uni. En stock</p>
//             <BuyButton corse={} />
//           </div>
//           <p className="py-4 text-xl">{product.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Detail;
