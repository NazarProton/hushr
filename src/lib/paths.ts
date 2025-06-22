export const getAssetPath = (path: string): string => {
  const isLocal =
    typeof window !== 'undefined' && window.location.hostname === 'localhost';
  return isLocal ? path : '/hushr' + path;
};
