// Formulaires en étapes du site vitrine : vérification de chaque étape, envoi à la fonction
// serveur recevoirDemandeSite (avec l'acceptation des conditions et des CGU), animation de réussite. En cas d'échec réseau, le visiteur peut
// toujours écrire sur WhatsApp.

const MOBILE_CI = /^(?:\+?225)?\s*0[157](?:[\s.-]?\d){8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function valeur(form: HTMLFormElement, nom: string): string {
  const champ = form.elements.namedItem(nom);
  if (champ instanceof HTMLInputElement && champ.type === 'checkbox') return champ.checked ? champ.value : '';
  if (champ instanceof RadioNodeList) return String(champ.value ?? '').trim();
  if (champ instanceof HTMLInputElement || champ instanceof HTMLTextAreaElement || champ instanceof HTMLSelectElement) return champ.value.trim();
  return '';
}

function verifierVolet(volet: HTMLElement, form: HTMLFormElement): boolean {
  let ok = true;
  let premier: HTMLElement | null = null;
  volet.querySelectorAll<HTMLElement>('[data-champ]').forEach((bloc) => {
    const nom = bloc.dataset.champ!;
    const v = valeur(form, nom);
    const entree = bloc.querySelector<HTMLInputElement>('input:not([type=radio]), textarea, select');
    const type = entree?.getAttribute('type');
    let erreur = '';
    if (bloc.dataset.requis && !v) erreur = type === 'checkbox' ? 'Acceptez les conditions et les CGU pour envoyer votre demande.' : 'Ce champ est obligatoire.';
    else if (v && type === 'tel' && !MOBILE_CI.test(v)) erreur = 'Un mobile ivoirien à 10 chiffres (01, 05 ou 07).';
    else if (v && type === 'email' && !EMAIL.test(v)) erreur = 'Adresse email invalide.';
    else if (v && nom === 'message' && v.length < 10) erreur = 'Quelques mots de plus (10 caractères au moins).';
    bloc.classList.toggle('invalide', !!erreur);
    const aide = bloc.querySelector<HTMLElement>('[data-aide]');
    if (aide) aide.textContent = erreur;
    if (erreur) { ok = false; premier ??= entree ?? bloc.querySelector('input'); }
  });
  premier?.focus();
  return ok;
}

export function initialiserFormulaires() {
  document.querySelectorAll<HTMLElement>('[data-formulaire]').forEach((racine) => {
    if (racine.dataset.pret) return;
    racine.dataset.pret = '1';
    const form = racine.querySelector('form')!;
    const volets = [...racine.querySelectorAll<HTMLFieldSetElement>('[data-volet]')];
    const puces = [...racine.querySelectorAll<HTMLElement>('[data-puce]')];
    const jauge = racine.querySelector<HTMLElement>('[data-jauge]')!;
    const suivant = racine.querySelector<HTMLButtonElement>('[data-suivant]')!;
    const texte = suivant.querySelector<HTMLElement>('[data-texte]')!;
    const precedent = racine.querySelector<HTMLButtonElement>('[data-precedent]')!;
    const message = racine.querySelector<HTMLElement>('[data-message]')!;
    const ouvertLe = Date.now();
    let courant = 0;

    const afficher = (n: number) => {
      volets.forEach((v, i) => {
        v.classList.toggle('actif', i === n);
        v.classList.toggle('avant', i < n);
        v.disabled = i !== n;
      });
      puces.forEach((p, i) => { p.classList.toggle('active', i === n); p.classList.toggle('faite', i < n); });
      jauge.style.width = `${((n + 1) / volets.length) * 100}%`;
      precedent.hidden = n === 0;
      texte.textContent = n === volets.length - 1 ? suivant.dataset.libelleEnvoi! : 'Continuer';
      courant = n;
      volets[n].querySelector<HTMLElement>('input:not([type=radio]), textarea, select')?.focus({ preventScroll: true });
    };
    afficher(0);
    jauge.style.width = `${(1 / volets.length) * 100}%`;

    precedent.addEventListener('click', () => afficher(courant - 1));
    const effacer = (e: Event) => {
      const bloc = (e.target as HTMLElement).closest<HTMLElement>('[data-champ]');
      if (!bloc?.classList.contains('invalide')) return;
      bloc.classList.remove('invalide');
      const aide = bloc.querySelector<HTMLElement>('[data-aide]');
      if (aide) aide.textContent = '';
    };
    form.addEventListener('input', effacer);
    form.addEventListener('change', effacer);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      message.textContent = '';
      if (!verifierVolet(volets[courant], form)) return;
      if (courant < volets.length - 1) return afficher(courant + 1);

      // Tous les volets sont réactivés le temps de lire les valeurs.
      volets.forEach((v) => { v.disabled = false; });
      const champs: Record<string, string> = {};
      new FormData(form).forEach((v, k) => { if (!k.startsWith('_')) champs[k] = String(v).trim(); });
      const piege = valeur(form, '_site_web');
      afficher(courant);

      suivant.setAttribute('aria-busy', 'true');
      try {
        const reponse = await fetch(racine.dataset.url!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: racine.dataset.formulaire,
            champs,
            page: location.pathname,
            piege,
            duree: Date.now() - ouvertLe,
            conditions: valeur(form, '_conditions') === 'oui',
            conditions_version: racine.dataset.conditionsVersion,
          }),
        });
        const corps = await reponse.json().catch(() => ({}));
        if (!reponse.ok) throw new Error(typeof corps.erreur === 'string' ? corps.erreur : '');
        form.hidden = true;
        racine.querySelector('.tete')?.setAttribute('hidden', '');
        racine.querySelector<HTMLElement>('[data-reussite]')!.hidden = false;
      } catch (erreur) {
        const texteErreur = erreur instanceof Error && erreur.message ? erreur.message : 'L’envoi n’a pas abouti.';
        message.innerHTML = `${texteErreur} Réessayez, ou <a href="https://wa.me/${racine.dataset.whatsapp}" target="_blank" rel="noopener">écrivez-nous sur WhatsApp</a>.`;
      } finally {
        suivant.removeAttribute('aria-busy');
      }
    });
  });
}
