import { Injectable, signal } from '@angular/core';
import { Category, Filters } from '../interfaces/filters.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private _filters = signal<Filters>({
    maxPrice: 1800,
    category: Category.ALL,
  });

  get filters() {
    return this._filters.asReadonly();
  }

  updateMaxPrice(newMaxPrice: number) {
    this._filters.mutate((value) => {
      value.maxPrice = newMaxPrice;
    });
  }

  updateCategory(newCategory: Category) {
    this._filters.mutate((value) => {
      value.category = newCategory;
    });
  }
}
