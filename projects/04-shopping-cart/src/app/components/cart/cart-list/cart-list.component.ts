import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart-list.component.html',
})
export class CartListComponent {
  private _cartService = inject(CartService);
  cartProducts = this._cartService.cartProducts;
}
