import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/shared/navbar/navbar.component';
import { ProductFiltersComponent } from 'src/app/components/products/product-filters/product-filters.component';
import { ProductListComponent } from 'src/app/components/products/product-list/product-list.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ProductFiltersComponent,
    ProductListComponent,
  ],
  templateUrl: './shop.component.html',
})
export default class ShopComponent {
  private _productsService = inject(ProductsService);

  ngOnInit(): void {
    this._productsService.getProducts();
  }
}
