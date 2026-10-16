// Conditions présentées avant l'envoi de chaque formulaire, et CGU publiées sur le site
// (décision du porteur du 16/10/2026 : le visiteur les lit et les accepte avant d'envoyer sa
// demande). Les CGU reprennent la version 2 de l'application (dépôt naellys-express, migration
// 20261016210000_documents_legaux_v2) : à modifier aux deux endroits. La version ci-dessous est
// enregistrée avec chaque demande.
import { SOCIETE } from './site';

export const CONDITIONS_VERSION = '2026-10-16';

export type TypeFormulaire = 'contact' | 'partenariat' | 'entreprise' | 'livreur';

export const CONDITIONS: Record<TypeFormulaire, { titre: string; points: string[] }> = {
  contact: {
    titre: 'Avant d’envoyer votre message',
    points: [
      'Vos coordonnées servent uniquement à vous répondre ; elles ne sont jamais vendues ni utilisées pour de la publicité.',
      'Notre équipe vous rappelle au numéro indiqué, ou vous écrit si vous avez donné un email.',
      'Les commandes se passent dans l’application NAËLLYS EXPRESS, selon ses conditions générales d’utilisation.',
    ],
  },
  partenariat: {
    titre: 'Conditions du partenariat',
    points: [
      'Chaque livraison vous est facturée au tarif négocié avec NAËLLYS EXPRESS, quelle que soit la commune desservie, sans plafond mensuel.',
      'Si une part vous est accordée, elle est calculée sur le prix de chaque livraison effectivement faite (les commandes annulées n’y donnent pas droit).',
      'Cette part vous est versée sur votre compte Wave le jour même pour toute commande passée avant 12 h et livrée ce jour-là ; sinon le lendemain de la livraison.',
      'Le partenariat est formalisé par un contrat à approuver dans l’application, d’une durée d’un an renouvelable.',
      'Vous ne confiez aucun colis interdit et décrivez chaque colis avec sincérité.',
    ],
  },
  entreprise: {
    titre: 'Conditions des offres Entreprise',
    points: [
      'Standard : 15 courses incluses par mois, puis 1 500 FCFA la course. Premium : 35 courses incluses, puis 1 200 FCFA la course.',
      'Facture normalisée électronique (FNE) : dès la première livraison du mois en Premium, à partir de 10 livraisons dans le mois en Standard.',
      'Vos courses sont confiées en priorité à nos coursiers salariés ; un indépendant n’intervient que si aucun salarié n’est libre.',
      'L’abonnement est formalisé par un contrat à approuver dans l’application après validation de votre demande.',
      'Vous ne confiez aucun colis interdit et décrivez chaque colis avec sincérité.',
    ],
  },
  livreur: {
    titre: 'Conditions pour rouler avec nous',
    points: [
      'Être majeur, avoir un smartphone et un permis de conduire valide ; votre identité et vos documents sont vérifiés avant la première course.',
      'Indépendant : votre propre moto, avec sa carte de vignette et son assurance, et un compte Wave.',
      'Indépendant : vous encaissez le prix des livraisons payées à la remise et reversez la commission NAËLLYS EXPRESS (300 ou 500 FCFA selon le prix de la course) le jour même, avant minuit. Un retard vous écarte des courses attribuées la nuit jusqu’au règlement.',
      'De 17 h 30 à 9 h 30, les courses sont attribuées automatiquement aux coursiers disponibles : salariés d’abord, puis indépendants bien notés et à jour de leurs reversements.',
      'Une livraison non faite doit être expliquée dans l’application ; elle est reportée au lendemain en priorité.',
      'Pendant vos courses, votre position est visible en direct par le client concerné et par l’équipe.',
      'Indépendant : un contrat de prestation à approuver dans l’application.',
    ],
  },
};

/** CGU de l'application, version 2 (16/10/2026), complétées des mentions de la société. */
export const CGU: { titre: string; paragraphes?: string[]; points?: string[] }[] = [
  {
    titre: '',
    paragraphes: [
      `Les présentes conditions générales d’utilisation (« CGU ») régissent l’utilisation de l’application NAËLLYS EXPRESS et du service de livraison à moto proposé par ${SOCIETE.nom} ${SOCIETE.forme} (« NAËLLYS EXPRESS ») dans le District d’Abidjan. En créant un compte ou en utilisant l’application, vous acceptez les présentes CGU.`,
    ],
  },
  {
    titre: '1. Le service',
    paragraphes: [
      'NAËLLYS EXPRESS met en relation ses clients avec ses coursiers pour la collecte et la livraison de colis à moto dans les communes desservies affichées dans l’application. L’application permet de commander une livraison, d’en suivre l’avancement, de la noter, de faire une réclamation et, pour les coursiers, de réaliser les courses qui leur sont assignées par l’équipe.',
    ],
  },
  {
    titre: '2. Compte',
    points: [
      'Le compte est personnel. Vous fournissez des informations exactes et les tenez à jour.',
      'La connexion se fait par code à usage unique envoyé par SMS ou par email ; un compte créé par l’équipe (partenaire, administrateur) reçoit un mot de passe provisoire à changer à la première connexion.',
      'Vous gardez vos accès confidentiels et répondez des actions faites depuis votre compte.',
      'Le service est réservé aux personnes majeures.',
      'Vous pouvez supprimer votre compte à tout moment depuis l’application (Profil > Supprimer mon compte), sauf pendant une commande ou une course en cours.',
    ],
  },
  {
    titre: '3. Commandes',
    points: [
      'Vous indiquez le lieu de collecte, le lieu de livraison, la commune, la date, le créneau et une description sincère du colis, ainsi que le nom et le téléphone de l’expéditeur et du destinataire lorsqu’il s’agit d’autres personnes, que vous informez de ce traitement.',
      'Pour une livraison le jour même, seuls les créneaux encore possibles à l’heure de la commande sont proposés.',
      'Le prix est affiché avant la validation de la commande, selon votre offre (tarif à la course, tarif de la zone, abonnement entreprise ou tarif partenaire) et un éventuel code promotionnel.',
      'Le paiement en ligne n’est pas proposé dans l’application. Une livraison à la course (offre à la course, tarif de la zone) se règle au coursier au moment de la remise, au prix affiché dans l’application ; les abonnements entreprise et les partenaires sont facturés selon leur contrat.',
      'Une commande passée en dehors des heures d’ouverture (de 17 h 30 à 9 h 30, dimanche compris) est attribuée automatiquement à un coursier disponible ; à défaut, l’équipe l’attribue à l’ouverture.',
    ],
  },
  {
    titre: '4. Colis interdits',
    paragraphes: [
      'Il est interdit de confier tout colis figurant sur la liste des colis interdits affichée dans l’application, ainsi que tout objet illicite ou dangereux. Le coursier peut refuser un colis à la collecte ; l’équipe décide alors de la suite de la commande.',
    ],
  },
  {
    titre: '5. Remise du colis',
    points: [
      'Le colis n’est remis qu’au destinataire qui communique au coursier le code de vérification envoyé par SMS ou affiché dans l’application.',
      'Au moment de la remise, le coursier prend une photo de preuve de la livraison. Elle est conservée sept (7) jours, visible de l’équipe seulement, puis supprimée automatiquement.',
      'Après trois codes erronés, la validation est bloquée : seule l’équipe peut alors confirmer la livraison.',
      'Une livraison qui n’a pas pu être faite le jour prévu est reportée au lendemain, en priorité ; le coursier en explique la raison et l’équipe vous rappelle pour convenir de la livraison.',
    ],
  },
  {
    titre: '6. Le coursier assigné',
    paragraphes: [
      'Pendant une commande en cours, le client voit la photo, le nom complet, le numéro de téléphone et l’immatriculation de la moto du coursier assigné, vérifiés par l’équipe. Pendant la course, le client suit aussi en direct la position du coursier sur une carte, avec le temps de trajet estimé ; elle n’est plus visible une fois la commande livrée ou annulée. Ces informations ne servent qu’au suivi de la livraison.',
    ],
  },
  {
    titre: '7. Notes, réclamations et signalements',
    points: [
      'Après la livraison, le client peut noter la course et le coursier peut faire une remarque sur le client ; ces avis servent à améliorer le service.',
      'Le client peut faire une réclamation dans les quarante-huit (48) heures qui suivent la livraison. L’équipe lui répond dans l’application.',
      'Le client peut signaler le coursier, et le coursier le client, en cas de comportement inapproprié. L’équipe traite chaque signalement et informe son auteur de sa décision ; la personne signalée n’est pas informée de l’identité de l’auteur.',
      'Tout abus (fausse réclamation, signalement malveillant) peut entraîner la suspension du compte.',
    ],
  },
  {
    titre: '8. Comportement',
    paragraphes: [
      'Chacun se comporte avec courtoisie et respect. Toute menace, insulte, fraude, tentative de contournement du code de vérification ou utilisation de l’application à des fins illicites peut entraîner la suspension ou la fermeture du compte.',
    ],
  },
  {
    titre: '9. Coursiers, partenaires et entreprises',
    paragraphes: [
      'Les coursiers indépendants, les partenaires et les entreprises abonnées (formules Standard et Premium) sont en outre liés par leur contrat, approuvé dans l’application. En cas de contradiction, le contrat prévaut sur les présentes CGU.',
    ],
  },
  {
    titre: '10. Responsabilité',
    paragraphes: [
      'NAËLLYS EXPRESS met en œuvre les moyens nécessaires pour collecter et livrer les colis dans le créneau choisi. Sa responsabilité est limitée à la valeur justifiée du colis perdu ou endommagé entre la collecte et la remise, sauf force majeure, emballage insuffisant, fausse déclaration ou colis interdit. L’application peut être momentanément indisponible pour maintenance ou en cas de panne du réseau.',
    ],
  },
  {
    titre: '11. Notifications',
    paragraphes: [
      'NAËLLYS EXPRESS vous envoie des notifications et des SMS liés à vos commandes et à votre compte. Les offres promotionnelles ne vous sont envoyées que si vous les avez acceptées, et vous pouvez retirer cet accord à tout moment depuis votre profil.',
    ],
  },
  {
    titre: '12. Données personnelles',
    paragraphes: [
      'Le traitement de vos données est décrit dans la politique de confidentialité, consultable dans l’application (Profil > Informations légales) et en ligne.',
    ],
  },
  {
    titre: '13. Propriété intellectuelle',
    paragraphes: [
      'La marque, le logo, l’application et leurs contenus appartiennent à NAËLLYS EXPRESS. Toute reproduction sans autorisation est interdite.',
    ],
  },
  {
    titre: '14. Modification des CGU',
    paragraphes: [
      'NAËLLYS EXPRESS peut modifier les présentes CGU. La nouvelle version est publiée dans l’application avec sa date ; en continuant à utiliser le service, vous l’acceptez.',
    ],
  },
  {
    titre: '15. Droit applicable et litiges',
    paragraphes: [
      'Les présentes CGU sont soumises au droit ivoirien. Les parties recherchent une solution amiable à tout différend ; à défaut, le litige est porté devant les juridictions compétentes d’Abidjan.',
    ],
  },
  {
    titre: '16. Contact',
    paragraphes: [`${SOCIETE.nom} ${SOCIETE.forme}, ${SOCIETE.siege}. Téléphone : ${SOCIETE.telephone}. Email : ${SOCIETE.email}.`],
  },
];
