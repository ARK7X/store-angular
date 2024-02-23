import { Observable } from 'rxjs';
import { Category, Products } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TiendaServiceService {

  private urlBase = 'https://fakestoreapi.com/products';
  private _httpClient = inject(HttpClient);
  private localStorageKey = 'cartShopping';
  private localStorageKeyCount = 'count';
  private countItems: number = 0;

  getCartShopping(){
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  getCount(){
    return JSON.parse(localStorage.getItem(this.localStorageKeyCount) as string) || [];
  }

  addCartProduct(img: string, title: string, price: number){
    const product = this.getCartShopping();
    product.push({image: img, title: title, price: price});
    localStorage.setItem(this.localStorageKey, JSON.stringify(product))
  }

  deleteCartProduct(id: number) {
    const products = this.getCartShopping();
    products.splice(id, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
  }

  getAllProducts(): Observable<Products[]>{
    return this._httpClient.get<Products[]>(this.urlBase);
  }

  getProduct(id: number): Observable<Products>{
    return this._httpClient.get<Products>(`${this.urlBase}/${id}`);
  }

  getCategories(): Observable<Category[]>{
    return this._httpClient.get<Category[]>(`${this.urlBase}/categories`);
  }

  getProductByCategory(category:string): Observable<Products[]> {
    return this._httpClient.get<Products[]>(`${this.urlBase}/category/${category}`);
  }

  setCountItem(count:number) {
    const countItems = this.getCount();
    countItems.pop();
    countItems.push(count);
    localStorage.setItem(this.localStorageKeyCount, JSON.stringify(countItems));
    this.countItems = count;
  }
}
