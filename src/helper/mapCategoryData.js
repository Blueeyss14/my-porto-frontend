export function mapCategoryData(rawData) {
  return rawData.map(item => ({
    id: item.id,
    name: item.name
  }));
}
