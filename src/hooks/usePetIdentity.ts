/**
 * usePetIdentity - Student-customizable Pet identity.
 *
 * Stores the pet's nickname and chosen skin in localStorage so that the
 * preference follows the student across pages, even when offline.
 * Other components (the launcher tooltip, header, info panel) can both
 * read and write this value via the returned helpers.
 *
 * Storage keys:
 *   pet_identity_name  -> string ("Pixel", "Coco"…)
 *   pet_identity_skin  -> one of PET_SKINS[].id
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import chatbotIcon from "@/assets/chatbot-icon.png";

import aiChibiRobot from "@/assets/ai-chibi-robot.png";
import chibiRobot from "@/assets/chibi-robot.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiPanda from "@/assets/chibi-panda.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiRocket from "@/assets/chibi-rocket.png";
import chibiGraduate from "@/assets/chibi-graduate.png";
import chibiTeacher from "@/assets/chibi-teacher.png";
import chibiTeacherIelts from "@/assets/chibi-teacher-ielts.png";
import chibiStudyBoy from "@/assets/chibi-study-boy.png";
import chibiStudyGirl from "@/assets/chibi-study-girl.png";
import chibiVocabWarrior from "@/assets/chibi-vocab-warrior.png";
import chibiVocabGamer from "@/assets/chibi-vocab-gamer.png";
import chibiQuizTrophy from "@/assets/chibi-quiz-trophy.png";
import chibiSpeaking from "@/assets/chibi-speaking.png";
import chibiReading from "@/assets/chibi-reading.png";
import chibiListening from "@/assets/chibi-listening.png";
import teacherHaiTraveler from "@/assets/teacher-hai-chibi-traveler.png";

export interface PetSkin {
  id: string;
  label: string;
  src: string;
}

export const PET_SKINS: PetSkin[] = [
  { id: "mrhai",      label: "Mr. Hai Bot",   src: chatbotIcon },
  { id: "ai",         label: "AI Cyborg",     src: aiChibiRobot },
  { id: "robot",      label: "Tiny Robot",    src: chibiRobot },
  { id: "owl",        label: "Wise Owl",      src: chibiOwl },
  { id: "panda",      label: "Panda",         src: chibiPanda },
  { id: "coder",      label: "Coder",         src: chibiCoder },
  { id: "rocket",     label: "Rocket",        src: chibiRocket },
  { id: "graduate",   label: "Graduate",      src: chibiGraduate },
  { id: "teacher",    label: "Mini Teacher",  src: chibiTeacher },
  { id: "ielts",      label: "IELTS Coach",   src: chibiTeacherIelts },
  { id: "study-boy",  label: "Study Boy",     src: chibiStudyBoy },
  { id: "study-girl", label: "Study Girl",    src: chibiStudyGirl },
  { id: "warrior",    label: "Vocab Warrior", src: chibiVocabWarrior },
  { id: "gamer",      label: "Vocab Gamer",   src: chibiVocabGamer },
  { id: "trophy",     label: "Quiz Champ",    src: chibiQuizTrophy },
  { id: "speaker",    label: "Speaker",       src: chibiSpeaking },
  { id: "reader",     label: "Reader",        src: chibiReading },
  { id: "listener",   label: "Listener",      src: chibiListening },
  { id: "traveler",   label: "Traveler",      src: teacherHaiTraveler },
];

const NAME_KEY = "pet_identity_name";
const SKIN_KEY = "pet_identity_skin";
const DEFAULT_NAME = "Pixel";

export function usePetIdentity() {
  const [name, setNameState] = useState<string>(DEFAULT_NAME);
  const [skinId, setSkinState] = useState<string>(PET_SKINS[0].id);

  // Hydrate from localStorage once
  useEffect(() => {
    try {
      const n = localStorage.getItem(NAME_KEY);
      const s = localStorage.getItem(SKIN_KEY);
      if (n) setNameState(n);
      if (s && PET_SKINS.some(p => p.id === s)) setSkinState(s);
    } catch { /* localStorage blocked */ }
  }, []);

  // Listen for cross-tab/component updates
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === NAME_KEY && e.newValue) setNameState(e.newValue);
      if (e.key === SKIN_KEY && e.newValue) setSkinState(e.newValue);
    };
    const onLocal = () => {
      try {
        const n = localStorage.getItem(NAME_KEY);
        const s = localStorage.getItem(SKIN_KEY);
        if (n) setNameState(n);
        if (s) setSkinState(s);
      } catch { /* ignore */ }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("pet:identity-changed", onLocal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pet:identity-changed", onLocal);
    };
  }, []);

  const setName = useCallback((next: string) => {
    const clean = next.trim().slice(0, 18) || DEFAULT_NAME;
    setNameState(clean);
    try { localStorage.setItem(NAME_KEY, clean); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("pet:identity-changed"));
  }, []);

  const setSkin = useCallback((id: string) => {
    if (!PET_SKINS.some(p => p.id === id)) return;
    setSkinState(id);
    try { localStorage.setItem(SKIN_KEY, id); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("pet:identity-changed"));
  }, []);

  const skin = PET_SKINS.find(p => p.id === skinId) ?? PET_SKINS[0];
  return { name, skin, skinId, setName, setSkin };
}
