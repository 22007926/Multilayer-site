document.addEventListener('DOMContentLoaded', () => {
  const spotifySearchInput = document.getElementById('spotifySearchInput');
  const spotifySearchBtn = document.getElementById('spotifySearchBtn');
  const spotifyResultsDiv = document.getElementById('spotifyResults');

  if (spotifySearchBtn) { // Ensure elements exist on the page
      spotifySearchBtn.addEventListener('click', performSpotifySearch);
      spotifySearchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              performSpotifySearch();
          }
      });
  }

  async function performSpotifySearch() {
      const query = spotifySearchInput.value.trim();
      if (!query) {
          spotifyResultsDiv.innerHTML = '<p>Please enter a song or artist to search.</p>';
          return;
      }

      spotifyResultsDiv.innerHTML = '<p>Searching...</p>';

      try {
          // Using a PHP proxy to bypass CORS issues and hide API credentials
          const response = await fetch(`php/spotify_proxy.php?query=${encodeURIComponent(query)}`);
          const data = await response.json();

          if (data.error) {
              spotifyResultsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
              return;
          }

          displaySpotifyResults(data.tracks.items);

      } catch (error) {
          console.error('Error fetching Spotify data:', error);
          spotifyResultsDiv.innerHTML = '<p>Failed to fetch music. Please try again later.</p>';
      }
  }

  function displaySpotifyResults(tracks) {
      spotifyResultsDiv.innerHTML = ''; // Clear previous results
      if (tracks.length === 0) {
          spotifyResultsDiv.innerHTML = '<p>No music found for your search.</p>';
          return;
      }

      tracks.forEach(track => {
          const trackDiv = document.createElement('div');
          trackDiv.classList.add('result-item');

          const albumArt = track.album.images.length > 0 ? track.album.images[0].url : 'https://via.placeholder.com/80x80?text=No+Image';
          const artists = track.artists.map(artist => artist.name).join(', ');
          const externalUrl = track.external_urls.spotify;

          trackDiv.innerHTML = `
              <img src="${albumArt}" alt="${track.name} Album Art">
              <div class="result-item-info">
                  <h3>${track.name}</h3>
                  <p>Artist(s): ${artists}</p>
                  <p>Album: ${track.album.name}</p>
                  <a href="${externalUrl}" target="_blank">Listen on Spotify</a>
              </div>
          `;
          spotifyResultsDiv.appendChild(trackDiv);
      });
  }
});