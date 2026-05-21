/* Centralized Theme Toggle and Persistence Controller */
(function () {
  // 1. Immediately apply the saved theme before the page parses/loads to prevent flashing
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // SVG Icon definitions
  const sunIcon = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM5.636 4.222a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414L5.636 5.636a1 1 0 0 1 0-1.414zm11.314 11.314a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414zM2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zM5.636 19.778a1 1 0 0 1 0-1.414l1.414-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.414 0zm11.314-11.314a1 1 0 0 1 0-1.414l1.414-1.414a1 1 0 1 1 1.414 1.414L18.364 8.464a1 1 0 0 1-1.414 0z"/>
    </svg>
  `;

  const moonIcon = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3c.132 0 .263 0 .393.007a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z"/>
    </svg>
  `;

  // 2. Wait for page initialization to inject the floating toggle button
  window.addEventListener('DOMContentLoaded', () => {
    // Avoid double-injecting if script is loaded twice
    if (document.querySelector('.theme-toggle-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'theme-toggle-btn';
    btn.setAttribute('aria-label', 'Toggle light and dark mode');
    btn.style.display = 'flex';

    // Set initial icon based on applied theme
    let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerHTML = currentTheme === 'light' ? sunIcon : moonIcon;

    // Set up click event listener for rotation and theme swap
    btn.addEventListener('click', () => {
      currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Apply rotation animation on transition
      const svg = btn.querySelector('svg');
      if (svg) {
        svg.style.transform = 'rotate(360deg) scale(0)';
      }

      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('site-theme', nextTheme);
        btn.innerHTML = nextTheme === 'light' ? sunIcon : moonIcon;

        const newSvg = btn.querySelector('svg');
        if (newSvg) {
          newSvg.style.transform = 'rotate(0deg) scale(1)';
        }
      }, 250);
    });

    document.body.appendChild(btn);
  });
})();
