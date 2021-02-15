import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'App';

  // constructor(private firedb: AngularFirestore) {
  //   const things = firedb.collection('beneficiaire').valueChanges();
  //   things.subscribe(console.log);
  // }

}
