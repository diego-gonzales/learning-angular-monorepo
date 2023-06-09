import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '~/interfaces/products-reponse.interface';
import { SortName } from '~/interfaces/sorting.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent {
  @Input() products: Product[] = [];
  @Output() changeSorting: EventEmitter<SortName> = new EventEmitter();
  sortName = SortName;
  displayedColumns: string[] = ['image', 'name', 'price', 'actions'];

  handleChangeSorting(name: SortName) {
    this.changeSorting.emit(name);
  }
}
