export function convertTimeStampToTimeAgo(timestamp) {
  const now = new Date();
  const posted = new Date(timestamp);
  const diffMs = now - posted;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0)
    return `Posted ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0)
    return `Posted ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return "Posted just now";
}


export function stripHtmlTags(html) {
    return html.replaceAll(/<[^>]*>/g, '');
}
