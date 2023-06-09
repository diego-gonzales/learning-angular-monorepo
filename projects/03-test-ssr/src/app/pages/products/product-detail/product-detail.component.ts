import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '~/interfaces/products-reponse.interface';
import { ProductsService } from '~/services/products.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  // This 'id' is part of the URL
  @Input() id?: string;
  private _productsService = inject(ProductsService);
  product = signal<Product | null>(null);

  ngOnInit(): void {
    this._productsService.getProduct(this.id!).subscribe((resp) => {
      this.product.set(resp);
    });
  }
}
