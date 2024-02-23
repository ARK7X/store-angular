import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Category, Products, alert } from '../../models/product.model';
import { TiendaServiceService } from '../../services/tienda-service.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  categories?: Category[];
  loading: boolean = true;
  count: number = 0;
  showAlert: boolean = false;
  alertMessage: string = '';

  private _route = inject(ActivatedRoute);
  private _apiTienda = inject(TiendaServiceService);
  private _alert = inject(AlertService);

  ngOnInit(): void {
    this._alert.alertSource$.subscribe((res:alert) => {
      this.alertMessage = res.message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, res.time);
    });

    this._route.params.subscribe((params) => {
      if (params['category'] != null) {
        this.getFilter(params['category']);
      }
    });
    
    this.getProducts();
    this._apiTienda.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  getFilter(category: string) {
    this.loading = true;
    this._apiTienda
      .getProductByCategory(category)
      .subscribe((data: Products[]) => {
        this.products = data;
        this.loading = false;
      });
  }

  getProducts() {
    this.loading = true;
    this._apiTienda.getAllProducts().subscribe((data: Products[]) => {
      this.products = data;
      this.loading = false;
    });
  }

  addProducToCart(img: string, title: string, price: number) {
    this._alert.showAlert('Product added to cart.', 1000);
    this.playAudio();
    this._apiTienda.addCartProduct(img, title, price);
    this.count++;
    this._apiTienda.setCountItem(this.count);
  }

  playAudio() {
    const audio = new Audio('../../../assets/alert.mp3');
    audio.play();
  }
}
