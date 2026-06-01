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
import { useCallback, useEffect, useState } from "react";
import chatbotIcon from "@/assets/chatbot-icon.png";
import aiChibiRobot from "@/assets/ai-chibi-robot.png";
import chibiRobot from "@/assets/chibi-robot.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiPanda from "@/assets/chibi-panda.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiRocket from "@/assets/chibi-rocket.png";
import chibiGraduate from "@/assets/chibi-graduate.png";

export interface PetSkin {
  id: string;
  label: string;
  src: string;
}

export const PET_SKINS: PetSkin[] = [
  { id: "mrhai",    label: "Mr. Hai Bot", src: chatbotIcon },
  { id: "ai",       label: "AI Cyborg",   src: aiChibiRobot },
  { id: "robot",    label: "Tiny Robot",  src: chibiRobot },
  { id: "owl",      label: "Wise Owl",    src: chibiOwl },
  { id: "panda",    label: "Panda",       src: chibiPanda },
  { id: "coder",    label: "Coder",       src: chibiCoder },
  { id: "rocket",   label: "Rocket",      src: chibiRocket },
  { id: "graduate", label: "Graduate",    src: chibiGraduate },
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
