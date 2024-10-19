// rafce para colocar un atajo para crear un componente

import Card from '@/components/Card/Card';
import CardList from '@/components/CardList/CardList';
import Hero from '@/components/Hero/Hero';
import { ICourse } from '@/interfaces/Icourse';
import { getCourse } from '@/services/productsServices';


const page = async () => {
  const url = `${process.env.API_URL}/courses`; 
  const courses = await getCourse(url); 
  // const featuredProducts = course.slice(0, 3);

  return (
    <div style={{ marginTop: '4.1rem' }}>
      <Hero />
      <CardList className="!mb-7">
        {courses.map((course: ICourse, i: number) => (
          <Card
            key={i}
            course={course}
          />
        ))}
      </CardList>
    </div>
  );
};

export default page;
