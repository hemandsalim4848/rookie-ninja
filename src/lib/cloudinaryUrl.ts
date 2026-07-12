export function cld(url?: string | null) {
  if (!url || !url.includes('res.cloudinary.com') || url.includes('f_auto')) return url ?? ''
  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto/')
}
