export const appBar = [
  { Icon: 'assets/icons/portfolio.png', Label: 'Home' },
  { Icon: 'assets/icons/vinyl.png', Label: 'Playlist' },
];

export function mapAppbar(rawData) {
  return rawData.map(item => ({
    icon: item.Icon,
    label: item.Label
  }));
}
