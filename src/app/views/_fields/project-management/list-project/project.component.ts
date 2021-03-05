import { ProjectType } from './../../../../core/models/project-type';
import { ProjectTypeService } from './../../../../core/services/project-type.service';
import { ProjectService } from './../../../../core/services/project.service';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from './../../../../core/models/project';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})

export class ProjectComponent implements OnInit  {

  projectForm: FormGroup;
  project =new Project();
  allProjects: Array<Project> = [];
  allProjectsType: Array<ProjectType> = [];
  addloader = false;
  updateloader = false;
  _loader = false;

  constructor(
    private projetService: ProjectService,
    private projetTypeService: ProjectTypeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this._loader = true;

    this.projetService.getProject().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(projet => {
      this.allProjects = projet;
      this._loader = false;
      console.log(projet)
    });

    this.projetTypeService.getProjectType().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(type => {
      this.allProjectsType = type;
    });

  }

  initForm() {
    this.project = new Project();
    this.createForm();
  }

  createForm() {
    this.projectForm = this.fb.group({
      adresse: [this.project.adresse, Validators.required],
      date_creation: [this.project.date_creation, Validators.required],
      date_finition: [this.project.date_finition, Validators.required],
      date_finition_prevu: [this.project.date_finition_prevu, Validators.required],
      date_lancement: [this.project.date_lancement, Validators.required],
      description: [this.project.description, Validators.required],
      montant: [this.project.montant, Validators.required],
      nom: [this.project.nom, Validators.required],
      pays: [this.project.pays, Validators.required],
      type: [this.project.type, Validators.required],
      ville: [this.project.ville, Validators.required],
		});
  }

  submit() {
    let controls = this.projectForm.controls;
    this.addloader = true;

    this.project.adresse = controls.adresse.value;
    this.project.montant = controls.montant.value;
    this.project.nom = controls.nom.value;
    this.project.pays = controls.pays.value;
    this.project.type = controls.type.value;
    this.project.ville = controls.ville.value;
    this.project.description = controls.description.value;
    this.project.date_creation = controls.date_creation.value;
    this.project.date_finition = controls.date_finition.value;
    this.project.date_finition_prevu = controls.date_finition_prevu.value;
    this.project.date_lancement = controls.date_lancement.value;

    this.projetService.addProject(this.project);

    Swal.fire({
      position: 'top-end',
      title: 'Projet Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
    this.addloader = false;
  }

  viewProject(projectKey) {
    for( const project of this.allProjects) {
      if (project.key == projectKey) {
        this.project = project
      }
    }

    console.log(this.project);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updateProject() {
    let controls = this.projectForm.controls;
    this.updateloader = true;

    this.project.adresse = controls.adresse.value;
    this.project.montant = controls.montant.value;
    this.project.nom = controls.nom.value;
    this.project.pays = controls.pays.value;
    this.project.type = controls.type.value;
    this.project.ville = controls.ville.value;
    this.project.description = controls.description.value;
    this.project.date_creation = controls.date_creation.value;
    this.project.date_finition = controls.date_finition.value;
    this.project.date_finition_prevu = controls.date_finition_prevu.value;
    this.project.date_lancement = controls.date_lancement.value;

    this.projetService.updateProjet(this.project.key, this.project);

    Swal.fire({
      position: 'top-end',
      title: 'Projet Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
    this.updateloader = false;
  }

  viewtoremove(projectKey) {
    for( const project of this.allProjects) {
      if (project.key == projectKey) {
        this.project = project
      }
    }

    console.log(this.project);
    this.createForm();
    document.getElementById('open_remove_modal').click();
  }

  finichProject() {
    this.updateloader = true;
    let controls = this.projectForm.controls;
    this.project.date_finition = controls.date_finition.value;

    console.log(this.project)
    this.projetService.updateProjet(this.project.key, this.project);

    Swal.fire({
      position: 'top-end',
      title: 'Projet Terminé !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_remove_modal').click();
    this.updateloader = false;
  }

  deleteProject(projectKey) {
    Swal.fire({
      title: 'Etes vous sure ?',
      text: "Cette action n'est pas réverssible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui je Supprime !',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {

        this.projetService.deleteProjet(projectKey);

        Swal.fire(
          'Supprimé !',
          'Le projet a été bien supprimé !',
          'success'
        )
      }
    })
  }

}


