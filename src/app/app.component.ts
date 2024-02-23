import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { TiendaServiceService } from './services/tienda-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, RouterLink, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck{
  title = 'BetterSales';

  count: number =0;
  private _apiTienda = inject(TiendaServiceService);
  menuOption: string = '';

  ngDoCheck(): void {
    this.count = this._apiTienda.getCount();
  }


   onOption(option:string) {
    this.menuOption = option;
  }
}
