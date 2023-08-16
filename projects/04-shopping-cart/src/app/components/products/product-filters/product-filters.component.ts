import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/interfaces/filters.model';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-filters.component.html',
})
export class ProductFiltersComponent {
  private _filtersService = inject(FiltersService);
  filters = this._filtersService.filters;
  categories = signal<Category[]>([
    Category.ALL,
    Category.FRAGRANCES,
    Category.GROCERIES,
    Category.HOME_DECORATION,
    Category.LAPTOPS,
    Category.SKINCARE,
    Category.SMARTPHONES,
  ]);

  onInputRangeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this._filtersService.updateMaxPrice(+value);
  }

  onSelectChange(event: Event) {
    const value = (event.target as HTMLInputElement).value as Category;
    this._filtersService.updateCategory(value);
  }
}
