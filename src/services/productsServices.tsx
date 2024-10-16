import { IProduct } from "@/interfaces/Iproduct";


export const getProducts = async (url: string): Promise<IProduct[]> => {
    const response = await fetch(url, { next: { revalidate: 0 } });
    const products: IProduct[] = await response.json();
    return products;
}

export const getProductById = async (url: string, id: string): Promise<IProduct> => {
    const response = await getProducts(url);
    const product: IProduct = response.filter((product: IProduct) => product.id.toString() === id)[0];
    return product;
}