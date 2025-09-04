export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  features: string[];
  specifications: ProductSpecification[];
  isPremium?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  leftText: string;
  rightText: string;
  image: string;
}

export interface ProductGallery {
  mainImage: string;
  thumbnails: string[];
  product: Product;
}