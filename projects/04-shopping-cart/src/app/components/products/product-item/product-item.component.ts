import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/interfaces/products.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  private _cartService = inject(CartService);
  productIsInCart = computed(() => {
    return this._cartService
      .cartProducts()
      .some((cp) => cp.id === this.product.id);
  });

  onAddProductToCart() {
    this._cartService.addProductToCart(this.product);
  }

  onRemoveProductFromCart() {
    this._cartService.removeProductFromCart(this.product.id);
  }
}
