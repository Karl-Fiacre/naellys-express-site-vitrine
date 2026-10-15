// Animations du site, réinitialisées à chaque page (transitions d'Astro, événement
// « astro:page-load »). Toutes s'effacent si l'appareil demande moins d'animations.

const calme = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let nettoyage: Array<() => void> = [];

function apparitions() {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (calme() || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }
  const observateur = new IntersectionObserver(
    (entrees) => entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observateur.unobserve(e.target);
      }
    }),
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  );
  elements.forEach((el) => observateur.observe(el));
  nettoyage.push(() => observateur.disconnect());
}

// Compteurs (data-compteur="11", data-suffixe=" min")
function compteurs() {
  document.querySelectorAll<HTMLElement>('[data-compteur]').forEach((el) => {
    const cible = Number(el.dataset.compteur);
    const suffixe = el.dataset.suffixe ?? '';
    if (calme()) { el.textContent = `${cible}${suffixe}`; return; }
    const observateur = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observateur.disconnect();
      const debut = performance.now();
      const duree = 1600;
      const etape = (t: number) => {
        const p = Math.min((t - debut) / duree, 1);
        const v = Math.round(cible * (1 - Math.pow(1 - p, 4)));
        el.textContent = `${v.toLocaleString('fr-FR')}${suffixe}`;
        if (p < 1) requestAnimationFrame(etape);
      };
      requestAnimationFrame(etape);
    }, { threshold: 0.6 });
    observateur.observe(el);
    nettoyage.push(() => observateur.disconnect());
  });
}

// Boutons « aimantés » : suivent légèrement la souris.
function aimants() {
  if (calme() || window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-aimant]').forEach((el) => {
    const bouger = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const quitter = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', bouger);
    el.addEventListener('pointerleave', quitter);
    nettoyage.push(() => { el.removeEventListener('pointermove', bouger); el.removeEventListener('pointerleave', quitter); });
  });
}

// Cartes inclinées en 3D au survol.
function inclinaisons() {
  if (calme() || window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-incliner]').forEach((el) => {
    const bouger = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-6px)`;
      el.style.setProperty('--lx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--ly', `${(y + 0.5) * 100}%`);
    };
    const quitter = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', bouger);
    el.addEventListener('pointerleave', quitter);
    nettoyage.push(() => { el.removeEventListener('pointermove', bouger); el.removeEventListener('pointerleave', quitter); });
  });
}

// Parallaxe douce des éléments data-parallaxe="0.2".
function parallaxe() {
  if (calme()) return;
  const elements = [...document.querySelectorAll<HTMLElement>('[data-parallaxe]')];
  if (!elements.length) return;
  let enCours = false;
  const maj = () => {
    enCours = false;
    const y = window.scrollY;
    elements.forEach((el) => { el.style.translate = `0 ${y * Number(el.dataset.parallaxe)}px`; });
  };
  const surDefilement = () => { if (!enCours) { enCours = true; requestAnimationFrame(maj); } };
  window.addEventListener('scroll', surDefilement, { passive: true });
  nettoyage.push(() => window.removeEventListener('scroll', surDefilement));
}

// Barre de progression de lecture en haut de page.
function progression() {
  const barre = document.querySelector<HTMLElement>('[data-progression]');
  if (!barre) return;
  const maj = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    barre.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
  };
  maj();
  window.addEventListener('scroll', maj, { passive: true });
  nettoyage.push(() => window.removeEventListener('scroll', maj));
}

document.addEventListener('astro:before-swap', () => { nettoyage.forEach((f) => f()); nettoyage = []; });
document.addEventListener('astro:page-load', () => {
  apparitions();
  compteurs();
  aimants();
  inclinaisons();
  parallaxe();
  progression();
});
