"use client";
import Detail from "@/components/Detail/Detail";
import { ICourse } from "@/interfaces/Icourse";
import { getCourseById } from "@/services/coursesServices";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(id);
        if (!courseData) {
          notFound();
        } else {
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        notFound();
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);
  if (!course) {
    return <div>Loading...</div>;
  }

  return <Detail {...course} />;
};
export default Page;
