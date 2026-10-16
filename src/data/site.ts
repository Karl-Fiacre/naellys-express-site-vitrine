// Contenu de référence du site vitrine NAËLLYS EXPRESS : mentions de la société, offres,
// communes desservies, FAQ. Mêmes valeurs que l'application et le back-office
// (dépôt naellys-express : offres, coverage_zones, parametres_societe) — à tenir à jour ensemble.

export const SOCIETE = {
  nom: 'NAËLLYS EXPRESS',
  forme: 'SARL',
  capital: '5 000 000 FCFA',
  rccm: 'CI-ABJ-03-2026-B12-05723',
  contribuable: '2605640U',
  siege: 'Yopougon Sable, Abidjan, Côte d’Ivoire',
  telephone: '07 15 97 83 99',
  telephoneE164: '+2250715978399',
  whatsapp: '2250715978399',
  email: 'contact@naellys-express.com',
  dirigeant: 'Brou Dominique Nyamien',
  qualite: 'Directeur Général',
  slogan: 'Vos colis, notre priorité !',
  backOffice: 'https://naellys-back-office.fiacrenguessan.workers.dev',
};

/** Fonction serveur qui enregistre les demandes du site dans le back-office (sans clé côté site). */
export const URL_DEMANDES = 'https://hyaxvynyisgmamfdadur.supabase.co/functions/v1/recevoirDemandeSite';

export const NAVIGATION = [
  { href: '/', libelle: 'Accueil' },
  { href: '/particuliers/', libelle: 'Particuliers' },
  { href: '/entreprises/', libelle: 'Entreprises' },
  { href: '/partenaires/', libelle: 'Partenaires' },
  { href: '/tarifs/', libelle: 'Tarifs' },
  { href: '/devenir-livreur/', libelle: 'Devenir livreur' },
  { href: '/faq/', libelle: 'FAQ' },
];

export const COMMUNES = [
  { nom: 'Yopougon', tarif: 1500 },
  { nom: 'Attécoubé', tarif: 2000 },
  { nom: 'Adjamé', tarif: 2000 },
  { nom: 'Plateau', tarif: 2000 },
  { nom: 'Treichville', tarif: 2000 },
  { nom: 'Koumassi', tarif: 2000 },
  { nom: 'Marcory', tarif: 2000 },
  { nom: 'Cocody', tarif: 2000 },
  { nom: 'Abobo', tarif: 2000 },
  { nom: 'Port-Bouët', tarif: 2500 },
  { nom: 'Bingerville', tarif: 2500 },
];

export const OFFRES_PARTICULIERS = [
  {
    nom: 'B2C',
    prix: '2 000',
    unite: 'FCFA la course',
    resume: 'Le même prix dans toutes les communes desservies.',
    atouts: ['Sans engagement', 'Suivi en direct', 'Code de remise sécurisé'],
    vedette: true,
  },
  {
    nom: 'Découverte',
    prix: '2 500',
    unite: 'FCFA la course',
    resume: 'Pour découvrir le service, sans abonnement.',
    atouts: ['Sans engagement', 'Toutes communes desservies', 'Ticket PDF de chaque commande'],
    vedette: false,
  },
];

export const OFFRES_ENTREPRISES = [
  {
    nom: 'Standard',
    prix: '15',
    unite: 'courses incluses par mois',
    depassement: '1 500 FCFA la course au-delà',
    atouts: [
      'Facture normalisée électronique (FNE) à partir de 10 livraisons dans le mois',
      'Coursiers salariés en priorité',
      'Tableau de bord des courses du mois',
      'Contrat signé dans l’application',
    ],
    vedette: false,
  },
  {
    nom: 'Premium',
    prix: '35',
    unite: 'courses incluses par mois',
    depassement: '1 200 FCFA la course au-delà',
    atouts: [
      'Facture normalisée électronique (FNE) dès la première livraison',
      'Coursiers salariés en priorité',
      'Tableau de bord des courses du mois',
      'Contrat signé dans l’application',
    ],
    vedette: true,
  },
];

export const ETAPES = [
  { titre: 'Vous commandez', texte: 'Collecte, livraison, créneau : le prix s’affiche avant de confirmer.' },
  { titre: 'Un coursier vérifié', texte: 'Photo, nom, téléphone et plaque de la moto : vous savez qui vient.' },
  { titre: 'Suivi en direct', texte: 'Chaque étape s’affiche, avec une notification à chaque changement.' },
  { titre: 'Remise sécurisée', texte: 'Code du destinataire et photo de preuve à chaque livraison.' },
];

export const FAQ = [
  {
    theme: 'Commander',
    questions: [
      { q: 'Quelles communes sont desservies ?', r: 'Yopougon, Attécoubé, Adjamé, Plateau, Treichville, Koumassi, Marcory, Cocody, Abobo, Port-Bouët et Bingerville. La liste à jour est proposée au moment de la commande dans l’application.' },
      { q: 'Peut-on être livré le jour même ?', r: 'Oui. Avant 11 h, les trois créneaux (matin, après-midi, soir) sont proposés ; de 11 h à 16 h, l’après-midi et le soir ; de 16 h à 19 h, le soir. Après 19 h, la livraison se fait à partir du lendemain.' },
      { q: 'Le colis peut-il être récupéré chez quelqu’un d’autre ?', r: 'Oui : indiquez l’expéditeur (nom et téléphone) au moment de la commande. Vous pouvez aussi faire livrer une autre personne.' },
      { q: 'Quels colis sont interdits ?', r: 'Armes, produits dangereux et tout objet illicite. L’application signale un colis de la liste des colis interdits, et le coursier peut refuser un colis non conforme.' },
    ],
  },
  {
    theme: 'Livraison et sécurité',
    questions: [
      { q: 'Comment savoir qui livre mon colis ?', r: 'Dès qu’un coursier est assigné, l’application affiche sa photo, son nom complet, son téléphone et l’immatriculation de sa moto, tous vérifiés par notre équipe.' },
      { q: 'Comment le colis est-il remis ?', r: 'Le destinataire reçoit un code de vérification à 4 chiffres par SMS. Le colis n’est remis que sur présentation de ce code, et le coursier prend une photo de preuve.' },
      { q: 'Puis-je suivre le coursier ?', r: 'Oui : pendant toute la course, sa position s’affiche en direct sur une carte, avec le temps de trajet estimé selon le trafic.' },
      { q: 'Et si la livraison n’a pas pu se faire ?', r: 'Elle est reportée au lendemain, en priorité. Le coursier en explique la raison et notre équipe vous rappelle pour convenir de la livraison.' },
      { q: 'Et en cas de problème ?', r: 'Vous pouvez faire une réclamation dans les 48 heures qui suivent la livraison, depuis l’application. Notre équipe vous répond directement dans votre commande.' },
    ],
  },
  {
    theme: 'Paiement et offres',
    questions: [
      { q: 'Combien coûte une livraison ?', r: 'Avec l’offre B2C, 2 000 FCFA la course dans toutes les communes desservies. Sans offre, le tarif dépend de la commune de livraison (de 1 500 à 2 500 FCFA).' },
      { q: 'Comment payer ?', r: 'Une livraison à la course se règle au coursier au moment de la remise, au prix affiché dans l’application. Les abonnements entreprise et les partenaires sont facturés selon leur contrat.' },
      { q: 'Peut-on commander le soir ou le dimanche ?', r: 'Oui. De 17 h 30 à 9 h 30, dimanche compris, votre commande est attribuée automatiquement à un coursier disponible.' },
      { q: 'Les entreprises reçoivent-elles une facture ?', r: 'Oui : une facture normalisée électronique (FNE) dès la première livraison du mois avec la formule Premium, et à partir de 10 livraisons dans le mois avec la formule Standard.' },
    ],
  },
  {
    theme: 'Partenaires et livreurs',
    questions: [
      { q: 'Comment devenir partenaire ?', r: 'Remplissez le formulaire de la page Partenaires : notre équipe vous contacte pour convenir d’un tarif par livraison, sans plafond mensuel, et de vos conditions.' },
      { q: 'Comment devenir livreur NAËLLYS EXPRESS ?', r: 'Envoyez votre candidature depuis la page Devenir livreur. Il faut être majeur, avoir un permis de conduire valide et, pour un indépendant, sa propre moto avec ses papiers en règle.' },
      { q: 'Comment sont payés les livreurs indépendants ?', r: 'Ils encaissent eux-mêmes le prix des livraisons payées à la remise et reversent le jour même, avant minuit, la commission de NAËLLYS EXPRESS. Les livraisons facturées leur sont réglées sur leur compte Wave. Tout est calculé dans l’application.' },
      { q: 'Quand les partenaires reçoivent-ils leur part ?', r: 'Le jour même pour une commande passée avant 12 h et livrée ce jour-là ; sinon le lendemain de la livraison, sur leur compte Wave.' },
    ],
  },
];
