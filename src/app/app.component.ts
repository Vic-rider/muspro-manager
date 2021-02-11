import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'App';

  // constructor() {
  //   var firebaseConfig = {
  //     apiKey: "AIzaSyCroHcekDEY70x7ak1TxVFLGfCX7QIz3ik",
  //     authDomain: "dmc-project-manager.firebaseapp.com",
  //     projectId: "dmc-project-manager",
  //     storageBucket: "dmc-project-manager.appspot.com",
  //     messagingSenderId: "495585585652",
  //     appId: "1:495585585652:web:f44878d755a5b30b6b31a1",
  //     measurementId: "G-LPJ1FD43F0"
  //   };
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);
  //   firebase.analytics();
  // }

}
