/**
 * @file dialogueAvatars.ts
 * @description Picks a small chibi character picture for each speaker in a
 *   dialogue. The choice is deterministic (hash of lesson id + speaker name),
 *   so the same person keeps the same face across the whole conversation and
 *   on every revisit.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import businessMan from "@/assets/chibi-business-man.png";
import businessWoman from "@/assets/chibi-business-woman.png";
import businessVest from "@/assets/chibi-business-vest.png";
import studyBoy from "@/assets/chibi-study-boy.png";
import studyGirl from "@/assets/chibi-study-girl.png";
import graduate from "@/assets/chibi-graduate.png";
import teacher from "@/assets/chibi-teacher.png";
import speaking from "@/assets/chibi-speaking.png";

const LEARNER_FACES = [studyGirl, studyBoy, graduate, speaking];
const PARTNER_FACES = [businessMan, businessWoman, businessVest, teacher];

const hash = (seed: string) => {
  let value = 0;
  for (let index = 0; index < seed.length; index += 1) {
    value = (value * 31 + seed.charCodeAt(index)) | 0;
  }
  return Math.abs(value);
};

/**
 * @param seed stable seed, normally `${lessonId}::${speakerName}`
 * @param learner true for the student side of the chat
 */
export const dialogueAvatarFor = (seed: string, learner: boolean): string => {
  const faces = learner ? LEARNER_FACES : PARTNER_FACES;
  return faces[hash(seed) % faces.length];
};
