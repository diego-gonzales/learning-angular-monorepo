import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from '../../cart/cart-list/cart-list.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CartListComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  asideCartIsOpen = signal(false);
  private _cartService = inject(CartService);
  cartProducts = this._cartService.cartProducts;
  subtotal = this._cartService.subtotal;

  constructor() {
    effect(() => {
      this.asideCartIsOpen()
        ? document.body.classList.add('overflow-y-hidden')
        : document.body.classList.remove('overflow-y-hidden');
    });
  }

  onCheckInputChange() {
    this.asideCartIsOpen.update((value) => !value);
  }
}
