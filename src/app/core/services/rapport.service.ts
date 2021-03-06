import { Rapport } from './../models/rapport';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FileUpload } from '../models/fileUpload';
import * as firebase from 'firebase';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

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

}
