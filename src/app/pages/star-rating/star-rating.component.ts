import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit {

  @Input() rate: number = 1;
  @Input() idx: number= 0;
  @Input() countRatings: number= 0;
  starRating?:string;
  

  ngOnInit(): void {
    const newDiv = document.createElement('div');
    const countRating = document.createElement('i');
    let contentTagI = document.createTextNode(`${this.countRatings} ratings`);
    countRating.appendChild(contentTagI);
    for (let i = 1; i <= 5; i++) {
      const iTag = document.createElement('li');
      if (i <= this.rate) {
        iTag.className = 'fa-solid fa-star';
        iTag.style.color = 'orange';
      } else {
        iTag.className = 'fa-solid fa-star';
        iTag.style.color = 'black';
      }
      newDiv.appendChild(iTag); 
    }
    newDiv.appendChild(countRating);
    document.getElementById(`starRatings${this.idx}`)?.appendChild(newDiv);
  }
}
