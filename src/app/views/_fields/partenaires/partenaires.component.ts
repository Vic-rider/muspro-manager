import { PartenaireService } from './../../../core/services/partenaire.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs/operators'
import { Partenaire } from '../../../core/models/partenaire';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
})
export class PartenairesComponent implements OnInit {

  partenaireForm: FormGroup;
  partenaire = new Partenaire();
  allPartenaire: Array<Partenaire> = [];
  _loader = false;

  constructor(
    private partenaireService: PartenaireService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this._loader = true;

    this.partenaireService.getPartenaire().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(partenaire => {
      this.allPartenaire = partenaire;
      this._loader = false;
      console.log(partenaire)
    });

  }

  initForm() {
    this.partenaire = new Partenaire();
    this.createForm();
  }

  createForm() {
    this.partenaireForm = this.fb.group({
      code: [this.partenaire.code, Validators.required],
      nom: [this.partenaire.nom, Validators.required],
      prenom: [this.partenaire.prenom, Validators.required],
      tel: [this.partenaire.tel, Validators.required],
      ville: [this.partenaire.ville, Validators.required],
		});
  }

  submit() {
    let controls = this.partenaireForm.controls;

    this.partenaire.code = controls.code.value;
    this.partenaire.nom = controls.nom.value;
    this.partenaire.prenom = controls.prenom.value;
    this.partenaire.tel = controls.tel.value;
    this.partenaire.ville = controls.ville.value;

    this.partenaireService.addPartenaire(this.partenaire);


    Swal.fire({
      position: 'top-end',
      title: 'Partenaire Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  viewPartenaire(partenaireKey) {
    console.log(partenaireKey)

    for( const partenaire of this.allPartenaire) {
      if (partenaire.key == partenaireKey) {
        this.partenaire = partenaire
      }
    }

    console.log(this.partenaire);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updatePartenaire() {
    let controls = this.partenaireForm.controls;

    this.partenaire.code = controls.code.value;
    this.partenaire.nom = controls.nom.value;
    this.partenaire.prenom = controls.prenom.value;
    this.partenaire.tel = controls.tel.value;
    this.partenaire.ville = controls.ville.value;

    console.log(this.partenaire)

    this.partenaireService.updatePartenaire(this.partenaire.key, this.partenaire);

    Swal.fire({
      position: 'top-end',
      title: 'Partenaire Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
  }

  deletePartenaire(projectKey) {
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

        this.partenaireService.deletePartenaire(projectKey);

        Swal.fire(
          'Supprimé !',
          'Le type de projet a été bien supprimé !',
          'success'
        )
      }
    })
  }

}
