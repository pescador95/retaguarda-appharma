import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyBKMk3DUz1mzzIcfvoG9L0g3OdfSFqCuxA",
    authDomain: "astrofarma-7dbf8.firebaseapp.com",
    databaseURL: "https://astrofarma-7dbf8-default-rtdb.firebaseio.com",
    projectId: "astrofarma-7dbf8",
    storageBucket: "astrofarma-7dbf8.appspot.com",
    messagingSenderId: "94963710054",
    appId: "1:94963710054:web:31fd43054a80feef98d5a7",
    measurementId: "G-24LK45NB5T"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database().ref()
  
  export default db