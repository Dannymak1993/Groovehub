function clearGallery(galleryName, playlistId) {
  const galleryContainer = document.querySelector('.gallery-container');
  galleryContainer.innerHTML = '';

  const galleryNameElement = document.createElement('p');
  galleryNameElement.textContent = galleryName;
  galleryNameElement.classList.add('centered-title');
  galleryContainer.appendChild(galleryNameElement);

  // wrapper div for playlist and chat
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('grid-x', 'grid-margin-x', 'playlist-chat-wrapper');
  galleryContainer.appendChild(wrapperDiv);

  const playlistContainer = document.createElement('div');
  playlistContainer.classList.add('cell', 'small-12', 'medium-6', 'large-6', 'playlist-container');
  wrapperDiv.appendChild(playlistContainer);

  const playlistIframe = document.createElement('iframe');
  playlistIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
  playlistIframe.width = '100%';
  playlistIframe.height = '352';
  playlistIframe.frameBorder = '0';
  playlistIframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  playlistIframe.loading = 'lazy';
  playlistContainer.appendChild(playlistIframe);

  // chat container
  const chatContainer = document.createElement('div');
  chatContainer.classList.add('cell', 'small-12', 'medium-6', 'large-6', 'chat-container');
  wrapperDiv.appendChild(chatContainer);

  // chat window elements
  const chatWindow = document.createElement('div');
  chatWindow.classList.add('chat');
  chatWindow.innerHTML += `<ul id="messages"></ul>
  <form id="message-form" onsubmit="sendMessage(event)">
    <input id="message-input" type="text" placeholder="Type a message" />
    <button id="message-btn" type="submit">Send</button>
  </form>`
  chatContainer.appendChild(chatWindow);
  // Call the initializeChat function to pass the playlistId
  console.log('Before initializeChat')
  initializeChat(playlistId);
}
