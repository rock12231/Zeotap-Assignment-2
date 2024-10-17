import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private baseUrl = 'http://localhost:3000/api/weather';

  constructor(private http: HttpClient) {}

  // Method to get weather data by city
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}/city/${city}`;
    return this.http.get(url);
  }

  // Method to get daily summary by city
  getDailySummaryByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}/summary/${city}`;
    return this.http.get(url);
  }
}
