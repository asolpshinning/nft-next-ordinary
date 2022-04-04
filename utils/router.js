
export function getSingleQueryValue(query, key) {
  const _val = query[key];

  return Array.isArray(_val) ? _val[0] : _val;
}
