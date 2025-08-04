export const bottombarData = [
  { Icon: 'assets/icons/portfolio.png', Label: 'Home' },
  { Icon: 'assets/icons/vinyl.png', Label: 'Song' },
];

export function mapBottombarData(rawData) {
  return rawData.map(item => ({
    icon: item.Icon,
    label: item.Label
  }));
}
