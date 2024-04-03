export const unsplashConstant = {
  mainUrl: (uri: string) => `https://api.unsplash.com/${uri}`,
  photosUrl: (page: number) =>
    `https://api.unsplash.com/photos?page=${page}&per_page=30&order_by=oldest`,
  photoWithId: (id: string) => `https://api.unsplash.com/photos/${id}`,
} as const;
