import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rapport } from 'src/app/core/models/rapport';
import { RapportService } from '../../../core/services/rapport.service';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
})

export class RapportComponent implements OnInit {

  rapportForm: FormGroup;
  rapport = new Rapport();
  allRapport: Array<Rapport> = [];
  _loader = false;
  filePath:any;

  constructor(
    private rapportService: RapportService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.createForm();
    this._loader = true;

    this.rapportService.getRapport().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(rapport => {
      this.allRapport = rapport;
      this._loader = false;
      console.log(rapport)
    });

  }

  initForm() {
    this.rapport = new Rapport();
    this.createForm();
  }

  createForm() {
    this.rapportForm = this.fb.group({
      code: [this.rapport.code, Validators.required],
      date_rapport: [this.rapport.date_rapport, Validators.required],
      desc: [this.rapport.desc, Validators.required],
		});
  }

  submit() {
    let controls = this.rapportForm.controls;

    this.rapport.code = controls.code.value;
    this.rapport.date_rapport = controls.date_rapport.value;
    this.rapport.desc = controls.desc.value;

    this.rapportService.addRapport(this.rapport);


    Swal.fire({
      position: 'top-end',
      title: 'Rapport Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  viewrapport(rapportKey) {
    console.log(rapportKey)

    for( const rapport of this.allRapport) {
      if (rapport.key == rapportKey) {
        this.rapport = rapport
      }
    }

    console.log(this.rapport);
    this.createForm();
    document.getElementById('open_update_modal').click();
  }

  updaterapport() {
    let controls = this.rapportForm.controls;

    this.rapport.code = controls.code.value;
    this.rapport.date_rapport = controls.date_rapport.value;
    this.rapport.desc = controls.desc.value;

    console.log(this.rapport)

    this.rapportService.updateRapport(this.rapport.key, this.rapport);

    Swal.fire({
      position: 'top-end',
      title: 'rapport Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_update_modal').click();
  }

  deleterapport(key) {
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

        this.rapportService.deleteRapport(key);

        Swal.fire(
          'Supprimé !',
          'Le Rapport a été bien supprimé !',
          'success'
        )
      }
    })
  }

  upload(event) {    
    this.filePath = event.target.files[0]
  }
  uploadImage(){
    console.log(this.filePath)
    this.afStorage.upload('/rapport-'+Math.random(), this.filePath).then(
      (res) => {
        console.log(res)
      },
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

}
