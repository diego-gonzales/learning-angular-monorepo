export interface Filters {
  maxPrice: number;
  category: Category;
}

export enum Category {
  ALL = 'all',
  LAPTOPS = 'laptops',
  SMARTPHONES = 'smartphones',
  HOME_DECORATION = 'home-decoration',
  SKINCARE = 'skincare',
  FRAGRANCES = 'fragrances',
  GROCERIES = 'groceries',
}
