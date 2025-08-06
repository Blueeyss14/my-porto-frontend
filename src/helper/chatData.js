export const chatData = [
  { User: 'User A', Message: 'Homesdfsdg dsf' },
  { User: 'User B', Message: 'Homesdfsdg 2' },
  { User: 'User C', Message: 'Homesdfsdg sd' },
  { User: 'User D', Message: 'Homesdfsdgajkalsjflskdjflksdjflkfnsklksdn skdlfjskldfjlskdfj ksdfjlksdjflksdjf klsjdflksjdflksdjf kjsdflksjdflkj d' },
  { User: 'User E', Message: 'Homesdfsdg zd' },
  { User: 'User F', Message: 'Homesdfsdg sdf' },
];

export function mapChatData(rawData) {
  return rawData.map(item => ({
    user: item.User,
    message: item.Message
  }));
}
