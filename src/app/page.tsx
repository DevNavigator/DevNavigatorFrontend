// rafce para colocar un atajo para crear un componente

import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import Hero from "@/components/Hero/Hero";
import { ICourse } from "@/interfaces/Icourse";
import { getCourse } from "@/services/coursesServices";

const page = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const courses = await getCourse(`${url}/courses`);
  const fistCourses = courses.slice(0, 3);

  return (
    <div style={{ marginTop: "4.1rem" }}>
      <Hero />
      <main className={`container mx-auto `}>
        <CardList className="!mb-7">
          {fistCourses.map((course: ICourse, i: number) => (
            <Card key={i} course={course} />
          ))}
        </CardList>
      </main>
    </div>
  );
};

export default page;
