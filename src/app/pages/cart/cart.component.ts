import { Component, OnInit, inject } from '@angular/core';
import { TiendaServiceService } from '../../services/tienda-service.service';
import { cartProducts } from '../../models/cartProduct.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartList?: cartProducts[];
  total: number = 0;
  loading: boolean = true;
  countItem: number = 0;
  private _apiTienda = inject(TiendaServiceService);

  ngOnInit(): void {
    this.cartList = this._apiTienda.getCartShopping();
    this.cartList?.forEach((x) => {
      this.total += x.price;
    });
    this.countItem = this._apiTienda.getCount();
  }

  deleteProduct(id: number, price: number) {
    this._apiTienda.deleteCartProduct(id);
    this.cartList = this._apiTienda.getCartShopping();
    this.total -= price;
    this._apiTienda.setCountItem(this.countItem - 1);
    this.countItem = this._apiTienda.getCount();
  }
}
