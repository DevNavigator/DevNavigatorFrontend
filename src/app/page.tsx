// rafce para colocar un atajo para crear un componente

import Card from '@/components/Card/Card';
import CardList from '@/components/CardList/CardList';
import Hero from '@/components/Hero/Hero';
import { ICourse } from '@/interfaces/Icourse';
import { getProducts } from '@/services/productsServices';
import { course } from '@/mock/products';

const page = async () => {
 // const url = `${process.env.API_URL}/products`;
  //const products = await getProducts(url);
  const featuredProducts = course.slice(0, 3);

  return (
    <div style={{ marginTop: '4.1rem' }}>
      <Hero />
      <CardList className="!mt-7 !mb-7">
        {featuredProducts.map((product: ICourse, i: number) => (
          <Card
            key={i}
            course={product}
          />
        ))}
      </CardList>
    </div>
  );
};

export default page;
