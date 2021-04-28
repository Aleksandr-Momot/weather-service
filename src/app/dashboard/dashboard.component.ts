import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Country, LocaleName, Weather, WeatherFive } from '../interfaces';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;
  country: Country;
  weather: Weather[] = [];
  weatherFive: WeatherFive;
  titleText = 'Currently weather';
  localeName: LocaleName;
  locationValue: string;
  locName: string;
  filling = false;
  time = new Date();
  timer: any;
  constructor(
    private weatherservice: WeatherService,
    private formbuilder: FormBuilder,
  ) {
  }


  ngOnInit(): void {
    this.weatherservice.getCurrentWeather().subscribe(data => {
      this.weather = data;
      this.weatherservice.getAutoComplete().subscribe(data => {
        this.weather[0].LocalizedName = data[0].LocalizedName
      });
    });

    this.weatherservice.getFiveDayWeather().subscribe(data => {
      this.weatherFive = data;
    });

    this.form = this.formbuilder.group({
      location: ['']
    });

    this.weatherservice.getCurrentLocation().subscribe(data =>
      this.country = data);

    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  toggleFill() {
    this.filling = !this.filling;
  }

  addToFavorite(item: any) {
    this.weatherservice.getWeather(item);
  }

  sendWeather(formValues) {
    this.weatherservice
      .getAutoComplete(formValues.location)
      .subscribe(data => {
        this.weather = data;
        this.locName = data[0].LocalizedName;
        this.locationValue = data[0].Key;
        this.weatherservice.getCurrentWeather(this.locationValue).subscribe(data => {
          this.weather = data; this.weather[0].LocalizedName = this.locName;
        });
        this.weatherservice.getFiveDayWeather(this.locationValue).subscribe(data => {
          this.weatherFive = data;
        });
      });
  }
}
