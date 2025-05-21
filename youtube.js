// YouTube Section JavaScript - Frontend
document.addEventListener('DOMContentLoaded', () => {
  const youtubeSearchInput = document.getElementById('youtubeSearchInput');
  const youtubeSearchBtn = document.getElementById('youtubeSearchBtn');
  const youtubeResultsDiv = document.getElementById('youtubeResults');

  if (youtubeSearchBtn) { // Ensure elements exist on the page
      youtubeSearchBtn.addEventListener('click', performYoutubeSearch);
      youtubeSearchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              performYoutubeSearch();
          }
      });
  }

  async function performYoutubeSearch() {
      const query = youtubeSearchInput.value.trim();
      if (!query) {
          youtubeResultsDiv.innerHTML = '<p>Please enter a video title or topic to search.</p>';
          return;
      }

      youtubeResultsDiv.innerHTML = '<p>Searching...</p>';

      try {
          // Using a PHP proxy to bypass CORS issues and hide API credentials
          const response = await fetch(`php/youtube_proxy.php?query=${encodeURIComponent(query)}`);
          const data = await response.json();

          if (data.error) {
              youtubeResultsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
              return;
          }

          displayYoutubeResults(data.items);

      } catch (error) {
          console.error('Error fetching YouTube data:', error);
          youtubeResultsDiv.innerHTML = '<p>Failed to fetch videos. Please try again later.</p>';
      }
  }

  function displayYoutubeResults(videos) {
      youtubeResultsDiv.innerHTML = ''; // Clear previous results
      if (videos.length === 0) {
          youtubeResultsDiv.innerHTML = '<p>No videos found for your search.</p>';
          return;
      }

      videos.forEach(video => {
          // Only display actual videos, not channels or playlists
          if (video.id.kind === 'youtube#video') {
              const videoDiv = document.createElement('div');
              videoDiv.classList.add('result-item');

              const videoTitle = video.snippet.title;
              const thumbnailUrl = video.snippet.thumbnails.default.url;
              const channelTitle = video.snippet.channelTitle;
              const videoId = video.id.videoId;
              const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

              videoDiv.innerHTML = `
                  <img src="${thumbnailUrl}" alt="${videoTitle} Thumbnail">
                  <div class="result-item-info">
                      <h3>${videoTitle}</h3>
                      <p>Channel: ${channelTitle}</p>
                      <a href="${videoUrl}" target="_blank">Watch on YouTube</a>
                  </div>
              `;
              youtubeResultsDiv.appendChild(videoDiv);
          }
      });
  }
});