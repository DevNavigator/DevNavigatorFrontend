import Detail from '@/components/Detail/Detail';
import { getCourseById } from '@/services/coursesServices';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; // Asegúrate de esperar a params
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <Detail {...course} />;
};

export default page;
