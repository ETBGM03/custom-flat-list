import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export function keyExtractorDefault(item: any, index: number): string {
  if (typeof item === 'object' && item?.key != null) {
    return item.key;
  }
  if (typeof item === 'object' && item?.id != null) {
    return item.id;
  }
  return String(index);
}

export const reachingEnd = (
  {nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>,
  distanceToEnd?: number | null | undefined,
) => {
  const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
  const paddingToBottom = distanceToEnd ?? 10;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
