export interface Customer {
  id: number;
  name: string;
  email: string;
}
export interface CustomerFilter {
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
