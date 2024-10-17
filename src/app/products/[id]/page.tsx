import Detail from '@/components/Detail/Detail';
import { ICourse } from '@/interfaces/Icourse';
import { getProductById } from '@/services/productsServices';
import { notFound } from 'next/navigation';
import { course } from "@/mock/products"

const page = async ({ params }: { params: { id: string } }) => {
 
  // const url = `${process.env.API_URL}/products`;
  // const response = await fetch(url, { next: { revalidate: 0 } });
  // const products = await response.json();
  // const product = products[0];
  const courses = course.filter((course: ICourse) => course.id.toString() === params.id)[0];
  // const product = await getProductById(url, params.id);
  if (course === undefined) {
    notFound();
  }

  return <Detail  {...courses} />;
};

export default page;
