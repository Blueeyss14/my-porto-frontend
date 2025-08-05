export const chatData = [
  { User: 'User M', Message: 'Homesdfsdg dsf' },
  { User: 'User M', Message: 'Homesdfsdg 2' },
  { User: 'User M', Message: 'Homesdfsdg sd' },
  { User: 'User M', Message: 'Homesdfsdg d' },
  { User: 'User M', Message: 'Homesdfsdg zd' },
  { User: 'User M', Message: 'Homesdfsdg sdf' },
];

export function mapChatData(rawData) {
  return rawData.map(item => ({
    user: item.User,
    message: item.Message
  }));
}
