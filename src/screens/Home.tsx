import React, {useCallback, useContext} from 'react';

import CustomFlatList from '../components/custom-fatlist';
import Empty from '../components/empty';
import CardItem from '../components/item';
import {ProductContext} from '../context/product-context';

import {Header, HeaderTitle, LoaderIndicator, SafeAreHome} from './styles';

const Home = () => {
  const {handleNextData, loading, products} = useContext(ProductContext);

  const renderItem = useCallback(
    (item: any) => <CardItem key={`card-item-${item.id}`} {...item} />,
    [],
  );

  return (
    <SafeAreHome>
      <Header>
        <HeaderTitle>Custom FlatList</HeaderTitle>
      </Header>
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
