import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHoHox5pr3ZnuLUx27nW4VAIZpLMOlm3A",
  authDomain: "wa-clone-25241.firebaseapp.com",
  databaseURL: "https://wa-clone-25241.firebaseio.com",
  projectId: "wa-clone-25241",
  storageBucket: "wa-clone-25241.appspot.com",
  messagingSenderId: "719830153781",
  appId: "1:719830153781:web:0fdfd3141ffc7f495ccf7c",
  measurementId: "G-JP7928SN87"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;