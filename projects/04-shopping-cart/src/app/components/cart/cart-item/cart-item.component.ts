import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/interfaces/products.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input({ required: true }) cartProduct!: Product;
  private _cartService = inject(CartService);

  onAddProductToCart() {
    this._cartService.addProductToCart(this.cartProduct);
  }

  onRemoveOneToCart() {
    this._cartService.removeOneFromCart(this.cartProduct);
  }

  onRemoveProductFromCart() {
    this._cartService.removeProductFromCart(this.cartProduct.id);
  }
}
