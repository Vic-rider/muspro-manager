import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  projectCollection: AngularFirestoreCollection<Project> = null;

  constructor(
    private firedb: AngularFirestore) {
      this.projectCollection = firedb.collection('/projet');
     }

  addProject(projet: Project){
    this.projectCollection.add({...projet});
  }

  getProject(): AngularFirestoreCollection<Project>{
    return this.projectCollection;
  }

  updateProjet(key: string, value: any): Promise<void> {
    return this.projectCollection.doc(key).update(value);
  }

  deleteProjet(key: string): Promise<void> {
    return this.projectCollection.doc(key).delete();
  }

}
