export const songData = [
  { Song: 'assets/audio/yorushika.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika2.mp3' },
  { Song: 'assets/audio/yorushika6.mp3' },
];

export function mapSong(rawData) {
  return rawData.map((item) => ({
    song: item.Song,
  }));
}