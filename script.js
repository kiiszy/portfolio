const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const dialog = document.querySelector('#lightbox');
let lastPhoto;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  lastPhoto = button;
  dialog.querySelector('img').src = button.dataset.image;
  dialog.querySelector('img').alt = button.querySelector('img').alt;
  dialog.querySelector('p').textContent = button.dataset.caption;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();} });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastPhoto?.focus(); });
