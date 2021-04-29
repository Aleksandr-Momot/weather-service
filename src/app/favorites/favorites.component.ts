import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Weather} from '../interfaces';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  weather: Weather[] = [];

  constructor(
    private weatherService: WeatherService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.weather = this.weatherService.weather;
  }

  getItWeather() {
    this.route.navigate(['']);
  }

  deleteCard(item) {
    this.weather.splice(this.weather.indexOf(item), 1)
  }

}
