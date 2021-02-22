import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FileUpload } from '../models/fileUpload';
import * as firebase from 'firebase';
import 'firebase/storage';
import { Rapport } from '../models/rapport';
=======
import { AngularFirestore } from '@angular/fire/firestore';
>>>>>>> 28ab407c312ca8e6895286174e9049fe8b5eafdb

@Injectable({
  providedIn: 'root'
})
export class RapportService {

<<<<<<< HEAD
  private basePath = '/rapport';
  rapportCollection: AngularFirestoreCollection<Rapport> = null;

    constructor(
      private firedb: AngularFirestore,
      private db: AngularFireDatabase) {
        this.rapportCollection = firedb.collection('/rapport');
       }
  
    addRapport(rapport: Rapport){
      this.rapportCollection.add({...rapport});
    }
  
    getRapport(): AngularFirestoreCollection<Rapport>{
      return this.rapportCollection;
    }
  
    updateRapport(key: string, value: any): Promise<void> {
      return this.rapportCollection.doc(key).update(value);
    }
  
    deleteRapport(key: string): Promise<void> {
      return this.rapportCollection.doc(key).delete();
    }

  // pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
  //   const storageRef = firebase.storage().ref();
  //   const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) => {
  //       // in progress
  //       const snap = snapshot as firebase.storage.UploadTaskSnapshot;
  //       progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
  //     },
  //     (error) => {
  //       // fail
  //       console.log(error);
  //     },
  //     () => {
  //       // success
  //       uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
  //         console.log('File available at', downloadURL);
  //         fileUpload.url = downloadURL;
  //         fileUpload.name = fileUpload.file.name;
  //         this.saveFileData(fileUpload);
  //       });
  //     }
  //   );
  // }

  // private saveFileData(fileUpload: FileUpload) {
  //   this.db.list(`${this.basePath}/`).push(fileUpload);
  // }

  // getFileUploads(numberItems): AngularFireList {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  // deleteFileUpload(fileUpload: FileUpload) {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  // private deleteFileDatabase(key: string) {
  //   return this.db.list(`${this.basePath}/`).remove(key);
  // }

  // private deleteFileStorage(name: string) {
  //   // const storageRef = firebase.storage().ref();
  //   const storageRef = firebase.storage().ref();
  //   storageRef.child(`${this.basePath}/${name}`).delete();
  // }
=======
  constructor(private firedb: AngularFirestore) { }

  addRapport(rapport){
    return this.firedb.collection('rapport').add(rapport);
  }

  getRapport(){
    return this.firedb.collection('rapport').snapshotChanges();
  }
>>>>>>> 28ab407c312ca8e6895286174e9049fe8b5eafdb

}
