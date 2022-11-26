export function keyExtractorDefault(item: any, index: number): string {
  if (typeof item === 'object' && item?.key != null) {
    return item.key;
  }
  if (typeof item === 'object' && item?.id != null) {
    return item.id;
  }
  return String(index);
}
