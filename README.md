# NAËLLYS EXPRESS — site vitrine

Site public de NAËLLYS EXPRESS SARL (livraison à moto, Abidjan) : `https://naellys-express.com`.

- **Astro 5**, pages statiques, transitions entre pages (`ClientRouter`), polices Sora et Inter embarquées.
- Charte graphique identique à l'application et au back-office (`src/styles/global.css`).
- Contenu (société, communes, tarifs, offres, FAQ) : `src/data/site.ts`. **Les tarifs doivent rester alignés sur la table `coverage_zones` de Supabase.**
- Formulaires (contact, partenariat, entreprise, devenir livreur) : envoyés à l'Edge Function Supabase `recevoirDemandeSite`, rangés dans le back-office (page « Demandes du site »). Aucune clé dans ce dépôt : la fonction est publique et fait elle-même les contrôles.

## Développement

```bash
npm install
npm run dev
npm run build
```

Le formulaire n'est accepté par la fonction que depuis une adresse listée dans `BACK_OFFICE_ORIGIN` (secret Supabase), qui doit contenir `http://localhost:4321` pour les essais en local.

## Hébergement

Cloudflare Workers, fichiers statiques (`wrangler.jsonc`, dossier `dist`) :

- commande de compilation : `npm run build`
- commande de déploiement : `npx wrangler deploy`
- variable de compilation : `NODE_VERSION` = `20`

En-têtes de sécurité : `public/_headers`.

Le Worker `worker/index.js` sert les pages et compte les visites (statistiques du back-office) :
pour chaque page HTML vue, il transmet la page, le navigateur, le pays et la ville à l'Edge
Function `compterVisite`, qui ne garde jamais l'adresse IP. À régler dans Cloudflare :
le secret `VISITES_SECRET` (la même valeur que le secret Supabase du même nom, 32 caractères au
moins). Sans ce secret, le site fonctionne mais rien n'est compté.

## Conditions et CGU

Avant d'envoyer un formulaire, le visiteur lit et accepte les conditions de son profil et les
CGU (`src/data/conditions.ts`, page `/cgu/`). Les CGU reprennent celles de l'application
(version 2 du 16/10/2026) : à modifier aux deux endroits.
