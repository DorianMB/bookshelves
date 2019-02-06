import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyA3spGYy-ogATRDO_PxhQoDjk9NUxjZsfA",
      authDomain: "bookshelves-8e245.firebaseapp.com",
      databaseURL: "https://bookshelves-8e245.firebaseio.com/",
      projectId: "bookshelves-8e245",
      storageBucket: "gs://bookshelves-8e245.appspot.com/",
      messagingSenderId: "450854080422"
    };
    firebase.initializeApp(config);
  }
}
