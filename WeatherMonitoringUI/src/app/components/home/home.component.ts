import { Component } from '@angular/core';
import { WeatherApiService } from '../../shared/services/weather-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  weatherData: any;
  dailySummary: any;
  errorMessage: string = '';

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.checkWeather('Lucknow');
  }

  // Method to get weather data for the selected city
  checkWeather(city:string) {
    this.weatherApiService.getWeatherByCity(city).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching weather data: ${error.message}`;
      },
    });
  }

  // Method to get daily summary for the selected city
  getDailySummary(city:string) {
    this.weatherApiService.getDailySummaryByCity(city).subscribe({
      next: (data) => {
        this.dailySummary = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching daily summary: ${error.message}`;
      },
    });
  }


}
