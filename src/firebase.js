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
const SUMMARY = db.collection("summary")
const HISTORICAL = db.collection("historical")

function getPreviousDay() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()-2000}`
}

export function setSummaryValues(data) {
  let country
  for (country in data) {
    await SUMMARY.doc(country).set(data[country])
  }
}

export function getSummaryValues() {
  const summary = await SUMMARY.get()
  let data = {}
  summary.forEach((doc)=> {
    if(doc.id !== "Date")
      data[doc.id] = doc.data()
  })
  return data
}


export function setHistoricalValue(country, data) {
  await HISTORICAL.doc(country).set(data)
}


export function getHistoricalValue(country) {
  const historical =  await HISTORICAL.doc(country).get()
  if (!historical.exists)
    return undefined
  else if (historical["cases"][getPreviousDay()]===undefined)
    return undefined
  else
    return historical
}
