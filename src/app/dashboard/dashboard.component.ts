import { Component, OnInit } from '@angular/core';
import { Country, Weather, WeatherFive } from '../interfaces';
import { PostsService } from '../weather.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;
  country: Country;
  weather: Weather[]=[];
  weatherFive: WeatherFive;
  titleText = 'Currently weather'
  LocalizedName: string;
  Temperature: number;
  Metric: number;
  Value: number;
  Unit: string;
  WeatherText: string;
  Key: string


  locationValue: string;
  constructor(
    private weatherservice: PostsService,
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.weatherservice.getCurrentWeather().subscribe(data => {
      this.weather = data;
    })

    this.form = this.formbuilder.group({
      location: ['']
    })

    this.weatherservice.getCurrentLocation().subscribe(data => this.country = data)

    this.weatherservice.getFiveDayWeather().subscribe(data => { this.weatherFive = data; })
  }

  addToFavorite() {
    this.weatherservice.addToFavorite( {
      LocalizedName: this.LocalizedName,
      Temperature: this.Temperature,
      Metric: this.Metric,
      Value: this.Value,
      Unit: this.Unit,
      WeatherText: this.WeatherText,
      Key: this.Key
    }).subscribe( data => {
      console.log('datadata', data);
      this.weather.push(data)
    })
  
  }

  sendWeather(formValues) {
    this.weatherservice
      .getAutoComplete(formValues.location)
      .subscribe(data => {
        this.weather = data
        data[0].Key
        this.locationValue = data[0].Key
        this.weatherservice.getCurrentWeather(this.locationValue).subscribe( data => { this.weather = data});
        this.weatherservice.getFiveDayWeather(this.locationValue).subscribe( data => { this.weatherFive = data;})
        console.log(this.weather);
      });
  }
}
