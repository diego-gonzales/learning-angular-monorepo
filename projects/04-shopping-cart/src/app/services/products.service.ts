import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _httpClient = inject(HttpClient);
  private _products = signal<Product[]>([]);

  get products() {
    return this._products.asReadonly();
  }

  getProducts() {
    this._httpClient
      .get<ProductsResponse>('assets/data.json')
      .subscribe((resp) => {
        this._products.set(resp.products);
      });
  }
}
