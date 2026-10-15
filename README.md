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
