import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '~/interfaces/products-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _http = inject(HttpClient);
  private _apiURL = 'https://fakestoreapi.com/products';
  private _products = signal<Product[]>([]);

  get products() {
    return this._products.asReadonly();
  }

  getProducts() {
    this._http
      .get<Product[]>(this._apiURL)
      .subscribe((resp) => this._products.set(resp));
  }

  getProduct(productID: string) {
    return this._http.get<Product>(`${this._apiURL}/${productID}`);
  }
}
