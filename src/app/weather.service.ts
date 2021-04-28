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
    ) {}

    getWeather(item: any) {
        this.weather.push(item)
    }

    getCurrentWeather(locationKey?: string): Observable<any> {
        locationKey = locationKey ? locationKey : "324505"
        return this.http.get(`${environment.url}/currentconditions/v1/${locationKey}?apikey=${environment.apikey}&details=true`)
    }

    getFiveDayWeather(locationKey?: string): Observable<any> {
        locationKey = locationKey ? locationKey : "324505"
        return this.http.get(`${environment.url}/forecasts/v1/daily/5day/${locationKey}?apikey=${environment.apikey}&details=true&metric=true`)
    }

    getAutoComplete(location?): Observable<any> {
        if (!location) {
            return this.http.get(`${environment.url}/locations/v1/cities/autocomplete?apikey=${environment.apikey}&q=Kyiv`)
        }
        return this.http.get(`${environment.url}/locations/v1/cities/autocomplete?apikey=${environment.apikey}&q=` + location)
    }

    getCurrentLocation(): Observable<any> {
        return this.http.get('http://ipinfo.io/81.17.131.26\?token=3003e3a0353d45')
    }


}


