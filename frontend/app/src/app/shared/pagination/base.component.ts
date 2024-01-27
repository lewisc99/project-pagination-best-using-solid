import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseFilter, CustomerFilter } from './base-modal-filter';

interface PaginationFilter {
  page: number;
  pageSize: number;
}

@Component({
  template: '', // Empty template, as this is an abstract component
})
export abstract class BaseComponent<T, F extends PaginationFilter>
  implements OnInit
{
  @ViewChild('filterModal') filterModal: any;
  isFilterModalOpen: boolean = false;

  idFilter: string = '';
  nameFilter: string = '';
  lastNameFilter: string = '';

  paginationModel: any = {
    data: [],
    totalSize: 0,
  };

  filter: BaseFilter = {
    sortBy: '',
    orderByAscending: true,
    filterBy: [],
    page: 1,
    pageSize: 10,
    searchBy: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  abstract fetchData(): void;

  onPageChange(page: number): void {
    this.fetchDataWithChange((filter) => (filter.page = page));
  }

  onSortByChange(sortBy: string): void {
    this.fetchDataWithChange((filter: any) => {
      if (sortBy === filter.sortBy) {
        filter.orderByAscending = !filter.orderByAscending;
      } else {
        filter.sortBy = sortBy;
        filter.orderByAscending = true;
      }
    });
  }

  onFilterChange(): void {
    this.fetchDataWithChange(() => (this.filter.page = 1));
  }

  onPageSizeChange(size: number): void {
    this.fetchDataWithChange((filter) => {
      filter.pageSize = size;
      filter.page = 1;
    });
  }

  getPages(): number[] {
    const totalPages = Math.ceil(
      this.paginationModel.totalSize / this.filter.pageSize
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  openFilterModal() {
    this.filterModal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    this.isFilterModalOpen = true;
  }

  abstract applyFilters(): void;

  closeFilterModal() {
    this.filterModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isFilterModalOpen = false;
  }

  removeFilters() {
    if (this.filter.filterBy) {
      this.filter.filterBy = [];
      this.fetchData();
    }
  }

  fetchDataWithChange(changeCallback: (filter: CustomerFilter) => void): void {
    // Implement how the changeCallback should modify the filter
    changeCallback(this.filter);
    this.fetchData();
  }
}
