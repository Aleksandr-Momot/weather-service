import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Country, LocaleName, Weather, WeatherFive } from '../interfaces';
import { PostsService } from '../weather.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public form: FormGroup;
  country: Country;
  weather: Weather[]=[];
  weatherFive: WeatherFive;
  titleText = 'Currently weather'
  localeName: LocaleName;
  locationValue: string;
  locName: string;
  filling: boolean = false;

  localCity: any;
  time = new Date();
  timer: any;
  constructor(
    private weatherservice: PostsService,
    private formbuilder: FormBuilder,
  ) {
   }


  ngOnInit(): void {
    
    // this.localCity = this.weatherservice.getAutoComplete()
    // .subscribe(data => {
    //   this.weather = data
    //   data[0].LocalizedName
    //   this.localCity = data[0].LocalizedName
    // });

    this.weatherservice.getAutoComplete().subscribe( data => {this.localeName = data;})

    this.weatherservice.getCurrentWeather().subscribe( data => { this.weather = data;})

    this.weatherservice.getFiveDayWeather().subscribe( data => { this.weatherFive = data;})

    this.form = this.formbuilder.group({
      location: ['']
    })

    this.weatherservice.getCurrentLocation().subscribe(data => this.country = data)

    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  toggleFill(){
    this.filling=!this.filling;
  }

  addToFavorite(item: any) {
    this.weatherservice.getWeather(item)
  }

  sendWeather(formValues) {
    this.weatherservice
      .getAutoComplete(formValues.location)
      .subscribe(data => {
        this.weather = data
        data[0].Key
        data[0].LocalizedName
        this.locName = data[0].LocalizedName
        this.locationValue = data[0].Key
        console.log(data);
        this.weatherservice.getCurrentWeather(this.locationValue).subscribe( data => { this.weather = data});
        this.weatherservice.getFiveDayWeather(this.locationValue).subscribe( data => { this.weatherFive = data;})
        this.weatherservice.getAutoComplete(this.locName).subscribe( data => {this.localeName = data;})
      });
  }
}
