export const medsos = [
  { Icon: 'assets/icons/github.png', Label: 'Github' },
  { Icon: 'assets/icons/instagram.png', Label: 'Instagram' },
  { Icon: 'assets/icons/linkedin.png', Label: 'Linkedin' },
];

export function mapMedsos(rawData) {
  return rawData.map(item => ({
    icon: item.Icon,
    label: item.Label
  }));
}
