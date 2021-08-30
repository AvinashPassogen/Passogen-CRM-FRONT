import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  month = [];
  totalSales = [];
  data = [];
  constructor(private http: HttpClient) { 

  this.http.get('http://localhost:8080/api/TotalSales').subscribe(data => {
    this.data.push(data);
    console.log(this.data);
   for(let i in data){
this.month.push(data[i].month);
this.totalSales.push(data[i].totalSales);
   }
let chartdata = {
  labels: this.month,
  datasets:[
    {
      label:"Total Sales",
      fill: false,
      lineTension:0.1,
      backgroundColor:"rgba(59,89,152,0.75)",
      borderColor:"rgba(59,89,152,1)",
      pointHoverBackgroundColor:"rgba(59,89,152,1)",
      pointHoverBorderColor:"rgba(59,89,152,1)",
      data:this.totalSales
    }
 
  ]
};
const canvas = <HTMLCanvasElement> document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

let LineGraph = new Chart(ctx, {
  type:'line',
  data:chartdata,
});
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

}
