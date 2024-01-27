import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { FilterBy } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { BaseFilter } from 'src/app/shared/pagination/base-modal-filter';
import { BaseComponent } from 'src/app/shared/pagination/base.component';

@Component({
  selector: 'app-person', // Adjust the selector as needed
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'], // Correct the property name to 'styleUrls'
})
export class PersonComponent
  extends BaseComponent<Customer, BaseFilter>
  implements OnInit
{
  constructor(private personService: PersonService) {
    super();
  }

  fetchData(): void {
    this.personService.getPaginatedData(this.filter).subscribe((result) => {
      this.paginationModel = result;
    });
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
}
