const imgCache: Map<string, Blob> = new Map();

export const useImgCache = () => {
  const addToCache = (key: string, blob: Blob) => {
    imgCache.set(key, blob);
    console.log(`img ${key} added to cache`);
  };

  const getFromCache = (key: string): Blob | null => {
    const found = imgCache.get(key);

    if (found) {
      console.log('img cache hit');
      return found;
    } else {
      console.log(`img ${key} not in cache`);
      return null;
    }
  };

  return { addToCache, getFromCache };
};
