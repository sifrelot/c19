// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

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


//["1/12/21", "12/30/20", "1/22/21", "1/7/21", "1/20/21", "12/25/20", "1/6/21", "1/15/21", "1/5/21", "1/14/21", "1/9/21", "12/24/20", "12/31/20", "1/13/21", "1/16/21", "1/19/21","12/28/20", "12/26/20", "1/2/21", "1/17/21", "1/3/21", "12/27/20", "1/11/21", "1/8/21", "1/10/21", "1/21/21", "12/29/20", "1/1/21", "1/18/21","1/4/21"]



/*
if ((ascending && sortData!=="name") || (!ascending && sortData==="name")) {
      return function(a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      }
    }
*/

/*let test = {
  "cases": {
    "1/12/21": 91605067,
    "12/30/20": 82768267,
    "1/22/21": 98177108,
    "1/7/21": 88105210,
    "1/20/21": 96862056,
    "12/25/20": 79905724,
    "1/6/21": 87248858,
    "1/15/21": 93876206,
    "1/5/21": 86469506,
    "1/14/21": 93110488,
    "1/9/21": 89692138,
    "12/24/20": 79436753,
    "12/31/20": 83488443,
    "1/13/21": 92355264,
    "1/16/21": 94495403,
    "1/19/21": 96167933,
    "12/28/20": 81349247,
    "12/26/20": 80416535,
    "1/2/21": 84649404,
    "1/17/21": 95045634,
    "1/3/21": 85183607,
    "12/27/20": 80856030,
    "1/11/21": 90900967,
    "1/8/21": 88927349,
    "1/10/21": 90283088,
    "1/21/21": 97518881,
    "12/29/20": 82008964,
    "1/1/21": 84025713,
    "1/18/21": 95559647,
    "1/4/21": 85734208
  },
  "recovered": {
    "12/30/20": 46731568,
    "1/11/21": 50285515,
    "1/21/21": 53733212,
    "1/12/21": 50629426,
    "1/7/21": 49098418,
    "1/16/21": 52005821,
    "1/18/21": 52634885,
    "1/20/21": 53367302,
    "1/2/21": 47595212,
  },
}*/
