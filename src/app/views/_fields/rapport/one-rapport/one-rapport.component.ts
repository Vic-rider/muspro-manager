import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rapport } from 'src/app/core/models/rapport';
import { RapportService } from '../../../../core/services/rapport.service';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-one-rapport',
  templateUrl: './one-rapport.component.html',
  styleUrls: ['./one-rapport.component.css'],
})
export class OneRapportComponent implements OnInit, AfterViewInit {
  addloader = false;
  allProjects: Array<Project> = [];
  allRapport: Array<Rapport> = [];
  rapportForm: FormGroup;
  rapport = new Rapport();
  _loader = false;
  key = '';
  filePath:any;
  downloadableURL = '';

  constructor(
    private rapportService: RapportService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private projetService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private dom:DomSanitizer) { 
     }

  ngOnInit(): void {
    this.getDatas()
    this.createForm();
    
    this.key = this.activatedRoute.snapshot.paramMap.get('id')

    this.rapportService.getRapport().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(rapport => {
      this.allRapport = rapport;
      this._loader = false;
      console.log(this.allRapport)

      for( const rapport of this.allRapport) {
        if (rapport.key == this.key) {
          this.rapport = rapport
          console.log(this.rapport)
          this.createForm();

          for (let doc of this.rapport.files.docs) {
            doc = this.dom.bypassSecurityTrustResourceUrl(doc); 
          }
        }
      }
    });


  }

  ngAfterViewInit() {

  }

  initForm() {
    this.rapport = new Rapport();
    this.createForm();
  }

  getDatas() {
    this._loader = true;

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

  valid(id) {
    this.rapport.valid = id
  }

  sent(id) {
    this.rapport.envoyer = id
  }

  createForm() {
    this.rapportForm = this.fb.group({
      projet: [this.rapport.projet.key, Validators.required],
      desc: [this.rapport.desc, Validators.required],
      files: [null],
      sent: [this.rapport.envoyer],
      valid: [this.rapport.valid]
		});
  }

  updateRapprt() {
    if(this.filePath) {
      this.uploadFiles()
    } else {
      this.submit()
    }
  }

  submit() {
    this.addloader = true;
    console.log(this.rapport)
    let controls = this.rapportForm.controls;

    for( const project of this.allProjects) {
      if (project.key == controls.projet.value) {
        this.rapport.projet = project
      }
    }
    
    this.rapport.desc = controls.desc.value;

    this.rapportService.updateRapport(this.rapport.key, this.rapport);

    this.addloader = false;

    Swal.fire({
      position: 'top-end',
      title: 'Rapport Bien Modifié !',
      showConfirmButton: false,
      timer: 1500
    })

    //close modal and clean form
    document.getElementById('close_modal').click();
  }

  uploadFiles() {
    console.log(this.filePath)
    let index = 0;

    for (const i of this.filePath) {

      // if(i.size > (1024*20)) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: `la taile du fichier ${i.name} dépasse 20MB`,
      //   })
      //   continue
      // }
      
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

  removeFiles(type, index) {
    if (type == 'image') {
      this.rapport.files.images.splice(index, 1)
    } else if (type == 'doc') {
      this.rapport.files.docs.splice(index, 1)
    } else if (type == 'audio') {
      this.rapport.files.audios.splice(index, 1)
    } else if ( type == 'video') {
      this.rapport.files.videos.splice(index, 1)
    }

    this.updateRapprt();
  }

  upload(event) {
    // console.log(event)
    this.filePath = event.target.files
    console.log(this.filePath)
  }

}
