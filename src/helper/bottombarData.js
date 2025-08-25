export const bottombarData = [
  { Icon: '/icons/portfolio.png', Label: 'Home' },
  { Icon: '/icons/vinyl.png', Label: 'Song' },
];

export function mapBottombarData(rawData) {
  return rawData.map(item => ({
    icon: item.Icon,
    label: item.Label
  }));
}
