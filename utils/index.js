export const removePTags = (html) => {
  if (!html) return null
  return html.replace(/<\/p[^>]*><p[^>]*>/g, '<br>').replace(/<\/?p[^>]*>/g, '')
}
