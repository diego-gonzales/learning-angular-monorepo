import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from '../../cart/cart-list/cart-list.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, CartListComponent, SidebarComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
