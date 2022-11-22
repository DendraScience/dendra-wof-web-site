export function slugify(str, lc = true) {
  return lc
    ? str.replace(/[^A-Za-z0-9]/g, '-').toLowerCase()
    : str.replace(/[^A-Za-z0-9]/g, '-')
}
