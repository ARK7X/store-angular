import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { alert } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSource$: Subject<alert>;

  constructor() {
    this.alertSource$ = new Subject();
   }

  showAlert(message:string, time:number = 5000){
   this.alertSource$.next({message,time});
  }
  
}
