/**
 * nav.js
 * Handles the burger toggle and updates CSS var --nav-extra
 * so the main content is pushed down exactly the open-menu height.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  /** updateNavExtra – writes the open menu’s height to --nav-extra */
  function updateNavExtra() {
    const extra = menu && !menu.classList.contains('hidden') ? menu.offsetHeight : 0;
    document.documentElement.style.setProperty('--nav-extra', `${extra}px`);
  }

  if (btn && menu) {
    updateNavExtra();                         // run once on load
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');   // slide-down drawer (our new class)
      menu.classList.toggle('hidden'); // secondary guard: hide when closed
    });
    window.addEventListener('resize', updateNavExtra);
  }
});
