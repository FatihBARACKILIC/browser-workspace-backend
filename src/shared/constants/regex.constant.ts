export const regexConstant = {
  unsplashIdPattern: /\/([^\/]+)\/download/g,
  // /href="https:\/\/unsplash\.com\/photos\/([a-zA-Z0-9]+)\/download\?"/,
  unsplashUrlPattern: /https:\/\/unsplash\.com\/photos\/[\w-]+/,
} as const;
