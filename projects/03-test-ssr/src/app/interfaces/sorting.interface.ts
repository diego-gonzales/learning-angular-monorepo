export interface Sorting {
  name: SortName;
  type: SortType;
}

export enum SortName {
  NAME = 'name',
  PRICE = 'price',
  NONE = 'none',
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}
