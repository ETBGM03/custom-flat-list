import React, {memo} from 'react';
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
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
  loaderComponent?: React.ComponentType;
  ListSeparatorComponent?: React.ComponentType;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onEndReached: (info: {distanceFromEnd: number}) => void;
  onEndReachedThreshold?: number | null;
  horizontal?: boolean;
  loading: boolean;
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

  const reachingEnd = (
    {nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>,
    distanceToEnd: number | null | undefined,
  ) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const paddingToBottom = distanceToEnd ?? 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <ComponentAnimated>
      <ScrollView
        scrollEventThrottle={16}
        overScrollMode="auto"
        onScroll={e => {
          if (reachingEnd(e, rest.onEndReachedThreshold)) {
            rest.onEndReached({
              distanceFromEnd: rest.onEndReachedThreshold || 100,
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
