import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Partenaire } from '../models/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  partenaireCollection: AngularFirestoreCollection<Partenaire> = null;

  constructor(
    private firedb: AngularFirestore) {
      this.partenaireCollection = firedb.collection('/partenaire');
     }

  addPartenaire(partenaire: Partenaire){
    this.partenaireCollection.add({...partenaire});
  }

  getPartenaire(): AngularFirestoreCollection<Partenaire>{
    return this.partenaireCollection;
  }

  updatePartenaire(key: string, value: any): Promise<void> {
    return this.partenaireCollection.doc(key).update(value);
  }

  deletePartenaire(key: string): Promise<void> {
    return this.partenaireCollection.doc(key).delete();
  }

}
