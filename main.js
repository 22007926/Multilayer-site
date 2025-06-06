document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      // Save preference to localStorage
      if (body.classList.contains('dark-mode')) {
          localStorage.setItem('darkMode', 'enabled');
      } else {
          localStorage.setItem('darkMode', 'disabled');
      }
  });

  // Add general interactive features here if needed, e.g., smooth scrolling, mobile nav toggles.
  // For this example, dark mode is the primary general JS feature.
});