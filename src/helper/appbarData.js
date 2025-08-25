export const appBar = [
  { Icon: '/icons/portfolio.png', Label: 'Home' },
  { Icon: '/icons/vinyl.png', Label: 'Playlist' },
];

export function mapAppbar(rawData) {
  return rawData.map(item => ({
    icon: item.Icon,
    label: item.Label
  }));
}
