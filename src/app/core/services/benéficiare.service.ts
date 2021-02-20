import { Beneficiaire } from './../models/beneficiaire';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class BenéficiareService {

  beneficiaireCollection: AngularFirestoreCollection<Beneficiaire> = null;

  constructor(
    private firedb: AngularFirestore) {
      this.beneficiaireCollection = firedb.collection('/beneficiaire');
     }

  addBeneficiaire(beneficiaire: Beneficiaire){
    this.beneficiaireCollection.add({...beneficiaire});
  }

  getBeneficiaire(): AngularFirestoreCollection<Beneficiaire>{
    return this.beneficiaireCollection;
  }

  updateBeneficiaire(key: string, value: any): Promise<void> {
    return this.beneficiaireCollection.doc(key).update(value);
  }

  deleteBeneficiaire(key: string): Promise<void> {
    return this.beneficiaireCollection.doc(key).delete();
  }

}
