import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { Beneficiaire } from 'src/app/core/models/beneficiaire';
import { Financement } from 'src/app/core/models/financement';
import { Partenaire } from 'src/app/core/models/partenaire';
import { Project } from 'src/app/core/models/project';
import { Tacherons } from 'src/app/core/models/tacherons';
import {map} from 'rxjs/operators'
import { ProjectService } from 'src/app/core/services/project.service';
import { FinancementService } from 'src/app/core/services/financement.service';
import { PartenaireService } from 'src/app/core/services/partenaire.service';
import { TacheronsService } from 'src/app/core/services/tacherons.service';
import { BenéficiareService } from 'src/app/core/services/benéficiare.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  date = new Date();

  allProjects: Array<Project> = [];
  allProjetWaiting: Array<Project> = [];
  allProjetpending: Array<Project> = [];

  allBeneficiaire: Array<Beneficiaire> = [];
  allFinancement: Array<Financement> = [];
  allTacherons: Array<Tacherons> = [];
  allPartenaire: Array<Partenaire> = [];

  constructor(
	  private projetService: ProjectService,
	  private financementService: FinancementService,
	  private partenaireService: PartenaireService,
	  private tacheronServices: TacheronsService,
	  private beneficiareService: BenéficiareService,

  ) { }

  ngOnInit(): void {
    this.displayUsersPercent()
    this.displayDistrict()
	this.getDates();

	if(!!localStorage.getItem('log')) {
		localStorage.removeItem('log')
		location.reload();
	}
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

  getDates() {
	this.projetService.getProject().snapshotChanges().pipe(
		map(changes =>
		  changes.map(c =>
			({ key: c.payload.doc.id, ...c.payload.doc.data() })
		  )
		)
	  ).subscribe(projet => {
		this.allProjects = projet;

		for (const p of this.allProjects) {
			if (!p.date_finition) {
				this.allProjetpending.push(p)
			} else if (!p.date_lancement) {
				this.allProjetWaiting.push(p)
			}
		}
	  });

	  this.financementService.getFinancement().snapshotChanges().pipe(
		map(changes =>
		  changes.map(c =>
			({ key: c.payload.doc.id, ...c.payload.doc.data() })
		  )
		)
	  ).subscribe(financement => {
		this.allFinancement = financement;
	  });

	  this.partenaireService.getPartenaire().snapshotChanges().pipe(
		map(changes =>
		  changes.map(c =>
			({ key: c.payload.doc.id, ...c.payload.doc.data() })
		  )
		)
	  ).subscribe(partenaire => {
		this.allPartenaire = partenaire;
	  });

	  this.tacheronServices.getTacherons().snapshotChanges().pipe(
		map(changes =>
		  changes.map(c =>
			({ key: c.payload.doc.id, ...c.payload.doc.data() })
		  )
		)
	  ).subscribe(tacheron => {
		this.allTacherons = tacheron;
	  });

	  this.beneficiareService.getBeneficiaire().snapshotChanges().pipe(
		map(changes =>
		  changes.map(c =>
			({ key: c.payload.doc.id, ...c.payload.doc.data() })
		  )
		)
	  ).subscribe(beneficiaire => {
		this.allBeneficiaire = beneficiaire;
	  });
  }

}
