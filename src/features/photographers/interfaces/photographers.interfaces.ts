export interface IPhotographer {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name?: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  links: IProfileLinks;
  profile_image: IProfileImage;
  social: ISocial;
}

export interface IProfileLinks {
  html: string;
}

export interface IProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface ISocial {
  instagram_username?: string;
  portfolio_url?: string;
  twitter_username?: string;
  paypal_email?: string;
}
