import Detail from '@/components/Detail/Detail';
import { IProduct } from '@/interfaces/Iproduct';
import { getProductById } from '@/services/productsServices';
import { notFound } from 'next/navigation';
import { products } from "@/mock/products"

const page = async ({ params }: { params: { id: string } }) => {
 
  // const url = `${process.env.API_URL}/products`;
  // const response = await fetch(url, { next: { revalidate: 0 } });
  // const products = await response.json();
  // const product = products[0];
  const product = products.filter((product: IProduct) => product.id.toString() === params.id)[0];
  // const product = await getProductById(url, params.id);
  if (product === undefined) {
    notFound();
  }

  return <Detail  {...product} />;
};

export default page;
