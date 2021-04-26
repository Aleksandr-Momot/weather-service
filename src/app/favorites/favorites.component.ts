import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Weather } from '../interfaces';
import { PostsService } from '../weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  weather: Weather[]=[];

  constructor(
    private weatherService: PostsService,
  ) {}

  ngOnInit(): void {
    // this.weatherService.addToFavorite()
  }
}
