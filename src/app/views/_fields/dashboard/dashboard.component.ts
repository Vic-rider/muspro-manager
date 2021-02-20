import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.displayUsersPercent()
    this.displayDistrict()
  }

  displayUsersPercent() {
    var ctx = document.getElementById("persons");
		new Chart(ctx, {
				type: 'pie',
				labels: ["Femmes", "Hommes"],
				data: {
					datasets: [{
						backgroundColor: [
							"#eb5076",
							"#fba540",
						],
						data: [70, 30,],
						borderWidth: [0, 0]
					}]
				},
			options: {
			   legend: {
				 position :"right",
				 display: true,
				    labels: {
					  fontColor: '#585757',
					  boxWidth:15
				   }
				}
			   }
		});
  }

  displayDistrict() {
    var ctx = document.getElementById("regionchart");
		new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ["Arrond 1", "Arrond 2", "Arrond 3", "Arrond 4"],
					datasets: [{
						backgroundColor: [
							"#14abef",
							"#02ba5a",
							"#eb5076",
							"#d13adf"
						],
						data: [13, 120, 11, 20],
						borderWidth: [0, 0, 0, 0]
					}]
				},
			options: {
        title: {
					display: false,
				},
				legend: {
					display: false
				},
				responsive: true,
			   }
			});
  }

}
