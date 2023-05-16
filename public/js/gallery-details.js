function clearGallery(galleryName, playlistId) {
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.innerHTML = '';

    const galleryNameElement = document.createElement('h2');
    galleryNameElement.textContent = galleryName;
    galleryNameElement.classList.add('centered-title');
    galleryContainer.appendChild(galleryNameElement);

    const playlistContainer = document.createElement('div');
    playlistContainer.classList.add('playlist-container');
    galleryContainer.appendChild(playlistContainer);

    const playlistIframe = document.createElement('iframe');
    playlistIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
    playlistIframe.width = '100%';
    playlistIframe.height = '352';
    playlistIframe.frameBorder = '0';
    playlistIframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    playlistIframe.loading = 'lazy';
    playlistContainer.appendChild(playlistIframe);
}