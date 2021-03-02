import { ProjectTypeService } from './../../../../core/services/project-type.service';
import { ProjectType } from './../../../../core/models/project-type';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-type-project',
  templateUrl: './type-project.component.html',
})
export class TypeProjectComponent implements OnInit {

  projectTypeForm: FormGroup;
  projectType = new ProjectType();
  allProjectsType: Array<ProjectType> = [];
  _loader = false;

  constructor(
    private projetTypeService: ProjectTypeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this._loader = true;

    this.projetTypeService.getProjectType().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(type => {
      this.allProjectsType = type;
      this._loader = false;
      console.log(type)
    });

  }

  initForm() {
    this.projectType = new ProjectType();
    this.createForm();
  }

  createForm() {
    this.projectTypeForm = this.fb.group({
      // code: [this.projectType.code, Validators.required],
      nom: [this.projectType.nom, Validators.required],
		});
  }

  submit() {
    let controls = this.projectTypeForm.controls;

    // this.projectType.code = controls.code.value;
    this.projectType.nom = controls.nom.value;

    this.projetTypeService.addProjectType(this.projectType);


    Swal.fire({
      position: 'top-end',
      title: 'Type de Projet Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  viewProjectType(projectTypeKey) {
    console.log(projectTypeKey)

    for( const projectType of this.allProjectsType) {
      if (projectType.key == projectTypeKey) {
        this.projectType = projectType
      }
    }

    console.log(this.projectType);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updateProjectType() {
    let controls = this.projectTypeForm.controls;

    // this.projectType.code = controls.code.value;
    this.projectType.nom = controls.nom.value;

    this.projetTypeService.updateProjectType(this.projectType.key, this.projectType);

    Swal.fire({
      position: 'top-end',
      title: 'Type de Projet Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
  }

  deleteProjectType(projectKey) {
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

        this.projetTypeService.deleteProjectType(projectKey);

        Swal.fire(
          'Supprimé !',
          'Le type de projet a été bien supprimé !',
          'success'
        )
      }
    })
  }

}
