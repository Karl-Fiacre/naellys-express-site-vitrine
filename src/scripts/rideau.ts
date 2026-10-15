// Rideau de transition entre les pages : il couvre l'écran pendant le chargement de la page
// suivante (au moins le temps de son animation), puis se retire. Rien si l'appareil demande
// moins d'animations.
const calme = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const attendre = (ms: number) => new Promise((r) => setTimeout(r, ms));

document.addEventListener('astro:before-preparation', (e) => {
  const rideau = document.querySelector<HTMLElement>('[data-rideau]');
  if (!rideau || calme()) return;
  rideau.classList.remove('decouvre');
  rideau.classList.add('couvre');
  const chargement = e.loader;
  e.loader = async () => { await Promise.all([chargement(), attendre(420)]); };
});

document.addEventListener('astro:after-swap', () => {
  const rideau = document.querySelector<HTMLElement>('[data-rideau]');
  if (!rideau || !rideau.classList.contains('couvre')) return;
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  rideau.classList.remove('couvre');
  rideau.classList.add('decouvre');
  setTimeout(() => rideau.classList.remove('decouvre'), 650);
});
