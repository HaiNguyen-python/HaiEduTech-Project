/**
 * @file index.ts
 * @description Aggregates the deep-dive boost layer for all six Lifestyle
 *              Academy pillars. Paragraphs here are appended to a lesson's
 *              existing deep dive so every lesson reads concrete: a real
 *              situation with numbers, then how to apply it this week.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { LifestyleDeepDiveBoost } from "./types";
import { FINANCE_BOOST } from "./finance";
import { ETIQUETTE_BOOST } from "./etiquette";
import { PRESENCE_BOOST } from "./presence";
import { WELLNESS_BOOST } from "./wellness";
import { SELFSTUDY_BOOST } from "./selfstudy";
import { PARTYING_BOOST } from "./partying";

export type { LifestyleDeepDiveBoost };

/** Keyed by lesson id. */
export const LIFESTYLE_DEEP_DIVE_BOOST: Record<string, LifestyleDeepDiveBoost> = {
  ...FINANCE_BOOST,
  ...ETIQUETTE_BOOST,
  ...PRESENCE_BOOST,
  ...WELLNESS_BOOST,
  ...SELFSTUDY_BOOST,
  ...PARTYING_BOOST,
};
