// BaseFilter interface with common parameters
export interface BaseFilter {
  sortBy?: string;
  orderByAscending?: boolean;
  filterBy?: FilterBy[];
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

// CustomerFilter extends BaseFilter with additional properties
export interface CustomerFilter extends BaseFilter {
  searchBy?: string;
}

// PersonFilter extends BaseFilter with additional properties
export interface PersonFilter extends BaseFilter {
  // Additional properties specific to PersonFilter
}
