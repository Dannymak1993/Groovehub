const username = prompt('Please Tell Us Your Name'); //user prompt
const db = firebase.database();

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDkCM8DntB3i82diAT6C4VCIiMzbOobIAs",
//   authDomain: "groovehub-bf56e.firebaseapp.com",
//   databaseURL: "https://groovehub-bf56e-default-rtdb.firebaseio.com",
//   projectId: "groovehub-bf56e",
//   storageBucket: "groovehub-bf56e.appspot.com",
//   messagingSenderId: "291728374045",
//   appId: "1:291728374045:web:6da5d60b335fa242b3c9f4",
//   measurementId: "G-EGJP9W63KS"
// };
// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// changed sendMessage function to global scope to handle the on submit 
window.sendMessage = function (e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

//receiving text messages
const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});

// The index.js file is a JavaScript file that is used to create a chat application that allows users to send and receive messages in real-time.
// The file imports the necessary functions from the Firebase SDKs and initializes a Firebase app with the configuration details. It then prompts the user to enter their name and stores it in a variable called username.
// The sendMessage function is called when the user submits a message. It gets the message input value, generates a timestamp, and sends the message to the Firebase Realtime Database.
// The fetchChat function listens for new messages added to the database and appends them to the chat window.
// Overall, the index.js file is responsible for creating a real-time chat application using Firebase Realtime Database.