import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import ApexCharts from 'apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.css'
})
export class WeatherChartComponent {

  @ViewChild('weatherChart', { static: true }) weatherChartEl!: ElementRef;

  public weatherChartOptions: any;

  config = {
    colors: {
      primary: '#696cff',
      secondary: '#8592a3',
      success: '#71dd37',
      info: '#03c3ec',
      warning: '#ffab00',
      danger: '#ff3e1d',
      dark: '#233446',
      black: '#22303e',
      white: '#fff',
      cardColor: '#fff',
      bodyBg: '#f5f5f9',
      bodyColor: '#646E78',
      headingColor: '#384551',
      textMuted: '#a7acb2',
      borderColor: '#e4e6e8'
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initWeatherChart();
      this.renderChart();
    }
  }

  // Initialize Weather Chart
  initWeatherChart(): void {
    this.weatherChartOptions = {
      series: [
        {
          name: 'Temperature',
          data: [21, 24, 22, 25, 27, 29, 30, 31, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8]
        }
      ],
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      legend: {
        show: false
      },
      colors: [this.config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.6,
          opacityFrom: 0.5,
          opacityTo: 0.25,
          stops: [0, 95, 100]
        }
      },
      grid: {
        borderColor: this.config.colors.borderColor,
        strokeDashArray: 8,
        padding: {
          top: -20,
          bottom: -8,
          left: 0,
          right: 8
        }
      },
      xaxis: {
        categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          style: {
            fontSize: '13px',
            colors: this.config.colors.bodyColor
          }
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '13px',
            colors: this.config.colors.bodyColor
          }
        },
        min: 0,
        max: 35,
        tickAmount: 5
      }
    };
  }

  // Render the weather chart
  renderChart(): void {
    const weatherChart = new ApexCharts(this.weatherChartEl.nativeElement, this.weatherChartOptions);
    weatherChart.render();
  }
}