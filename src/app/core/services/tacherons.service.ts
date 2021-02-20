import { Tacherons } from './../models/tacherons';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TacheronsService {

  tacheronsCollection: AngularFirestoreCollection<Tacherons> = null;

  constructor(
    private firedb: AngularFirestore) {
      this.tacheronsCollection = firedb.collection('/tacheron');
     }

  addTacherons(tacheron: Tacherons){
    this.tacheronsCollection.add({...tacheron});
  }

  getTacherons(): AngularFirestoreCollection<Tacherons>{
    return this.tacheronsCollection;
  }

  updateTacherons(key: string, value: any): Promise<void> {
    return this.tacheronsCollection.doc(key).update(value);
  }

  deleteTacherons(key: string): Promise<void> {
    return this.tacheronsCollection.doc(key).delete();
  }

}
