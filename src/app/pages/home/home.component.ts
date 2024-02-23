import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Carousel } from '../../models/carousel.mock';
import { TiendaServiceService } from '../../services/tienda-service.service';
import { Category } from '../../models/product.model';
import { imgCategories } from '../../models/imgCategory.mock';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories?: Category[];
  carouselOption: string = '';
  imgCarousel?: Carousel[];
  imgCategory: imgCategories[] = [];
  loading: boolean = true;

  private _router = inject(Router);
  private _apiService = inject(TiendaServiceService);

  ngOnInit(): void {
    this._apiService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.loading = false
    });
    this.imgCarousel = Carousel;
    this.imgCategory = imgCategories;
  }

  goToProducts(category:string): void{
    this._router.navigate(['/products/', category]);
  }
}
