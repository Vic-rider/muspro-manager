import { Financement } from './../models/financement';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FinancementService {

  financementCollection: AngularFirestoreCollection<Financement> = null;

  constructor(
    private firedb: AngularFirestore) {
      this.financementCollection = firedb.collection('/financement');
     }

  addFinancement(financement: Financement){
    this.financementCollection.add({...financement});
  }

  getFinancement(): AngularFirestoreCollection<Financement>{
    return this.financementCollection;
  }

  updateFinancement(key: string, value: any): Promise<void> {
    return this.financementCollection.doc(key).update(value);
  }

  deleteFinancement(key: string): Promise<void> {
    return this.financementCollection.doc(key).delete();
  }

}
