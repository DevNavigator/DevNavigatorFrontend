import Card from '@/components/Card/Card';
import CardList from '@/components/CardList/CardList';
import { products } from '../../mock/products';
import style from './page.module.css';
import { IProduct } from '@/interfaces/Iproduct';
import { getProducts } from '@/services/productsServices';

const page = async () => {
  //const url = process.env.API_URL + '/products';
  // const response = await fetch(url, { next: { revalidate: 0 } });
  // const products: IProduct[] = await response.json();  
  //const products = await getProducts(url);
  return (
    <main className="!mt-24 mb-10">
      <CardList>
        {products.map((product: IProduct, i: number) => (
          <Card
            key={i}
            product={product}
          />
        ))}
      </CardList>
    </main>
  );
};

export default page;

/* className={`container ${style.container}`} */
