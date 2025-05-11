
document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  function updateNavExtra(){
    const extra = menu && !menu.classList.contains('hidden') ? menu.offsetHeight : 0;
    document.documentElement.style.setProperty('--nav-extra', extra + 'px');
  }
  if(btn && menu){
    updateNavExtra();
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      updateNavExtra();
    });
    window.addEventListener('resize', updateNavExtra);
  }
});
