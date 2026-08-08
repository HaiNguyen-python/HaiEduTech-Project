---
name: Cambridge Fun Zone
description: Fun Zone tab in Cambridge lectures - chants, riddles, word scramble, tongue twister, off-screen games, sticker reward
type: feature
---
Every Cambridge lecture (`/cambridge-lectures/:id`) has a 7th tab "🎪 Fun Zone" ("Vui học").

- Generator: `src/lib/cambridgeFunZone.ts` - deterministic per lecture id (same games every visit). Builds chant (4 rhyming lines using the lecture's own vocabulary), 3 riddles (meaning -> guess the word), 4 word-scramble items, a tongue twister, 2 off-screen games and a fun fact.
- Games are level-aware: Starters/Movers/Flyers get movement games (Jump and Say, I Spy, Act It Out, Word Dice); KET/PET get teen tasks (60-Second Challenge, Two Truths One Lie, Paraphrase Ping-Pong, Photo Talk).
- UI: `src/components/cambridge/FunZone.tsx`. Every English line has a listen button (`playEnglishTts`, en-GB, rate 0.9). Riddles and scramble are interactive; finishing all of them unlocks a sticker reward card.
- Chant topic labels strip leading imperative verbs (Master/Learn/...) so titles read naturally; target words are quoted inside chant lines.
