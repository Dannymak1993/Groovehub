//NOTE THIS CODE WAS DEVELOPED ON TOP OF STARTER CODE THAT CAN BE FOUND HERE:
// https://www.cometchat.com/tutorials/how-to-build-a-chat-app-with-firebase

//This function is to create a properly formatted timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


//This function gets the current user's usename from the '/current' user route
async function getUsername() {
  const response = await fetch('/api/users/current');
  if (response.ok) {
    const data = await response.json();
    
    return data.username;
  } else {
    console.error("Failed to get the current user's username");
    return null;
  }
}

//This function receives the db object and playlist variable and sets up a unique chat instance for a particular instance 
function initializeChat(db, playlistId) {
  //we call our get username function and use .then to resolve the promise
  getUsername().then((fetchedUsername) => {
    let username;
    if (fetchedUsername) {
      username = fetchedUsername;

      function sendMessage(e) {
        //prevent default behavior
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
          timestamp, //store the timestamp into the firebase db
        });
      }

      // This function assigns the sendMessage function to the global scope, so it can be accessed in the HTML
      window.sendMessage = sendMessage;

      const fetchChat = db.ref('messages/' + playlistId);

      fetchChat.on("child_added", function (snapshot) {
        const messages = snapshot.val();
        const message = `<li class=${username === messages.username ? "sent" : "receive"}><span>${messages.username} (${formatTimestamp(messages.timestamp)}): </span>${messages.message}</li>`; 
        document.getElementById("messages").innerHTML += message;
      });

      
    } else {
      // Handle the case when the username is not fetched properly 
      console.error('Failed to fetch the username');
    }
  });
}
