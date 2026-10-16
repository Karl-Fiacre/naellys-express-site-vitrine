// Pages locales du site (référencement, 16/10/2026) : une page par commune desservie, et une page
// « Zones desservies » pour le District et le Grand Abidjan. Chaque commune a ses quartiers et son
// propre texte : Google pénalise les pages identiques où seul le nom change. Tarifs : ceux de
// COMMUNES (même source que coverage_zones) — à tenir à jour ensemble.
// Seules les communes réellement desservies ont une page : aucune page pour une ville où
// NAËLLYS EXPRESS ne livre pas (ce serait trompeur, et sanctionné par les moteurs de recherche).
import { COMMUNES } from './site';

export type Zone = {
  slug: string;
  nom: string;
  tarif: number;
  /** « à Cocody », « au Plateau ». */
  a: string;
  quartiers: string[];
  texte: string;
};

const DETAILS: Record<string, Omit<Zone, 'nom' | 'tarif'>> = {
  Abobo: {
    slug: 'abobo',
    a: 'à Abobo',
    quartiers: ['Abobo Gare', 'PK 18', 'Avocatier', 'Abobo-Baoulé', 'Akéikoi', 'N’Dotré'],
    texte: 'Commune la plus peuplée d’Abidjan, Abobo vit au rythme de ses marchés et de ses commerces. Nos coursiers y collectent et livrent vos colis, des boutiques d’Abobo Gare aux quartiers résidentiels du nord.',
  },
  Adjamé: {
    slug: 'adjame',
    a: 'à Adjamé',
    quartiers: ['Liberté', 'Williamsville', '220 Logements', 'Bracodi', 'Adjamé Mairie'],
    texte: 'Au cœur du commerce abidjanais, Adjamé et ses grands marchés sont un point de départ quotidien pour les colis des commerçants. Nous récupérons vos envois sur place et les livrons dans tout le District.',
  },
  Attécoubé: {
    slug: 'attecoube',
    a: 'à Attécoubé',
    quartiers: ['Santé', 'Locodjro', 'Agban', 'Abobo-Doumé', 'Mossikro'],
    texte: 'Entre la lagune et la forêt du Banco, Attécoubé est desservie par nos coursiers à moto, qui se faufilent jusqu’à votre porte pour collecter ou remettre vos colis.',
  },
  Bingerville: {
    slug: 'bingerville',
    a: 'à Bingerville',
    quartiers: ['Centre-ville', 'Akandjé', 'Route de Bingerville'],
    texte: 'Ancienne capitale de la Côte d’Ivoire, Bingerville est reliée chaque jour au reste d’Abidjan par nos coursiers : envoyez un colis vers Cocody, le Plateau ou toute autre commune desservie.',
  },
  Cocody: {
    slug: 'cocody',
    a: 'à Cocody',
    quartiers: ['Riviera', 'Angré', 'Deux-Plateaux', 'Danga', 'Blockhauss', 'Palmeraie', 'Saint-Jean'],
    texte: 'Des bureaux des Deux-Plateaux aux résidences de la Riviera et d’Angré, Cocody est l’une de nos communes les plus actives : documents, achats en ligne, repas, cadeaux, livrés à moto en toute sécurité.',
  },
  Koumassi: {
    slug: 'koumassi',
    a: 'à Koumassi',
    quartiers: ['Remblais', 'Sopim', 'Grand Campement', 'Zone industrielle'],
    texte: 'Commerces, ateliers et zone industrielle : à Koumassi, nos coursiers prennent en charge vos colis professionnels comme vos envois personnels, avec un code de remise pour chaque livraison.',
  },
  Marcory: {
    slug: 'marcory',
    a: 'à Marcory',
    quartiers: ['Zone 4', 'Biétry', 'Anoumabo', 'Marcory résidentiel'],
    texte: 'Boutiques et restaurants de la Zone 4, résidences de Biétry : à Marcory, nous livrons particuliers et entreprises, avec le suivi du coursier en direct jusqu’à la remise.',
  },
  Plateau: {
    slug: 'plateau',
    a: 'au Plateau',
    quartiers: ['Quartier des affaires', 'Cité administrative', 'Indénié'],
    texte: 'Quartier des affaires d’Abidjan, le Plateau concentre banques, administrations et sièges d’entreprises. Nos formules entreprise y facilitent l’envoi de courriers et de documents chaque jour.',
  },
  'Port-Bouët': {
    slug: 'port-bouet',
    a: 'à Port-Bouët',
    quartiers: ['Vridi', 'Gonzagueville', 'Abords de l’aéroport'],
    texte: 'De Vridi à Gonzagueville, nos coursiers desservent Port-Bouët et relient la commune au reste d’Abidjan, pour vos colis comme pour vos documents urgents.',
  },
  Treichville: {
    slug: 'treichville',
    a: 'à Treichville',
    quartiers: ['Arras', 'Biafra', 'Zone portuaire'],
    texte: 'Commune historique et animée, Treichville est au carrefour du port et du centre d’Abidjan. Collecte et livraison à moto, le jour même selon l’heure de votre commande.',
  },
  Yopougon: {
    slug: 'yopougon',
    a: 'à Yopougon',
    quartiers: ['Sable', 'Niangon', 'Selmer', 'Siporex', 'Toits Rouges', 'Maroc'],
    texte: 'Yopougon est notre commune d’origine : le siège de NAËLLYS EXPRESS est à Yopougon Sable. C’est aussi la commune où la livraison est la moins chère, au tarif de zone.',
  },
};

export const ZONES: Zone[] = COMMUNES.map((c) => ({ nom: c.nom, tarif: c.tarif, ...DETAILS[c.nom] }));

/** Communes et villes proches où NAËLLYS EXPRESS ne livre pas encore. */
export const ZONES_NON_DESSERVIES = ['Anyama', 'Songon', 'Grand-Bassam', 'Bonoua', 'Dabou', 'Jacqueville', 'Alépé'];

export function tarifTexte(tarif: number): string {
  return `${tarif.toLocaleString('fr-FR').replace(/ | /g, ' ')} FCFA`;
}
