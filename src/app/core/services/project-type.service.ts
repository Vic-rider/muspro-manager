import { ProjectType } from './../models/project-type';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  projectTypeCollection: AngularFirestoreCollection<ProjectType> = null;

  constructor(
    private firedb: AngularFirestore) {
      this.projectTypeCollection = firedb.collection('/type_projet');
     }

  addProjectType(projetType: ProjectType){
    this.projectTypeCollection.add({...projetType});
  }

  getProjectType(): AngularFirestoreCollection<ProjectType>{
    return this.projectTypeCollection;
  }

  updateProjectType(key: string, value: any): Promise<void> {
    return this.projectTypeCollection.doc(key).update(value);
  }

  deleteProjectType(key: string): Promise<void> {
    return this.projectTypeCollection.doc(key).delete();
  }

}
