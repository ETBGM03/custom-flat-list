import React, {useCallback, useEffect, useState} from 'react';
import _ from 'lodash';

import CustomFlatList from '../components/custom-fatlist';
import Empty from '../components/empty';
import CardItem from '../components/item';
import {LoaderIndicator, SafeAreHome} from './styles';

const Home = () => {
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
  }, [setOffset, offset]);

  const renderItem = useCallback(
    (item: any) => <CardItem key={`card-item-${item.id}`} {...item} />,
    [],
  );

  return (
    <SafeAreHome>
      <CustomFlatList
        onEndReachedThreshold={1}
        data={products}
        customRenderItem={item => renderItem(item)}
        ListEmptyComponent={() => <Empty />}
        showsVerticalScrollIndicator={false}
        onEndReached={handleNextData}
        loading={loading}
        loaderComponent={() => <LoaderIndicator />}
      />
    </SafeAreHome>
  );
};

export default Home;
