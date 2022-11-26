import React from 'react';

import {Container, ImageItem, TextItem} from './styles';

export interface Welcome {
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

function CardItem(props: Welcome) {
  const url =
    props.images[0] ||
    'https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png';

  return (
    <Container>
      <ImageItem
        source={{
          uri: `${url}`,
          cache: 'force-cache',
        }}
      />
      <TextItem>{props.title || 'No data'}</TextItem>
    </Container>
  );
}

export default CardItem;
