console.log('First line of the firebase-chat.js');

async function getUsername() {
  console.log('Inside the getUsername function');
  const response = await fetch('/api/users/current');
  if (response.ok) {
    const data = await response.json();
    console.log(data.username); //troubleshooting
    return data.username;
  } else {
    console.error("Failed to get the current user's username");
    return null;
  }
}


function initializeChat(db, playlistId) {
  console.log('Inside the initializeChat function');

  console.log(playlistId);

  getUsername().then((fetchedUsername) => {
    let username;
    if (fetchedUsername) {
      username = fetchedUsername;

      function sendMessage(e) {
        e.preventDefault();

        const timestamp = Date.now();
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value;

        messageInput.value = "";

        document
          .getElementById("messages")
          .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        db.ref('messages/' + playlistId + '/' + timestamp).set({
          username,
          message,
        });
      }

      // Assign the sendMessage function to the global scope, so it can be accessed in the HTML
      window.sendMessage = sendMessage;

      const fetchChat = db.ref('messages/' + playlistId);

      fetchChat.on("child_added", function (snapshot) {
        const messages = snapshot.val();
        const message = `<li class=${username === messages.username ? "sent" : "receive"
          }><span>${messages.username}: </span>${messages.message}</li>`;
        document.getElementById("messages").innerHTML += message;
      });

      console.log("Firebase chat loaded");
    } else {
      // Handle the case when the username is not fetched properly
      console.error('Failed to fetch the username');
    }
  });
}

