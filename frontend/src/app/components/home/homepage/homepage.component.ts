import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartConfiguration, ChartType } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements AfterViewInit {

  @ViewChild('myRadarChart') myRadarChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myRadarChart2') myRadarChart2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myRadarChart3') myRadarChart3!: ElementRef<HTMLCanvasElement>;

  constructor() {
    Chart.register(...registerables);
  }
  ngAfterViewInit() {
    if (this.myRadarChart && this.myRadarChart.nativeElement) {
      this.createRadarChart();
    }
    if (this.myRadarChart2 && this.myRadarChart2.nativeElement) {
      this.createBarChart();
    }
  }

  createRadarChart() {
      const data = {
        labels: ['Marketing', 'Risk assessment', 'Managing supplies', 'Accounting', 'Management', 'Logistics', 'Communication','Pitching'],
        datasets: [{
          label: 'Startup skills',
          data: [20, 12, 28, 18, 26, 24, 13, 20],
          fill: true,
          backgroundColor: 'rgba(221,99,255,0.2)',
          borderColor: 'rgb(203,99,255)',
          pointBackgroundColor: 'rgb(203,99,255)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(193,99,255)'
        }],
      };

      const config: ChartConfiguration<'radar'> = {
        type: 'radar',
        data: data,
        options: {
          scales: {
            r: {

              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        },
      };

    new Chart(this.myRadarChart.nativeElement, config);
  }
  createBarChart() {
      const data = {
        labels: ['Marketing', 'Risk assessment', 'Managing supplies', 'Accounting', 'Management', 'Logistics', 'Communication','Pitching'],
        datasets: [{
          label: 'Startup skills',
          data: [20, 12, 28, 18, 26, 24, 13, 20],
          fill: true,
          backgroundColor: 'rgba(221,99,255,0.2)',
          borderColor: 'rgb(203,99,255)',
          pointBackgroundColor: 'rgb(203,99,255)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(193,99,255)'
        }],
      };

      const config2: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: data,
      };

    new Chart(this.myRadarChart2.nativeElement, config2);
  }
}
