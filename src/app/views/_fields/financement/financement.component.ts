import { PartenaireService } from './../../../core/services/partenaire.service';
import { Partenaire } from './../../../core/models/partenaire';
import { FinancementService } from './../../../core/services/financement.service';
import { Financement } from './../../../core/models/financement';
import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  financementEditForm: FormGroup;
  addFinancement = new Financement();
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
    this.addFinancement = new Financement();
    this.createForm();
  }

  createForm() {
    this.financementForm = this.fb.group({
      nom: [this.financement.nom, Validators.required],
      montant: [null, Validators.required],
      date_financement: [null, Validators.required],
      id_partenaire: [null, Validators.required]
		});


    this.financementEditForm = this.fb.group({
      editmontant: [null, Validators.required],
      editdate_financement: [null, Validators.required],
      editid_partenaire: [null, Validators.required],
		});

  }

  removePatner(index) {
    this.addFinancement.partenaires.splice(index, 1)
  }

  validEditedPartner(index) {
    let controls = this.financementEditForm.controls;

    for( const partenaire of this.allPartenaire) {
      if (partenaire.key == controls.editid_partenaire.value) {

        let partner = {
          partenaire: partenaire,
          montant: controls.editmontant.value,
          date_financement: controls.editdate_financement.value,
          edit: false,
        }

        this.addFinancement.partenaires[index] = partner;
      }
    }
  }

  editPartner(index) {
    this.addFinancement.partenaires[index].edit = true;

    console.log(this.addFinancement.partenaires[index])

    this.financementEditForm = this.fb.group({
      editmontant: [this.addFinancement.partenaires[index].montant, Validators.required],
      editdate_financement: [this.addFinancement.partenaires[index].date_financement, Validators.required],
      editid_partenaire: [this.addFinancement.partenaires[index].partenaire.key, Validators.required],
		});

  }

  closeEditPartner(index) {
    this.addFinancement.partenaires[index].edit = false;
  }

  addPartner() {
    let controls = this.financementForm.controls;

    for( const partenaire of this.allPartenaire) {
      if (partenaire.key == controls.id_partenaire.value) {
        let partner = {
          partenaire: partenaire,
          montant: controls.montant.value,
          date_financement: controls.date_financement.value,
          edit: false,
        }

        this.addFinancement.partenaires.push(partner)
      }
    }

    this.financementForm = this.fb.group({
      nom: [controls.nom.value, Validators.required],
      montant: [null, Validators.required],
      date_financement: [null, Validators.required],
      id_partenaire: [null, Validators.required],
		});

  }

  submit() {
    let controls = this.financementForm.controls;

    this.financement.nom = controls.nom.value;
    this.financement.partenaires = this.addFinancement.partenaires;

    console.log(this.financement)
    this.addFinancement = new Financement();

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
        this.addFinancement = this.financement;
      }
    }

    console.log(this.financement);

    this.financementForm = this.fb.group({
      nom: [this.financement.nom, Validators.required],
      montant: [null, Validators.required],
      date_financement: [null, Validators.required],
      id_partenaire: [null, Validators.required]
		});

    document.getElementById('open_update_modal').click();
  }

  updateFinancement() {
    let controls = this.financementForm.controls;

    this.financement.nom = controls.nom.value;
    this.financement.partenaires = this.addFinancement.partenaires;

    console.log(this.financement)
    this.addFinancement = new Financement();

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
