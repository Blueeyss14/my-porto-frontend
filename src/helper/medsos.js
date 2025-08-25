export const medsos = [
  { Icon: '/icons/github.png', Label: 'Github', Site: 'https://github.com/Blueeyss14' },
  { Icon: '/icons/instagram.png', Label: 'Instagram', Site: 'https://www.instagram.com/bluee.art14__/'},
  { Icon: '/icons/linkedin.png', Label: 'Linkedin', Site: 'https://www.linkedin.com/in/delkano-berutu-28b7482a2/'},
];

export function mapMedsos(rawData) {
  return rawData.map(item => ({
    icon: item.Icon,
    label: item.Label,
    site: item.Site
  }));
}
