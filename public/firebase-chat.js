console.log('First line of the firebase-chat.js')
async function getUsername() {
  console.log('Inside the getUsername function')
  const response = await fetch('/api/users/current');
  if (response.ok) {
    const data = await response.json();
    console.log(data.username) //troubleshooting
    return data.username;
    
  } else {
    console.error('Failed to get the current user\'s username');
    return null;
  }
}
//get the username
let username;
getUsername().then((fetchedUsername) => {
    if (fetchedUsername) {
        username = fetchedUsername;
    } else {
        // Handle the case when the username is not fetched properly
        console.error('Failed to fetch the username');
    }
});

// const username = prompt('Please Tell Us Your Name'); //user prompt


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
  const message = `<li class=${username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});

console.log("Firebase chat loaded");

