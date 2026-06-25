# Résumé — Pourquoi les nouvelles ads Meta ne reçoivent pas de budget en CBO testing

> Source : vidéo YouTube (Strand Media). Cadre de réflexion sur le creative testing Meta Ads.

## Le problème posé

Tu lances de nouvelles ads / nouveaux ad sets dans une campagne de test CBO, et Meta ne leur donne presque aucun budget. Faut-il forcer la dépense ?

## Setup de référence (Strand Media)

- **2 campagnes** : une de scaling, une de **CBO testing**.
- La campagne de testing reçoit **20-40 % du budget du compte**.
- Chaque nouveau lot d'ads ("batch") = un **nouvel ad set**, contenant **4-6 ads** en général (jusqu'à 12-15 pour les gros comptes).

## Comment Meta distribue réellement le budget

- Le budget se concentre sur les batches récents qui performent ; un nouveau batch ne reçoit qu'une petite part (ex. 15 %).
- À l'intérieur d'un batch, **une ou deux ads raflent l'essentiel** (ex. 70 %), les autres reçoivent des miettes (3-7 %) → très peu de données, quelques centaines d'impressions max.

## Fair vs unfair testing (le coeur de la vidéo)

- **Scénario "fair"** (forcer une répartition égale entre toutes les ads) : parfois une ad sous-estimée révèle son potentiel et améliore le ROAS. **Mais** c'est rare, et donner une chance égale à tout le monde **gaspille beaucoup de budget court terme** car la plupart des ads floppent.
- **Scénario "unfair"** (laisser l'algo décider au niveau ad) : risque de rater quelques pépites, mais **économise tout le gaspillage** des ads ratées. Sur le long terme, gagnant pour la majorité des business.
- Raison : le **predictive modeling de Meta est excellent**, surtout sur un compte avec de l'historique. Il manipule plus de data qu'un humain et bat tes décisions émotionnelles sur la durée.
- Constat d'expérience : **impossible de prédire l'ad gagnante**. Les data contredisent souvent l'intuition.

## La règle pratique : où forcer le budget (et où ne pas)

Distinction clé :
- **Au niveau ad** : ne PAS forcer. Fais confiance à l'algo pour répartir entre les ads d'un batch.
- **Au niveau ad set / batch** : SI un batch entier ne reçoit aucun budget, ça bloque ton testing → là tu forces, mais au niveau ad set.

Comment : dans la campagne CBO, mettre un **ad set spending limit → average daily minimum**.

Combien :
- **Conservateur** : 1x ton CPA cible par jour, pendant **7 jours** (couvrir tous les jours de la semaine).
  - Ex. CPA cible 50 $ → au moins 50 $/jour sur le batch pendant 7 jours.
- **Plus concluant** : 3-5x l'AOV par jour, pendant **7-14 jours**.
  - Ex. AOV 100 $ → 300-500 $/jour pendant 7-14 jours.

Après cette période : décider de couper le batch, ou de remonter les ads gagnantes (qui atteignent le ROAS/CPA cible avec assez de volume) vers la campagne de scaling. Même à 7-14 jours, la décision n'est pas tranchée mais tu obtiens une **direction** (formats, hooks, statics qui marchent) pour construire le batch suivant.

## Le bon équilibre

Faire confiance à l'algo **au niveau ad**, mais **pousser du budget dans les tests chaque semaine** au niveau ad set pour continuer à générer de la data fraîche, tester de nouveaux angles, et augmenter la probabilité de trouver l'angle qui scale.

---

## Implications pour le projet You Alive / Death Mail Sender

- **Forcer le budget au niveau ad set, jamais au niveau ad.** Si on teste 2 variantes (2 value props = 2 ad sets), il faut leur imposer un minimum quotidien sinon Meta peut en affamer une et fausser le comparatif.
- **Notre budget doit être calé sur le CPA cible.** Cohérent avec la discussion : viser ~1x le "coût par email" cible/jour/variante, sur 7-14 jours, pour avoir une lecture par jour de semaine.
- **Ne pas surinterpréter une variante qui démarre faible** : l'algo a peu de data au début. D'où l'intérêt du minimum quotidien forcé par ad set pour donner une chance équitable aux 2 positionnements testés.
- **Attention** : leur predictive modeling s'appuie sur l'historique du compte. Un compte neuf (ou optimisé jusqu'ici sur *page views*, pas sur conversion) a un modèle moins fiable au départ → encore une raison de forcer le minimum par ad set au Round 2.
