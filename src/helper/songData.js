
export function mapSong(rawData) {
  return rawData.map((item) => ({
    id: item.id,
    song_name: item.song_name,
    song_file: item.song_file,
    mimetype: item.mimetype,
  }));
}