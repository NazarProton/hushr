export const getBasePath = (): string => {
  return import.meta.env.MODE === 'production' ? '/hushr' : '';
};

export const getAssetPath = (path: string): string => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
};
