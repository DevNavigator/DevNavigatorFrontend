import Card from '@/components/Card/Card';
import CardList from '@/components/CardList/CardList';
import style from './page.module.css';
import { ICourse } from '@/interfaces/Icourse';
import { getCourse } from '@/services/coursesServices';

const page = async () => {
  const url = `${process.env.API_URL}/courses`;
  const courses = await getCourse(url);

  return (
    <main className={`container ${style.container}`}>
      <CardList>
        {courses.map((course: ICourse, i: number) => (
          <Card
            key={i}
            course={course}
          />
        ))}
      </CardList>
    </main>
  );
};

export default page;
