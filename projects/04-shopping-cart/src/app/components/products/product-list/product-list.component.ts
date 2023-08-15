import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private _productsService = inject(ProductsService);
  products = this._productsService.products;
}
