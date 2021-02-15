import { Beneficiaire } from './../../../core/models/beneficiaire';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
import { BenéficiareService } from 'src/app/core/services/benéficiare.service';

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
})
export class BeneficiaireComponent implements OnInit {

  beneficiaireForm: FormGroup;
  beneficiare = new Beneficiaire();
  allBeneficiaire: Array<Beneficiaire> = [];

  constructor(
    private beneficiareService: BenéficiareService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();

    this.beneficiareService.getBeneficiaire().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(beneficiaire => {
      this.allBeneficiaire = beneficiaire;
      console.log(beneficiaire)
    });

  }

  initForm() {
    this.beneficiare = new Beneficiaire();
    this.createForm();
  }

  createForm() {
    this.beneficiaireForm = this.fb.group({
      nom: [this.beneficiare.nom, Validators.required],
      prenom: [this.beneficiare.prenom, Validators.required],
      age: [this.beneficiare.age, Validators.required],
      tel: [this.beneficiare.tel, Validators.required],
      nbr_enfant: [this.beneficiare.nbr_enfant, Validators.required],
      ethnie: [this.beneficiare.ethnie, Validators.required],
      code: [this.beneficiare.code_chaine, Validators.required],
      pays: [this.beneficiare.pays, Validators.required],
      quartier: [this.beneficiare.quartier, Validators.required],
      ville: [this.beneficiare.ville, Validators.required],
		});
  }

  submit() {
    let controls = this.beneficiaireForm.controls;

    this.beneficiare.nom = controls.nom.value;
    this.beneficiare.prenom = controls.prenom.value;
    this.beneficiare.age = controls.age.value;
    this.beneficiare.tel = controls.tel.value;
    this.beneficiare.nbr_enfant = controls.nbr_enfant.value;
    this.beneficiare.ethnie = controls.ethnie.value;
    this.beneficiare.code_chaine = controls.code.value;
    this.beneficiare.pays = controls.pays.value;
    this.beneficiare.quartier = controls.quartier.value;
    this.beneficiare.ville = controls.ville.value;

    this.beneficiareService.addBeneficiaire(this.beneficiare);


    Swal.fire({
      position: 'top-end',
      title: 'Bénéficiaire Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  viewBeneficiaire(key) {
    console.log(key)

    for( const beneficiare of this.allBeneficiaire) {
      if (beneficiare.key == key) {
        this.beneficiare = beneficiare
      }
    }

    console.log(this.beneficiare);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updateBeneficiare() {
    let controls = this.beneficiaireForm.controls;

    this.beneficiare.nom = controls.nom.value;
    this.beneficiare.prenom = controls.prenom.value;
    this.beneficiare.age = controls.age.value;
    this.beneficiare.tel = controls.tel.value;
    this.beneficiare.nbr_enfant = controls.nbr_enfant.value;
    this.beneficiare.ethnie = controls.ethnie.value;
    this.beneficiare.code_chaine = controls.code.value;
    this.beneficiare.pays = controls.pays.value;
    this.beneficiare.quartier = controls.quartier.value;
    this.beneficiare.ville = controls.ville.value;

    console.log(this.beneficiare)

    this.beneficiareService.updateBeneficiaire(this.beneficiare.key, this.beneficiare);

    Swal.fire({
      position: 'top-end',
      title: 'Bénéficiaire Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
  }

  deleteBeneficiare(projectKey) {
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

        this.beneficiareService.deleteBeneficiaire(projectKey);

        Swal.fire(
          'Supprimé !',
          'Le Beneficiaire a été bien supprimé !',
          'success'
        )
      }
    })
  }

}
