import { IProduct } from "@/interfaces/Iproduct";
import Image from 'next/image'
import Button from '../Button/Button'
import BuyButton from "../BuyButton/BuyButton";


const Detail = ( product: IProduct ) => {
  return (
    <div className="container !mt-20 ">
      <h1>{product.name}</h1>
      <div className=" flex flex-col gap-10 mb-16 md:flex-row">
        <Image
          className="mix-blend-multiply object-contain"
          src={product.image}
          alt={product.name}
          width={320}
          height={320}
        />

        <div className="flex flex-col gap-4 md:w-[800px]">
          <p className="text-2xl font-bold text-end">U$S {product.price}</p>
          <div className="flex justify-between items-center ">
            <p className="text-end font-bold pr-1 ">{product.stock} uni. En stock</p>
            <BuyButton product={product}/>
          </div>
          <p className="py-4 text-xl">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail