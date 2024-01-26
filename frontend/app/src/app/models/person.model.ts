export interface Person {
  id: number;
  name: string;
  username: string;
}
export interface PersonFilter {
  sortBy?: string;
  orderByAscending?: boolean;
  filterBy?: FilterBy[]; // This should be an array of FilterBy
  page: number;
  pageSize: number;
  searchBy?: string;
}

export interface FilterBy {
  propertyName: string;
  filterValue: string;
}

export interface PaginationModel<T> {
  data: T[];
  totalSize: number;
}
