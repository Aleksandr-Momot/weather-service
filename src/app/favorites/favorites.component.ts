import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleName, Weather } from '../interfaces';
import { PostsService } from '../weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  weather: Weather[]=[];

  localeName: LocaleName[]=[];

  locName: string;

  constructor(
    private weatherService: PostsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.weather = this.weatherService.weather

    this.weatherService.getAutoComplete().subscribe( data => { 
      this.localeName = data 
      data[0].LocalizedName
      
      this.locName = data[0].LocalizedName
      this.weatherService.getAutoComplete(this.locName).subscribe( data => {this.locName = data;})
    })
  }

  getItWeather() {
    this.route.navigate([''])
  }

}
