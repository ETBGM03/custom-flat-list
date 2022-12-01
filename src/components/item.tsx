import React from 'react';
import {Products} from '../context/product-context';

import {Container, ImageItem, TextItem} from './styles';

function CardItem({images, title}: Products) {
  const url =
    images[0] ||
    'https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png';

  return (
    <Container>
      <ImageItem
        source={{
          uri: `${url}`,
          cache: 'force-cache',
        }}
      />
      <TextItem>{title || 'No data'}</TextItem>
    </Container>
  );
}

export default CardItem;
