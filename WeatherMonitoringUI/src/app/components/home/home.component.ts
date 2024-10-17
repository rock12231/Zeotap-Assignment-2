import { Component } from '@angular/core';
import { WeatherApiService } from '../../shared/services/weather-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  city: string = '';
  weatherData: any;
  dailySummary: any;
  errorMessage: string = '';

  constructor(private weatherApiService: WeatherApiService) {}

  // ngOnInit(): void {
  //   this.getWeatherData();
  //   this.getDailySummary();
  // }

  // Method to get weather data for the selected city
  getWeatherData() {
    this.weatherApiService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching weather data: ${error.message}`;
      },
    });
  }

  // Method to get daily summary for the selected city
  getDailySummary() {
    this.weatherApiService.getDailySummaryByCity(this.city).subscribe({
      next: (data) => {
        this.dailySummary = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching daily summary: ${error.message}`;
      },
    });
  }

  // Method to change the city and refresh data
  onCityChange(newCity: string) {
    this.city = newCity;
    this.getWeatherData();
    this.getDailySummary();
  }


}
