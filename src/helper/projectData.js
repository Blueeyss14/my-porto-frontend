export function mapProjects(rawData) {
  return rawData.map(item => ({
    id: item.id, 
     title: item.title,
     description: item.description,
     category: item.category,
     is_pinned: item.is_pinned,
     image_url: item.image_url,
  }));
}
