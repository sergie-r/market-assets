export const normalizeAssets = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('Provided data is not an array');
  }

  const normalized = {};

  data.forEach((item) => {
    normalized[item.id] = item;
  });

  return normalized;
};