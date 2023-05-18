//NOTE THIS CODE WAS DEVELOPED ON TOP OF STARTER CODE THAT CAN BE FOUND HERE:
// https://www.cometchat.com/tutorials/how-to-build-a-chat-app-with-firebase

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkCM8DntB3i82diAT6C4VCIiMzbOobIAs",
    authDomain: "groovehub-bf56e.firebaseapp.com",
    databaseURL: "https://groovehub-bf56e-default-rtdb.firebaseio.com",
    projectId: "groovehub-bf56e",
    storageBucket: "groovehub-bf56e.appspot.com",
    messagingSenderId: "291728374045",
    appId: "1:291728374045:web:6da5d60b335fa242b3c9f4",
    measurementId: "G-EGJP9W63KS",
  };
  
  firebase.default.initializeApp(firebaseConfig);
  const db = firebase.database();
  console.log("Firebase initialized");