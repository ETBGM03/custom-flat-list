import {createContext, useCallback, useEffect, useState} from 'react';
import _ from 'lodash';

export type ProductContextProvider = {
  children: JSX.Element | JSX.Element[];
};

export type ProductContextProps = {
  products: Products[];
  loading: boolean;
  handleNextData: () => void;
};

export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

const INITIAL_STATE = [
  {
    category: {id: 0, image: '', name: ''},
    description: '',
    id: 0,
    images: [],
    price: 0,
    title: '',
  },
];

export const ProductContext = createContext<ProductContextProps>({
  handleNextData(): void {},
  loading: true,
  products: INITIAL_STATE,
});

export function ProductContextProvider({children}: ProductContextProvider) {
  const [products, setProducts] = useState<any>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=20`,
        );
        const res = await data.json();
        const dataFlat = [...products, ...res].flat(1);
        const dataUnique = _.uniqBy(dataFlat, 'id');
        setProducts(dataUnique);
      } catch (error: any) {
        console.error('error on get data mock', JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    }
    getProducts().then(() => {});
  }, [setProducts, offset, setLoading]);

  const handleNextData = useCallback(() => {
    setOffset(offset + 10);
  }, [offset]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        handleNextData,
      }}>
      {children}
    </ProductContext.Provider>
  );
}
