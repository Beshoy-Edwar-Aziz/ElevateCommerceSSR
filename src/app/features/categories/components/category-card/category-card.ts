import { Component, Input, OnInit } from '@angular/core';
import { categoriesInterface } from '../../models/categories-interface';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard  {
  @Input({required:true}) categories!:categoriesInterface;

}
