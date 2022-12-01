import React, {memo} from 'react';
import {
  ListRenderItem,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import {keyExtractorDefault, reachingEnd} from '../utils/helpers';

import ComponentAnimated from './component-animanted';
import {ViewRenderItem} from './styles';

interface CustomFlatList<ItemD> {
  data: ReadonlyArray<ItemD>;
  customRenderItem: ListRenderItem<ItemD>;
  customKeyExtractor?: (item: ItemD, index: number) => string;
  listHeaderComponent?: React.ComponentType;
  ListEmptyComponent?: React.ComponentType;
  loaderComponent?: React.ComponentType;
  ListSeparatorComponent?: React.ComponentType;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onEndReached: (info: {distanceFromEnd?: number}) => void;
  onEndReachedThreshold?: number;
  horizontal?: boolean;
  loading: boolean;
  style?: StyleProp<ViewStyle>;
}

function CustomFlatList<ItemD = any>({
  data,
  listHeaderComponent,
  ListEmptyComponent,
  ListSeparatorComponent,
  customRenderItem,
  customKeyExtractor,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  horizontal = false,
  style,
  ...rest
}: CustomFlatList<ItemD>) {
  const LoaderComponent = rest.loaderComponent
    ? rest.loaderComponent
    : () => null;
  const HeaderComponent = listHeaderComponent
    ? listHeaderComponent
    : () => null;
  const SeparatorComponent = ListSeparatorComponent
    ? ListSeparatorComponent
    : () => null;
  const EmptyComponent = ListEmptyComponent ? ListEmptyComponent : () => null;

  const _keyExtractor = (items: ItemD, index: number): string => {
    const keyExtractor = customKeyExtractor ?? keyExtractorDefault;

    return keyExtractor(items, index);
  };

  if (data.length === 0 && !rest.loading) {
    return <EmptyComponent />;
  }

  if (data.length === 0 && rest.loading) {
    return <LoaderComponent />;
  }

  return (
    <ComponentAnimated>
      <ScrollView
        scrollEventThrottle={16}
        overScrollMode="auto"
        onScroll={e => {
          if (reachingEnd(e, rest.onEndReachedThreshold)) {
            rest.onEndReached({
              distanceFromEnd: rest.onEndReachedThreshold,
            });
          }
        }}
        horizontal={horizontal}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}>
        <HeaderComponent />
        {data &&
          data.map((item: any, index: number) => {
            return (
              <ViewRenderItem
                key={`${_keyExtractor(item, index) || index}`}
                style={StyleSheet.compose(styles.row, style)}>
                {customRenderItem(item)}
                <SeparatorComponent />
              </ViewRenderItem>
            );
          })}
      </ScrollView>
    </ComponentAnimated>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row'} as ViewStyle,
});

export default memo(CustomFlatList);
