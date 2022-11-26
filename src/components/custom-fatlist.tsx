import React, {memo, useRef} from 'react';
import {
  ListRenderItem,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {keyExtractorDefault} from '../utils/helpers';
import ComponentAnimated from './component-animanted';
import {ViewRenderItem} from './styles';

interface CustomFlatList<ItemD> {
  data: ReadonlyArray<ItemD>;
  customRenderItem: ListRenderItem<ItemD>;
  customKeyExtractor?: (item: any, index: number) => string;
  listHeaderComponent?: React.ComponentType;
  ListEmptyComponent?: React.ComponentType;
  ListSeparatorComponent?: React.ComponentType;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onEndReached: (info: {distanceFromEnd: number}) => void;
  onEndReachedThreshold?: number | null;
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
}

function CustomFlatList<ItemD = any>(props: CustomFlatList<ItemD>) {
  const {
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
  } = props;

  const HeaderComponent = listHeaderComponent
    ? listHeaderComponent
    : () => null;
  const SeparatorComponent = ListSeparatorComponent
    ? ListSeparatorComponent
    : () => null;
  const EmptyComponent = ListEmptyComponent ? ListEmptyComponent : () => null;

  let scrollRef = useRef();

  const _keyExtractor = (items: ItemD, index: number): string => {
    const keyExtractor = customKeyExtractor ?? keyExtractorDefault;

    return keyExtractor(items, index);
  };

  if (data.length === 0) return <EmptyComponent />;
  return (
    <ComponentAnimated>
      <ScrollView
        overScrollMode="auto"
        ref={scrollRef.current}
        onScrollBeginDrag={() =>
          rest.onEndReached({
            distanceFromEnd: rest.onEndReachedThreshold || 100,
          })
        }
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
