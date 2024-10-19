import Detail from "@/components/Detail/Detail";
import { getCourseById } from "@/services/productsServices";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;


  const course = await getCourseById(courseId);

  if (!course) {
    notFound(); 
  }

  return <Detail {...course} />;
};

export default page;
