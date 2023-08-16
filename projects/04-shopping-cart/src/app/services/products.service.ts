import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/products.interface';
import { FiltersService } from './filters.service';
import { Category } from '../interfaces/filters.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _httpClient = inject(HttpClient);
  private _filtersService = inject(FiltersService);
  private _products = signal<Product[]>([]);

  filteredProducts = computed(() => this._getFilteredProducts());

  private _getFilteredProducts() {
    return this._products().filter(
      (p) =>
        p.price <= this._filtersService.filters().maxPrice &&
        (this._filtersService.filters().category === Category.ALL ||
          p.category === this._filtersService.filters().category)
    );
  }

  getProducts() {
    this._httpClient
      .get<ProductsResponse>('assets/data.json')
      .subscribe((resp) => {
        this._products.set(resp.products);
      });
  }
}
