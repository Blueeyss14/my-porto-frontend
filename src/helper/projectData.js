export function mapProjects(rawData) {
  return rawData.map(item => ({
    id: item.id, 
     title: item.title,
     subtitle: item.subtitle,
     description: item.description,
     category: item.category,
     is_pinned: item.is_pinned,
     image_url: item.image_url,
     tags: item.tags,
     thumbnail: item.thumbnail,
     contributing: item.contributing,
     resources: item.resources,
  }));
}
