import {Button, SafeAreaView} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import _ from 'lodash';

import CustomFlatList from '../components/custom-fatlist';
import Empty from '../components/empty';
import CardItem from '../components/item';
import {SafeAreHome} from './styles';

const Home = () => {
  const [products, setProducts] = useState<any>([]);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=20`,
        );
        const res = await data.json();
        const oldData = products;
        const dataFlat = [...oldData, ...res].flat(1);
        const dataUnique = _.uniqBy(dataFlat, 'id');
        setProducts(dataUnique);
      } catch (error: any) {
        console.error('error on get data mock', JSON.stringify(error));
      }
    }
    getProducts();
  }, [setProducts, offset]);

  const handlePress = () => {
    setOffset(offset + 10);
  };

  const renderItem = useCallback(
    (item: any) => <CardItem key={`card-item-${item.id}`} {...item} />,
    [],
  );

  return (
    <SafeAreHome>
      <CustomFlatList
        onEndReachedThreshold={0.5}
        data={products}
        customRenderItem={(item: any) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Empty />}
        onEndReached={() => handlePress()}
      />
    </SafeAreHome>
  );
};

export default Home;
