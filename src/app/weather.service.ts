import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from './interfaces';

@Injectable({ providedIn: 'root' })
export class PostsService {

    weather: Weather[] = [];

    

    constructor(
        private http: HttpClient,
    ) { }


    addToFavorite(item: Weather): Observable<Weather> {
        return this.http.post<Weather>(`${environment.url}/currentconditions/v1/323903?apikey=${environment.apikey}&details=false`, item)
    }

    // pushWeather(weather) {
    //     this.weather.push(weather)
    //     console.log(weather);

    // }

    getWeather() {
        return this.weather;
    }

    getCurrentWeather(locationKey?: string): Observable<any> {
        locationKey = locationKey ? locationKey : "324505"
        return this.http.get(`${environment.url}/currentconditions/v1/${locationKey}?apikey=${environment.apikey}&details=true`)
    }

    getFiveDayWeather(locationKey?: string): Observable<any> {
        locationKey = locationKey ? locationKey : "324505"
        return this.http.get(`${environment.url}/forecasts/v1/daily/5day/${locationKey}?apikey=${environment.apikey}&details=true&metric=true`)
    }

    getCurrentLocation(): Observable<any> {
        return this.http.get('http://ipinfo.io/81.17.131.26\?token=3003e3a0353d45')
    }

    getAutoComplete(location): Observable<any> {
        return this.http.get(`${environment.url}/locations/v1/cities/autocomplete?apikey=${environment.apikey}&q=` + location)
    }
}


