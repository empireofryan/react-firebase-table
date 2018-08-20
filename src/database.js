import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyAJofc86fqqKO5YHTsvvv8gM40QcS569nc",
  authDomain: "dh-phone-survey.firebaseapp.com",
  databaseURL: "https://dh-phone-survey.firebaseio.com",
  projectId: "dh-phone-survey",
  storageBucket: "dh-phone-survey.appspot.com",
  messagingSenderId: "903149647354"
};
firebase.initializeApp(config);
const database = firebase.database();
export default database;