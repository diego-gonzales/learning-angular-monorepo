import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartProducts = signal<Product[]>([]);

  get cartProducts() {
    return this._cartProducts.asReadonly();
  }

  addProductToCart(product: Product) {
    const cartProductIndex = this.cartProducts().findIndex(
      (cp) => cp.id === product.id
    );

    if (cartProductIndex < 0) {
      this._cartProducts.mutate((value) => {
        value.unshift({ ...product, quantity: 1 });
      });
      return;
    }

    this._cartProducts.mutate((value) => {
      const cartProduct = value[cartProductIndex];

      value[cartProductIndex] = {
        ...cartProduct,
        quantity: cartProduct.quantity! + 1,
      };
    });
  }

  removeOneFromCart(product: Product) {
    if (product.quantity === 1) return;

    const cartProductIndex = this.cartProducts().findIndex(
      (cp) => cp.id === product.id
    );

    this._cartProducts.mutate((value) => {
      value[cartProductIndex] = {
        ...product,
        quantity: product.quantity! - 1,
      };
    });
    console.log(this._cartProducts());
  }

  removeProductFromCart(cartProductId: number) {
    const newCartProducts = this._cartProducts().filter(
      (cp) => cp.id !== cartProductId
    );
    this._cartProducts.set(newCartProducts);
  }
}
