// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
var firebaseui = require('firebaseui');


const firebaseConfig = {
  apiKey: "AIzaSyCMuu7v-wxGSzG581ScNYgZRDljddXs5Zk",
  authDomain: "covid19-cloud-54c2d.firebaseapp.com",
  databaseURL: "https://covid19-cloud-54c2d.firebaseio.com",
  projectId: "covid19-cloud",
  storageBucket: "covid19-cloud.appspot.com",
  messagingSenderId: "381414892012",
  appId: "1:381414892012:web:1d9390d02baa706901a0c9",
  measurementId: "G-3K88Z3QEG1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
export const SUMMARY = db.collection("summary")
export const HISTORICAL = db.collection("historical")
export const ARTICLES = db.collection("articles")
export const STORAGE = firebase.storage()

/*var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    //requireDisplayName: false
  },
],
});*/

export const AUTH = firebase.auth()
AUTH.setPersistence(firebase.auth.Auth.Persistence.SESSION)
export const googleAuth = new firebase.auth.GoogleAuthProvider()
googleAuth.setCustomParameters({ prompt: 'select_account' });
