// const firebaseConfig = require('./firebase-config.js');
// const firebasechat = require('./firebase-chat.js');
// function clearGallery(galleryName, playlistId) {
//     const galleryContainer = document.querySelector('.gallery-container');
//     galleryContainer.innerHTML = '';

//     const galleryNameElement = document.createElement('h2');
//     galleryNameElement.textContent = galleryName;
//     galleryNameElement.classList.add('centered-title');
//     galleryContainer.appendChild(galleryNameElement);

//     const playlistContainer = document.createElement('div');
//     playlistContainer.classList.add('playlist-container');
//     galleryContainer.appendChild(playlistContainer);

//     const playlistIframe = document.createElement('iframe');
//     playlistIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
//     playlistIframe.width = '100%';
//     playlistIframe.height = '352';
//     playlistIframe.frameBorder = '0';
//     playlistIframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
//     playlistIframe.loading = 'lazy';
//     playlistContainer.appendChild(playlistIframe);
// }

function clearGallery(galleryName, playlistId) {
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.innerHTML = '';

    const galleryNameElement = document.createElement('p');
    galleryNameElement.textContent = galleryName;
    galleryNameElement.classList.add('centered-title');
    galleryContainer.appendChild(galleryNameElement);

    // Create a wrapper div for playlist and chat
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('playlist-chat-wrapper');
    galleryContainer.appendChild(wrapperDiv);

    const playlistContainer = document.createElement('div');
    playlistContainer.classList.add('playlist-container');
    wrapperDiv.appendChild(playlistContainer);

    const playlistIframe = document.createElement('iframe');
    playlistIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
    playlistIframe.width = '100%';
    playlistIframe.height = '352';
    playlistIframe.frameBorder = '0';
    playlistIframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    playlistIframe.loading = 'lazy';
    playlistContainer.appendChild(playlistIframe);

    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');
    wrapperDiv.appendChild(chatContainer);

    // Add your chat window elements inside chatContainer
    // For example:
    const chatWindow = document.createElement('div');
    chatWindow.classList.add('chat');
    chatWindow.innerHTML += `<ul id="messages"></ul>
    <form id="message-form" onsubmit="sendMessage(event)">
      <input id="message-input" type="text" placeholder="Type a message" />
      <button id="message-btn" type="submit">Send</button>
    </form>`
    chatContainer.appendChild(chatWindow);
    // Call the initializeChat function and pass the playlistId
    console.log('Before initializeChat')
    initializeChat(playlistId);
}
