import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rapport } from 'src/app/core/models/rapport';
import { RapportService } from '../../../core/services/rapport.service';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
})

export class RapportComponent implements OnInit {

  rapportForm: FormGroup;
  rapport = new Rapport();
  allRapport: Array<Rapport> = [];
  allProjects: Array<Project> = [];
  _loader = false;
  filePath:any;
  downloadableURL = '';
  task: AngularFireUploadTask;
  addloader = false;

  constructor(
    private rapportService: RapportService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private projetService: ProjectService) { }

  ngOnInit(): void {
    this.createForm();
    this.getDatas()

  }

  initForm() {
    this.rapport = new Rapport();
    this.createForm();
  }

  getDatas() {
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

    this.projetService.getProject().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(projet => {
      this.allProjects = projet;
    });
  }

  createForm() {
    this.rapportForm = this.fb.group({
      projet: [this.rapport.code, Validators.required],
      desc: [this.rapport.desc, Validators.required],
      files: [null]
		});
  }

  adddRapprt() {
    if(this.filePath) {
      this.uploadFiles()
    } else {
      this.submit()
    }
  }

  submit() {
    console.log(this.rapport)
    let controls = this.rapportForm.controls;

    for( const project of this.allProjects) {
      if (project.key == controls.projet.value) {
        this.rapport.projet = project
      }
    }
    
    this.rapport.desc = controls.desc.value;
    this.rapport.envoyer = 0;
    this.rapport.valid = 0;

    this.rapportService.addRapport(this.rapport);
    this.addloader = false;

    Swal.fire({
      position: 'top-end',
      title: 'Rapport Bien Ajouté !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
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
    this.filePath = event.target.files
    // console.log(this.filePath )
  }

  uploadFiles(){
    console.log(this.filePath)
    let index = 0;
    this.addloader = true;

    for (const i of this.filePath) {
      
      this.afStorage.upload('/rapport-'+ new Date().getTime(), i).then(
        (res) => {
          // console.log(res)
          
          res.ref.getDownloadURL().then(url => {
            this.downloadableURL = url; 
            index = index + 1;
          
            if (i.type.split('/')[0] == 'audio') {
              this.rapport.files.audios.push(this.downloadableURL)
            }
            
            else if (i.type.split('/')[0] == 'application') {

              if (i.type.split('/')[1] == 'pdf') {
                this.rapport.files.docs.push({ link: this.downloadableURL, isPdf: true })
              } else {
                this.rapport.files.docs.push({ link: this.downloadableURL, isPdf: false })
              }

            }
            
            else if (i.type.split('/')[0] == 'video') {
              this.rapport.files.videos.push(this.downloadableURL)
            }
            
            else if (i.type.split('/')[0] == 'image') {
              this.rapport.files.images.push(this.downloadableURL)
            }

            console.log(index)

            if(index == this.filePath.length) {
              this.submit();
            }
          
          });


        },
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }
    
  }

}
