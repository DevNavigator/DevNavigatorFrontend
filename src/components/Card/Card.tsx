import { IProduct } from '@/interfaces/Iproduct';
import Link from 'next/link';
import Image from 'next/image';

interface ProductProps {
  product: IProduct;
}

const Card = ({ product }: ProductProps) => {
  return (
    <div className="bg-primary border text-secondary rounded-3xl p-4 flex flex-col  hover:border-secondary hover:shadow-lg hover:shadow-gray-400">
      <Link
        href={`/products/${product.id}`}
        className=" "
      >
        <div className="flex justify-between items-center">
          <h3>{product.name}</h3>
          <p className="text-secondary text-base">Suscripción {product.suscription}</p>
        </div>
        <div className="flex justify-center my-auto  h-[280px] ">
          <Image
            className="mix-blend-multiply content-center object-contain hover:scale-110"
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
