import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA-P9Uvf706FdIhBT-F2XYVYd-e5ev2D0",
  authDomain: "finance-tracker-ef32c.firebaseapp.com",
  projectId: "finance-tracker-ef32c",
  storageBucket: "finance-tracker-ef32c.appspot.com",
  messagingSenderId: "879149175703",
  appId: "1:879149175703:web:c578b762d4fcbd3e0a2ad2",
};

// initialize firebase

firebase.initializeApp(firebaseConfig);

// initialize services;
const projectFirestore = firebase.firestore();

export { projectFirestore };
