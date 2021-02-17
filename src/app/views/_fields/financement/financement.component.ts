import { PartenaireService } from './../../../core/services/partenaire.service';
import { Partenaire } from './../../../core/models/partenaire';
import { FinancementService } from './../../../core/services/financement.service';
import { Financement } from './../../../core/models/financement';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
})
export class FinancementComponent implements OnInit {

  _loader = false;
  financementForm: FormGroup;
  financement = new Financement();
  allFinancement: Array<Financement> = [];
  partenaire = new Partenaire();
  allPartenaire: Array<Partenaire> = [];

  constructor(
    private financementService: FinancementService,
    private partenaireService: PartenaireService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this._loader = true;
    //get financements
    this.financementService.getFinancement().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(financement => {
      this._loader = false;
      this.allFinancement = financement;
      console.log(financement)
    });

    //get partenaires
    this.partenaireService.getPartenaire().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(partnaire => {
      this.allPartenaire = partnaire;
    });

  }

  initForm() {
    this.financement = new Financement();
    this.createForm();
  }

  createForm() {
    this.financementForm = this.fb.group({
      code: [this.financement.code, Validators.required],
      date_financement: [this.financement.date_financement, Validators.required],
      id_partenaire: [this.financement.id_partenaire, Validators.required],
		});
  }

  submit() {
    let controls = this.financementForm.controls;

    //select the choseen partenaire
    for( const partenaire of this.allPartenaire) {
      if (partenaire.key == controls.id_partenaire.value) {
        this.partenaire = partenaire
      }
    }

    this.financement.code = controls.code.value;
    this.financement.date_financement = controls.date_financement.value;
    this.financement.id_partenaire = controls.id_partenaire.value;
    this.financement.nom_partenaire = this.partenaire.nom + ' ' + this.partenaire.prenom;

    this.financementService.addFinancement(this.financement);



    Swal.fire({
      position: 'top-end',
      title: 'Financement Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  viewFinancement(financementKey) {
    console.log(financementKey)

    for( const financement of this.allFinancement) {
      if (financement.key == financementKey) {
        this.financement = financement
      }
    }

    console.log(this.financement);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updateFinancement() {
    let controls = this.financementForm.controls;

    for( const partenaire of this.allPartenaire) {
      if (partenaire.key == controls.id_partenaire.value) {
        this.partenaire = partenaire
      }
    }

    this.financement.code = controls.code.value;
    this.financement.date_financement = controls.date_financement.value;
    this.financement.id_partenaire = controls.id_partenaire.value;
    this.financement.nom_partenaire = this.partenaire.nom + ' ' + this.partenaire.prenom;

    console.log(this.financement)

    this.financementService.updateFinancement(this.financement.key, this.financement);

    Swal.fire({
      position: 'top-end',
      title: 'Financement Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
  }

  deleteFinancement(projectKey) {
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

        this.financementService.deleteFinancement(projectKey);

        Swal.fire(
          'Supprimé !',
          'Le Financement a été bien supprimé !',
          'success'
        )
      }
    })
  }

}
