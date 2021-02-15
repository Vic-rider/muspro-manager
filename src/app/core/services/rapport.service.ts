import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private firedb: AngularFirestore) { }

  addRapport(rapport){
    return this.firedb.collection('rapport').add(rapport);
  }

  getRapport(){
    return this.firedb.collection('rapport').snapshotChanges();
  }

}
