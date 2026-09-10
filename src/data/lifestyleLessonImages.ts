/**
 * @file lifestyleLessonImages.ts
 * @description Maps Lifestyle Academy lesson IDs to their CDN illustration.
 *              Images live as `.asset.json` pointers in src/assets/lifestyle/
 *              named after the lesson ID (for example `ss-01.jpg.asset.json`),
 *              so adding an image needs no code change here.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

type AssetPointer = { url?: string; default?: { url?: string } };

const modules = import.meta.glob<AssetPointer>(
  "/src/assets/lifestyle/*.asset.json",
  { eager: true },
);

const map: Record<string, string> = {};

for (const [path, mod] of Object.entries(modules)) {
  // "/src/assets/lifestyle/ss-01.jpg.asset.json" -> "ss-01"
  const file = path.split("/").pop() ?? "";
  const id = file.replace(/\.[^.]+\.asset\.json$/, "");
  const url = mod?.url ?? mod?.default?.url;
  if (id && url) map[id] = url;
}

export const LIFESTYLE_LESSON_IMAGES: Record<string, string> = map;

export const getLessonImage = (lessonId: string): string | undefined =>
  LIFESTYLE_LESSON_IMAGES[lessonId];
