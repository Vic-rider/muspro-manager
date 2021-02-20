import { TacheronsService } from './../../../core/services/tacherons.service';
import { Tacherons } from './../../../core/models/tacherons';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tacherons',
  templateUrl: './tacherons.component.html',
})
export class TacheronsComponent implements OnInit {

  tacheronsForm: FormGroup;
  tacheron = new Tacherons();
  allTacherons: Array<Tacherons> = [];
  _loader = false;

  constructor(
    private tacheronServices: TacheronsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this._loader = true;

    this.tacheronServices.getTacherons().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(tacheron => {
      this.allTacherons = tacheron;
      this._loader = false;
      console.log(tacheron)
    });

  }

  initForm() {
    this.tacheron = new Tacherons();
    this.createForm();
  }

  createForm() {
    this.tacheronsForm = this.fb.group({
      adresse: [this.tacheron.adresse, Validators.required],
      nom: [this.tacheron.nom, Validators.required],
      prenom: [this.tacheron.prenom, Validators.required],
      tel: [this.tacheron.tel, Validators.required],
      ville: [this.tacheron.ville, Validators.required],
		});
  }

  submit() {
    let controls = this.tacheronsForm.controls;

    this.tacheron.adresse = controls.adresse.value;
    this.tacheron.nom = controls.nom.value;
    this.tacheron.prenom = controls.prenom.value;
    this.tacheron.tel = controls.tel.value;
    this.tacheron.ville = controls.ville.value;

    this.tacheronServices.addTacherons(this.tacheron);


    Swal.fire({
      position: 'top-end',
      title: 'Tacheron Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  viewTacheron(tacheronKey) {
    console.log(tacheronKey)

    for( const tacheron of this.allTacherons) {
      if (tacheron.key == tacheronKey) {
        this.tacheron = tacheron
      }
    }

    console.log(this.tacheron);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updateTacheron() {
    let controls = this.tacheronsForm.controls;

    this.tacheron.adresse = controls.adresse.value;
    this.tacheron.nom = controls.nom.value;
    this.tacheron.prenom = controls.prenom.value;
    this.tacheron.tel = controls.tel.value;
    this.tacheron.ville = controls.ville.value;

    console.log(this.tacheron)

    this.tacheronServices.updateTacherons(this.tacheron.key, this.tacheron);

    Swal.fire({
      position: 'top-end',
      title: 'Tacheron Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
  }

  deleteTacheron(projectKey) {
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

        this.tacheronServices.deleteTacherons(projectKey);

        Swal.fire(
          'Supprimé !',
          'Le Tacheron a été bien supprimé !',
          'success'
        )
      }
    })
  }

}
