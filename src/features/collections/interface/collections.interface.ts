export interface ICollection {
  id: string;
  title: string;
  description?: string;
  total_photos: number;
  tags: ITag[];
  links: ILinks;
}

export interface ITag {
  type: string;
  title: string;
}

export interface ILinks {
  self: string;
  html: string;
  photos: string;
  related: string;
}
