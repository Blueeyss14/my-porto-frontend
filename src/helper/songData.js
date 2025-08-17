
export function mapSong(rawData) {
  return rawData.map((item) => ({
    song_name: item.song_name,
    song_file: item.song_file,
  }));
}