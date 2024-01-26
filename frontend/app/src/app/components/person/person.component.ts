import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerFilter, FilterBy } from 'src/app/models/customer.model';
import { PersonFilter } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person', // Adjust the selector as needed
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'], // Correct the property name to 'styleUrls'
})
export class PersonComponent implements OnInit {
  @ViewChild('filterModal') filterModal: any;
  isFilterModalOpen: boolean = false;

  // Properties for filterBy
  idFilter: string = '';
  nameFilter: string = '';
  lastNameFilter: string = '';

  paginationModel: any = {
    data: [],
    totalSize: 0,
  };

  filter: PersonFilter = {
    sortBy: '',
    orderByAscending: true,
    filterBy: [],
    page: 1,
    pageSize: 10,
    searchBy: '',
  };

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    debugger;
    this.personService.getPaginatedData(this.filter).subscribe((result) => {
      this.paginationModel = result;
    });
  }

  onPageChange(page: number): void {
    this.filter.page = page;
    this.fetchData();
  }

  onSortByChange(sortBy: string): void {
    if (sortBy === this.filter.sortBy) {
      this.filter.orderByAscending = !this.filter.orderByAscending;
    } else {
      this.filter.sortBy = sortBy;
      this.filter.orderByAscending = true;
    }

    this.fetchData();
  }

  onFilterChange(): void {
    this.filter.page = 1;
    this.fetchData();
  }

  onPageSizeChange(size: number): void {
    this.filter.pageSize = size;
    this.filter.page = 1;
    this.filter.pageSize = size;
    this.fetchData();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(
      this.paginationModel.totalSize / this.filter.pageSize
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  openFilterModal() {
    // Open the Bootstrap modal
    this.filterModal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    this.isFilterModalOpen = true;
  }
  applyFilters() {
    // Initialize an array to hold the filter objects
    const filters: FilterBy[] = [];

    // Check and add filterById
    if (this.idFilter.trim() !== '') {
      filters.push({
        propertyName: 'id',
        filterValue: this.idFilter,
      });
    }

    // Check and add filterByName
    if (this.nameFilter.trim() !== '') {
      filters.push({
        propertyName: 'name',
        filterValue: this.nameFilter,
      });
    }

    // Check and add filterByEmail
    if (this.lastNameFilter.trim() !== '') {
      filters.push({
        propertyName: 'lastName',
        filterValue: this.lastNameFilter,
      });
    }

    // Update filter.filterBy with the filtered array
    this.filter.filterBy = filters;

    // Fetch data based on filters
    this.fetchData();

    // Close the modal
    this.closeFilterModal();
  }

  closeFilterModal() {
    // Close the Bootstrap modal
    this.filterModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isFilterModalOpen = false;
  }
}
