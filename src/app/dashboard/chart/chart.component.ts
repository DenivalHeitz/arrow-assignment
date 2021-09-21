import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

import { Vaccine } from 'src/app/model/vaccine';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @ViewChild('barCanvas') barCanvas: ElementRef
  @ViewChild('pieCanvas') pieCanvas: ElementRef

  barCanvasContext: CanvasRenderingContext2D;
  pieCanvasContext: CanvasRenderingContext2D;
  
  vaccineData: Vaccine[];
  currentStateData: Vaccine;
  stateNames = new Array();
  stateCodes = new Array();
  juneVax = new Array();
  julyVax = new Array();
  currentJuneTotal: number = 0;
  currentJulyTotal: number = 0;
  barChart: Chart;
  pieChart: Chart;
  pieChartConfig: any
  barChartConfig: any

  constructor(private dataService: DataService) {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
    );
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
    this.barCanvasContext = this.barCanvas.nativeElement.getContext('2d');
    this.pieCanvasContext = this.pieCanvas.nativeElement.getContext('2d');
    this.initVaccineData();
  }

  initVaccineData(): void {
    this.dataService.getAllVaccineData()
      .subscribe(
        data => {
          this.vaccineData = data;

          for (let i = 0; i < this.vaccineData.length; i++) {
            this.stateNames.push(this.vaccineData[i].stateName);
            this.stateCodes.push(this.vaccineData[i].stateCode);
            this.juneVax.push(this.vaccineData[i].juneVax);
            this.julyVax.push(this.vaccineData[i].julyVax);
            this.currentJuneTotal += this.vaccineData[i].juneVax;
            this.currentJulyTotal += this.vaccineData[i].julyVax;
          }

          console.log("this.stateNames", this.stateNames.toString());
          console.log("this.stateCodes", this.stateCodes.toString());
          console.log("this.juneVax", this.juneVax);
          console.log("this.julyVax", this.julyVax);
          console.log("this.currentJuneTotal", this.currentJuneTotal);
          console.log("this.currentJulyTotal", this.currentJulyTotal);

          // bar and pie chart configs
          this.barChartConfig = {
            labels: this.stateCodes,
            dataSets: [
              {
                label: "June",
                data: this.juneVax,
                boarderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
              },
              {
                label: "July",
                data: this.julyVax,
                boarderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderWidth: 1
              },
            ]
          };

          this.pieChartConfig = {
            labels: ['June', 'July'],
            datasets: [{
              lable: 'Vaccine Percentage (All States)',
              data: [this.currentJuneTotal, this.currentJulyTotal],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              hoverOffset: 20
            }],
          };

          // build bar and pie charts
          this.barChart = new Chart(this.barCanvasContext, {
            type: 'bar',
            data: {
              labels: this.stateCodes,
              datasets: this.barChartConfig.dataSets
            },
            options: {
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'State Vaccine Data'
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          this.pieChart = new Chart(this.pieCanvasContext, {
            type: 'pie',
            data: {
              labels: this.pieChartConfig.labels,
              datasets: this.pieChartConfig.datasets
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Vaccine Percentages (All States)'
                }
              }
            },
          });


        },
        error => {
          console.log(error);
        }
      );
  }

  selectState(stateCode: string): void {
    this.dataService.getVaccineData(stateCode)
      .subscribe(
        data => {
          this.currentStateData = data;
          this.currentJuneTotal = data.juneVax;
          this.currentJulyTotal = data.julyVax;

          this.updateCharts();

          console.log("this.currentStateData", this.currentStateData);
          console.log("this.currentJuneTotal", this.currentJuneTotal);
          console.log("this.currentJulyTotal", this.currentJulyTotal);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateCharts(): void {
    // update bar chart data
    this.barChart.options.plugins.title.text = `State Vaccine Data (${this.currentStateData.stateName})`;
    this.barChart.data.labels = [this.currentStateData.stateName];
    this.barChart.data.datasets[0].data = [this.currentJuneTotal];
    this.barChart.data.datasets[1].data = [this.currentJulyTotal];

    //update pie chart data
    this.pieChart.options.plugins.title.text = `Vaccine Percentage (${this.currentStateData.stateName})`;
    this.pieChart.data.datasets[0].data = [this.currentJuneTotal, this.currentJulyTotal];

    this.barChart.update();
    this.pieChart.update();
  }

  resetCharts(): void {
    this.currentJuneTotal = 0;
    this.currentJulyTotal = 0;

    for (let i = 0; i < this.vaccineData.length; i++) {
      this.currentJuneTotal += this.vaccineData[i].juneVax;
      this.currentJulyTotal += this.vaccineData[i].julyVax;
    }

    // reset bar chart data
    this.barChart.options.plugins.title.text = `State Vaccine Data (All States)`;
    this.barChart.data.labels = this.stateCodes;
    this.barChart.data.datasets[0].data = this.juneVax;
    this.barChart.data.datasets[1].data = this.julyVax;

    // reset pie chart data
    this.pieChart.options.plugins.title.text = `Vaccine Percentage (All States)`;
    this.pieChart.data.datasets[0].data = [this.currentJuneTotal, this.currentJulyTotal];

    this.barChart.update();
    this.pieChart.update();
  }

}
