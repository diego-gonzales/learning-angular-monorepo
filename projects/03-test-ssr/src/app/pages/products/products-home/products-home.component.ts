import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ProductsService } from '~/services/products.service';
import { ProductsTableComponent } from '~/components/products/products-table/products-table.component';
import { SortName, SortType, Sorting } from '~/interfaces/sorting.interface';
import { Filtering } from '~/interfaces/filtering.interface';
import { Product } from '~/interfaces/products-reponse.interface';

@Component({
  selector: 'app-products-home',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSliderModule,
    ProductsTableComponent,
  ],
  templateUrl: './products-home.component.html',
})
export default class ProductsHomeComponent {
  private _productsService = inject(ProductsService);
  private _products = this._productsService.products;
  sorting = signal<Sorting>({ name: SortName.NONE, type: SortType.NONE });
  filtering = signal<Filtering>({ name: '', minPrice: 0, maxPrice: 1000 });

  sortedProducts = computed(() => {
    if (
      this.sorting().name === SortName.NONE &&
      this.sorting().type === SortType.NONE
    ) {
      console.log('--x--');
      return this._products();
    } else {
      console.log('--y--');
      let newProducts: Product[] = [];

      if (this.sorting().name === SortName.NAME) {
        newProducts = [...this._products()].sort((a, b) => {
          if (this.sorting().type === SortType.ASC) {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
      }

      if (this.sorting().name === SortName.PRICE) {
        newProducts = [...this._products()].sort((a, b) => {
          if (this.sorting().type === SortType.ASC) {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      }

      return newProducts;
    }
  });

  filteredProducts = computed(() => {
    console.log('--a--');
    const newProducts = this.sortedProducts().filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(this.filtering().name.toLowerCase()) &&
        product.price >= this.filtering().minPrice &&
        product.price <= this.filtering().maxPrice
    );
    return newProducts;
  });

  ngOnInit(): void {
    this._productsService.getProducts();
  }

  onChangeSorting(name: SortName) {
    this.sorting.mutate((value) => {
      if (value.name !== name) {
        value.name = name;
        value.type = SortType.ASC;
      } else if (value.type === SortType.ASC) {
        value.type = SortType.DESC;
      }
      // else if (value.type === SortType.DESC) {
      //   value.type = SortType.ASC;
      // }
      else {
        value.name = SortName.NONE;
        value.type = SortType.NONE;
      }
    });
  }

  onInputChange(event: Event) {
    const nameValue = (event.target as HTMLInputElement).value;
    this.filtering.mutate((value) => {
      value.name = nameValue;
    });
  }

  onRangeInput1Change(event: Event) {
    const minPriceValue = Number((event.target as HTMLInputElement).value);
    this.filtering.mutate((value) => {
      value.minPrice = minPriceValue;
    });
  }

  onRangeInput2Change(event: Event) {
    const maxPriceValue = Number((event.target as HTMLInputElement).value);
    this.filtering.mutate((value) => {
      value.maxPrice = maxPriceValue;
    });
  }

  formatLabel(value: number) {
    return `$${value}`;
  }
}
