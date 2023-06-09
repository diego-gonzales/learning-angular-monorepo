import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '~/services/users.service';
import { User } from '~/interfaces/user-response.interface';
import { SortingType } from '~/enums/sorting-type.enum';
import { UsersTableComponent } from '~/components/users-table/users-table.component';

@Component({
  selector: 'app-test-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, UsersTableComponent],
  templateUrl: './test-home.component.html',
})
export default class TestHomeComponent {
  private _usersService = inject(UsersService);
  private _users = this._usersService.users;
  isColoringTable = signal(false);
  sortingType = signal<SortingType>(SortingType.NONE);
  countryFilter = signal('');

  sortedUsers = computed(() => {
    if (this.sortingType() === SortingType.NONE) {
      console.log('1');
      return this._users();
    } else {
      console.log('2');

      const compareFn: Record<string, (user: User) => string> = {
        [SortingType.COUNTRY]: (user) => user.location.country,
        [SortingType.NAME]: (user) => user.name.first,
        [SortingType.LASTNAME]: (user) => user.name.last,
      };

      const extractProperty = compareFn[this.sortingType()];

      const newUsers = [...this._users()].sort((a, b) =>
        extractProperty(a).localeCompare(extractProperty(b))
      );

      return newUsers;
    }
  });

  filteredUsers = computed(() => {
    if (this.countryFilter().length === 0) {
      console.log('a');
      return this.sortedUsers();
    } else {
      console.log('b');
      const newUsers = this.sortedUsers().filter((user) =>
        user.location.country
          .toLowerCase()
          .includes(this.countryFilter().toLowerCase())
      );
      return newUsers;
    }
  });

  toggleColoringTable() {
    this.isColoringTable.update((currentValue) => !currentValue);
  }

  toggleSortingByCountry() {
    const newSortingType =
      this.sortingType() !== SortingType.COUNTRY
        ? SortingType.COUNTRY
        : SortingType.NONE;
    this.sortingType.set(newSortingType);
  }

  resetToInitialUsers() {
    this._usersService.resetToInitialUsers();
  }

  onInputChange(event: any) {
    this.countryFilter.set(event.target.value);
  }

  onChangeSortingType(sortingType: SortingType) {
    this.sortingType.set(sortingType);
  }
}
