document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if(btn && menu){
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
});