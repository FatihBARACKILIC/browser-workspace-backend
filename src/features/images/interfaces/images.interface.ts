export interface IImage {
  id: string;
  slug: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: IUrls;
  links: ILinks;
  photographer: string;
}

export interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface ILinks {
  html: string;
  download: string;
}
