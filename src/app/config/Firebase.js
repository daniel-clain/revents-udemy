import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import googleApiKy from '../../google-api-key'

const firebaseConfig = {
  apiKey: googleApiKy,
  authDomain: "revents-276804.firebaseapp.com",
  databaseURL: "https://revents-276804.firebaseio.com",
  projectId: "revents-276804",
  storageBucket: "revents-276804.appspot.com",
  messagingSenderId: "536175891458",
  appId: "1:536175891458:web:5a45b5f80ee76de6a5031b"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase;