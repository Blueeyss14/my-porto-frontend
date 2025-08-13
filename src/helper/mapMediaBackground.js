export function mapMediaBackground(rawData) {
  return rawData.map(item => ({
    id: item.id, 
     filename: item.filename,
     mimetype: item.mimetype
  }));
}
