import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SortingType } from '~/enums/sorting-type.enum';
import { User } from '~/interfaces/user-response.interface';
import { UsersService } from '~/services/users.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  private _usersService = inject(UsersService);
  @Input() isColoringTable!: boolean;
  @Input() users: User[] = [];
  @Output() onChangeSortingType: EventEmitter<SortingType> = new EventEmitter();
  sortingType = SortingType;

  getRowBackgroundColor(rowIndex: number) {
    if (!this.isColoringTable) return 'transparent';
    if (rowIndex % 2 === 0) return '#555';
    else return '#333';
  }

  deleteUser(uuid: string) {
    this._usersService.deleteUser(uuid);
  }

  handleSortingChange(sortingType: SortingType) {
    this.onChangeSortingType.emit(sortingType);
  }
}
