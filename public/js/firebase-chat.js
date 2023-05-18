//NOTE THIS CODE WAS DEVELOPED ON TOP OF STARTER CODE THAT CAN BE FOUND HERE:
// https://www.cometchat.com/tutorials/how-to-build-a-chat-app-with-firebase

//This function scrolls the chat window to the bottom
function scrollToBottom() {
  const chat = document.querySelector('.chat ul');
  chat.scrollTop = chat.scrollHeight;
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  // Determine AM or PM suffix based on the hour
  const period = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hour from military time (0 - 23) to standard time (1 - 12)
  hours = hours % 12;
  // If the hours is 0 (i.e., 12 AM in military time), change it to 12
  hours = hours ? hours : 12;
  
  // Pad the hours with 0 if necessary
  const hoursFormatted = String(hours).padStart(2, '0');
  
  return `${hoursFormatted}:${minutes} ${period}`;
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
function initializeChat(db, playlistId, numUsersElement) {
  //we call our get username function and use .then to resolve the promise
  getUsername().then((fetchedUsername) => {
    let username;
    if (fetchedUsername) {
      username = fetchedUsername;

      // When this user enters the chat room, add them to the list of active users
      db.ref('chatrooms/' + playlistId + '/users/' + username).set(true);

      // When this user leaves the chat room (i.e., when the page is closed or refreshed), remove them from the list of active users
      window.addEventListener('beforeunload', function () {
        db.ref('chatrooms/' + playlistId + '/users/' + username).remove();
      });

      // Listen for changes in the list of active users
      db.ref('chatrooms/' + playlistId + '/users').on('value', function (snapshot) {
        const users = snapshot.val();
        const numUsers = users ? Object.keys(users).length : 0;

        // Display the number of users in the chat room
        numUsersElement.textContent = numUsers + ' users in chat';
      });


      function sendMessage(e) {
        //prevent default behavior
        e.preventDefault();

        const timestamp = Date.now();
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value;

        messageInput.value = "";
        scrollToBottom(); //scroll to bottom when the current user sends a message

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
        const message = `<li class=${username === messages.username ? "sent" : "receive"}><span>(${formatTimestamp(messages.timestamp)}): ${messages.username}: ${messages.message}</span></li>`;
        document.getElementById("messages").innerHTML += message;
        scrollToBottom(); //scroll to bottom after adding receiving a new message by other users
      });

      
    } else {
      // Handle the case when the username is not fetched properly 
      console.error('Failed to fetch the username');
    }
  });
}
