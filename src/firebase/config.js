import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyBgEbMSWMKo1kzi0V2I_0_TOY-2kJUxltI",
    authDomain: "mymoney-5b803.firebaseapp.com",
    projectId: "mymoney-5b803",
    storageBucket: "mymoney-5b803.appspot.com",
    messagingSenderId: "64284669437",
    appId: "1:64284669437:web:9791ae643b42e1643b1594"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// init service 
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };