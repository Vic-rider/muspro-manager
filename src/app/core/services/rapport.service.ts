import { Rapport } from './../models/rapport';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  rapporttCollection: AngularFirestoreCollection<Rapport> = null;
  private basePath = '/uploads';

  constructor(
    private firedb: AngularFirestore,
    private db: AngularFireDatabase) {
      this.rapporttCollection = firedb.collection('/rapport');
     }

  addRapport(rapport: Rapport){
    this.rapporttCollection.add({...rapport});
  }

  getRapport(): AngularFirestoreCollection<Rapport>{
    return this.rapporttCollection;
  }

  updateRapport(key: string, value: any): Promise<void> {
    return this.rapporttCollection.doc(key).update(value);
  }

  deleteRapport(key: string): Promise<void> {
    return this.rapporttCollection.doc(key).delete();
  }

}
