// rafce para colocar un atajo para crear un componente

import Card from '@/components/Card/Card';
import CardList from '@/components/CardList/CardList';
import Hero from '@/components/Hero/Hero';
import { IProduct } from '@/interfaces/Iproduct';
import { getProducts } from '@/services/productsServices';
import { products } from '@/mock/products';

const page = async () => {
 // const url = `${process.env.API_URL}/products`;
  //const products = await getProducts(url);
  const featuredProducts = products.slice(0, 3);

  return (
    <div style={{ marginTop: '4.1rem' }}>
      <Hero />
      <CardList className="!mb-7">
        {featuredProducts.map((product: IProduct, i: number) => (
          <Card
            key={i}
            product={product}
          />
        ))}
      </CardList>
    </div>
  );
};

export default page;
