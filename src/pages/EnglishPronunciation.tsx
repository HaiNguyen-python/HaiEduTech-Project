/**
 * @file EnglishPronunciation.tsx
 * @description "Pronunciation & Intonation" - A self-contained interactive
 * page under the English Foundation pillar. It teaches IPA basics, intonation
 * patterns, connected speech (linking, elision, assimilation), reduced forms
 * (schwa & weak forms), word/sentence stress, and contrasts British vs
 * American English with side-by-side audio + listening discrimination quiz.
 *
 * The page uses the browser SpeechSynthesis API to demo each model sentence in
 * either an en-GB or en-US voice (no backend required, no API keys). All copy
 * is bilingual via useLanguage().
 */
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mic2,
  Volume2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Music2,
  Languages,
  Sparkles,
  Headphones,
  GraduationCap,
  Crown,
  Flag,
  Waves,
  Layers3,
  AudioLines,
  Trophy,
  Mic,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingEnglishParticles from "@/components/FloatingEnglishParticles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*  Speech helpers                                                            */
/* -------------------------------------------------------------------------- */

type Accent = "en-GB" | "en-US";

// Use Google TTS proxy with native SpeechSynthesis fallback. The proxy gives
// consistent natural-sounding audio across all browsers/preview sandboxes
// (the previous `speechSynthesis.speak` path was silent on systems without
// an installed en-US voice).
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";

const speak = (text: string, accent: Accent = "en-US", rate = 0.75) => {
  stopEnglishTts();
  void playEnglishTts(text, { playbackRate: rate, speechRate: rate, accent }).then((ok) => {
    if (!ok) toast.error("Trình duyệt không phát được audio");
  });
};

/**
 * Speak a comma-separated list of example words with natural pauses between
 * them so ALL the example words are heard clearly (no clipped, jumpy delivery).
 * Uses " ... " between words which SpeechSynthesis renders as a soft pause.
 */
const speakExamples = (csv: string, accent: Accent = "en-US") => {
  const words = csv
    .split(",")
    .map((w) => w.replace(/\(.+?\)/g, "").trim())
    .filter(Boolean);
  if (words.length === 0) return;
  const phrase = words.join(" ... ");
  speak(phrase, accent, 0.7);
};

/* -------------------------------------------------------------------------- */
/*  Curriculum data                                                           */
/* -------------------------------------------------------------------------- */

interface PhonemeRow {
  ipa: string;
  example: string;
  vi: string;
  tip: string;
  tipEn: string;
}

const VOWELS: PhonemeRow[] = [
  { ipa: "/iː/", example: "see, tree, beach", vi: "Âm 'i' kéo dài, miệng mỉm cười, lưỡi đẩy cao về phía trước. Giống chữ 'i' trong 'in' nhưng giữ lâu gấp đôi.", tip: "Mỉm cười rộng, kéo dài âm 'i' khoảng 2 nhịp", tipEn: "Smile wide and hold the 'ee' for 2 beats" },
  { ipa: "/ɪ/", example: "sit, ship, bit", vi: "Âm 'i' ngắn, môi và lưỡi thả lỏng hoàn toàn. KHÔNG kéo dài, KHÔNG mỉm cười rộng như /iː/.", tip: "Bật nhanh, lỏng môi, ngắn gọn như 'ích'", tipEn: "Quick, relaxed, short - don't stretch" },
  { ipa: "/e/", example: "bed, head, said", vi: "Âm 'e' rõ ràng giống 'e' trong 'em', mở miệng vừa phải, lưỡi ở vị trí giữa.", tip: "Mở miệng vừa, đầu lưỡi chạm răng dưới", tipEn: "Mid-open mouth, tongue tip touching lower teeth" },
  { ipa: "/æ/", example: "cat, hat, bad", vi: "Âm trung gian giữa 'a' và 'e' - hạ hàm thấp xuống, kéo miệng ngang sang hai bên như đang cười nhẹ. Đặc trưng giọng Mỹ.", tip: "Hạ hàm và kéo miệng ngang - phát âm hơi 'bẹt'", tipEn: "Drop jaw, stretch lips sideways - sounds 'flat'" },
  { ipa: "/ʌ/", example: "cup, love, sun", vi: "Âm 'ă' ngắn trầm, giống 'â' trong 'ấm' nhưng ngắn hơn. Miệng mở vừa, lưỡi nằm giữa, thả lỏng.", tip: "Bật ngắn như tiếng 'ă' nhẹ, không kéo dài", tipEn: "Short, soft 'uh' - keep it brief" },
  { ipa: "/ɑː/", example: "car, father, palm", vi: "Âm 'a' kéo dài, mở miệng to hết cỡ như khi bác sĩ khám họng. Lưỡi hạ thấp về phía sau.", tip: "Mở miệng to, hạ lưỡi thấp, giữ âm 2 nhịp", tipEn: "Open mouth wide, lower the tongue, hold 2 beats" },
  { ipa: "/ɒ/", example: "hot, dog, lot (UK)", vi: "Âm 'o' ngắn tròn môi - chỉ dùng trong giọng Anh-Anh. Giọng Mỹ thay bằng /ɑː/.", tip: "Tròn môi nhẹ, bật ngắn", tipEn: "Slightly rounded lips, short release" },
  { ipa: "/ɔː/", example: "law, bought, four", vi: "Âm 'o' kéo dài và tròn môi, giống chữ 'o' trong 'no' của tiếng Việt nhưng giữ lâu hơn nhiều.", tip: "Tròn môi đều, kéo dài âm 'o' 2 nhịp", tipEn: "Round lips firmly, hold the 'aw' for 2 beats" },
  { ipa: "/ʊ/", example: "book, put, good", vi: "Âm 'u' ngắn, môi tròn nhẹ và thả lỏng. Ngắn và mềm, không chu môi mạnh.", tip: "Tròn môi nhẹ, bật nhanh như 'ục'", tipEn: "Light round, quick - like 'oo' in 'book'" },
  { ipa: "/uː/", example: "food, blue, moon", vi: "Âm 'u' kéo dài, chu môi nhọn ra phía trước thật xa. Giữ âm đều và lâu.", tip: "Chu môi nhọn về phía trước, kéo dài 2 nhịp", tipEn: "Push lips far forward in a tight 'O', hold 2 beats" },
  { ipa: "/ə/", example: "about, sofa, banana", vi: "Schwa - âm 'ơ' rất ngắn và yếu, gần như nuốt vào. Đây là âm phổ biến nhất trong tiếng Anh, xuất hiện ở những âm tiết KHÔNG có trọng âm.", tip: "Bật cực nhanh, gần như nuốt - đừng phát âm rõ", tipEn: "Super quick 'uh', almost swallowed - never stressed" },
  { ipa: "/ɜː/", example: "bird, work, learn", vi: "Âm 'ơ' kéo dài, lưỡi giữ ở giữa khoang miệng, môi không tròn. Giống 'ơ' trong 'mơ' nhưng giữ lâu gấp đôi.", tip: "Giữ lưỡi giữa miệng, kéo dài âm 'ơ' đều", tipEn: "Keep tongue centered, hold the 'er' sound steady" },
];

const CONSONANTS: PhonemeRow[] = [
  // Tricky / signature English consonants (the ones Vietnamese learners struggle with most)
  { ipa: "/θ/", example: "think, thank, three", vi: "Đặt đầu lưỡi giữa hai hàm răng rồi đẩy hơi ra - KHÔNG rung dây thanh. Người Việt thường nhầm thành /t/ hoặc /s/.", tip: "Cắn nhẹ đầu lưỡi, thổi hơi nhẹ ra", tipEn: "Tongue tip lightly between teeth, push air out (no voice)" },
  { ipa: "/ð/", example: "this, that, mother", vi: "Giống /θ/ - đầu lưỡi giữa hai răng - NHƯNG có rung dây thanh. Đặt tay lên cổ sẽ thấy rung.", tip: "Như /θ/ nhưng RUNG cổ họng - đặt tay lên cổ để kiểm tra", tipEn: "Same as /θ/ but VOICED - feel vibration in your throat" },
  { ipa: "/ʃ/", example: "she, ship, fashion", vi: "Âm 'sh' - chu môi nhẹ về phía trước, đẩy hơi qua khe giữa lưỡi và vòm miệng. KHÔNG rung.", tip: "Chu môi nhẹ, thổi hơi dài 'sh-sh-sh'", tipEn: "Slightly rounded lips, sustained 'sh' airflow" },
  { ipa: "/ʒ/", example: "vision, measure, garage", vi: "Giống /ʃ/ nhưng có rung dây thanh. Khá hiếm, thường xuất hiện ở giữa từ.", tip: "Như /ʃ/ nhưng có rung cổ họng", tipEn: "Voiced /ʃ/ - add throat vibration" },
  { ipa: "/tʃ/", example: "church, cheese, watch", vi: "Âm 'ch' - bật mạnh đầu lưỡi vào vòm miệng rồi thả thành /ʃ/. Giống 'ch' trong tiếng Việt nhưng mạnh hơn.", tip: "Bật /t/ rồi nối liền sang /ʃ/", tipEn: "Stop with /t/, then release into /ʃ/" },
  { ipa: "/dʒ/", example: "judge, gem, age", vi: "Giống /tʃ/ nhưng có rung dây thanh. Là âm 'j' trong tiếng Anh.", tip: "Như /tʃ/ nhưng RUNG cổ họng", tipEn: "Voiced /tʃ/ - same gesture, add voice" },
  { ipa: "/ŋ/", example: "sing, ring, long", vi: "Âm 'ng' ở CUỐI từ - KHÔNG được bật chữ 'g' phía sau. Người Việt hay phát âm thành 'sing-gờ'.", tip: "Đừng bật 'g' cuối - chỉ giữ âm 'ng' trong mũi", tipEn: "Stop at the nasal 'ng' - never release a 'g' after" },
  { ipa: "/r/", example: "red, very, around", vi: "Cong đầu lưỡi lên nhưng KHÔNG chạm vòm miệng, môi hơi tròn. KHÁC với /r/ rung của tiếng Việt.", tip: "Cong lưỡi lên không chạm vòm, môi hơi tròn", tipEn: "Curl tongue up without touching roof, lips slightly rounded" },
  { ipa: "/l/", example: "light, feel, full", vi: "L 'sáng' ở đầu từ (đặt đầu lưỡi sau răng trên), L 'tối' ở cuối từ (lưỡi kéo về sau, âm trầm hơn).", tip: "Đầu từ: đầu lưỡi sau răng trên. Cuối từ: lưỡi kéo về sau", tipEn: "Initial: tongue tip behind upper teeth. Final: tongue pulls back" },
  { ipa: "/v/", example: "very, voice, love", vi: "Răng trên cắn nhẹ lên môi dưới, đẩy hơi ra và RUNG dây thanh. KHÁC /w/ - phải có răng chạm môi.", tip: "Răng trên chạm môi dưới + rung cổ họng", tipEn: "Upper teeth on lower lip + voiced" },
  { ipa: "/w/", example: "we, wait, away", vi: "Chu môi tròn nhọn như khi huýt sáo, KHÔNG cho răng chạm môi. Người Việt hay nhầm /w/ với /v/.", tip: "Chu môi tròn, KHÔNG có răng chạm môi", tipEn: "Round lips like whistling, NO teeth contact" },
  // Common voiceless / voiced stops & fricatives (added for a complete chart)
  { ipa: "/p/", example: "pen, top, happy", vi: "Bật hai môi mạnh, KHÔNG rung. Khi ở đầu từ phải có hơi bật mạnh (cầm tờ giấy trước miệng sẽ rung).", tip: "Mím môi rồi bật mạnh - có hơi bật ra", tipEn: "Press lips, release with a puff of air" },
  { ipa: "/b/", example: "book, big, job", vi: "Bật hai môi giống /p/ nhưng có RUNG dây thanh, không có hơi bật mạnh.", tip: "Như /p/ nhưng có rung cổ họng, ít hơi", tipEn: "Like /p/ but voiced - little to no air puff" },
  { ipa: "/t/", example: "ten, time, cat", vi: "Đầu lưỡi chạm sau răng trên rồi bật ra mạnh. Ở đầu từ phải có hơi bật (aspirated).", tip: "Đầu lưỡi sau răng trên - bật mạnh có hơi", tipEn: "Tongue tip behind upper teeth, sharp release" },
  { ipa: "/d/", example: "dog, dark, bad", vi: "Giống /t/ nhưng có RUNG dây thanh. Cuối từ phải phát âm rõ - người Việt hay nuốt mất.", tip: "Như /t/ nhưng có rung - đừng bỏ /d/ cuối từ", tipEn: "Voiced /t/ - never drop the final /d/" },
  { ipa: "/k/", example: "key, car, back", vi: "Phần SAU của lưỡi nâng lên chạm vòm mềm rồi bật ra. Ở đầu từ có hơi bật mạnh.", tip: "Cuống lưỡi chạm vòm mềm rồi bật ra", tipEn: "Back of tongue against soft palate, release with air" },
  { ipa: "/g/", example: "go, big, again", vi: "Giống /k/ nhưng có RUNG dây thanh, ít hơi bật hơn.", tip: "Như /k/ nhưng có rung cổ họng", tipEn: "Voiced /k/ - same gesture with voice" },
  { ipa: "/f/", example: "fish, four, off", vi: "Răng trên cắn nhẹ môi dưới, thổi hơi ra - KHÔNG rung. Đây là /v/ phiên bản không rung.", tip: "Răng trên chạm môi dưới, thổi hơi (không rung)", tipEn: "Upper teeth on lower lip, voiceless airflow" },
  { ipa: "/s/", example: "sun, see, kiss", vi: "Đầu lưỡi gần (không chạm) sau răng trên, đẩy hơi qua khe để tạo tiếng 'xì'. KHÔNG rung.", tip: "Đầu lưỡi gần răng trên - thổi hơi 'xì'", tipEn: "Tongue tip near upper teeth, hiss the air out" },
  { ipa: "/z/", example: "zoo, busy, dogs", vi: "Giống /s/ nhưng có RUNG dây thanh. Cuối từ số nhiều sau nguyên âm thường là /z/.", tip: "Như /s/ nhưng có rung cổ họng", tipEn: "Voiced /s/ - same hiss with throat vibration" },
  { ipa: "/h/", example: "hat, hello, who", vi: "Chỉ đơn giản thổi hơi ra từ cổ họng - như khi thở dài. KHÔNG dùng dây thanh.", tip: "Thổi hơi nhẹ ra từ cổ, không tạo tiếng", tipEn: "Just exhale a soft puff of air from the throat" },
  { ipa: "/m/", example: "man, swim, time", vi: "Mím hai môi và rung dây thanh - âm thoát qua mũi. Giống 'm' trong tiếng Việt.", tip: "Mím môi, để âm thoát qua mũi", tipEn: "Close lips, let voiced sound resonate through nose" },
  { ipa: "/n/", example: "no, run, sun", vi: "Đầu lưỡi chạm sau răng trên và rung dây thanh - âm thoát qua mũi. Giống 'n' trong tiếng Việt.", tip: "Đầu lưỡi sau răng trên, âm qua mũi", tipEn: "Tongue tip behind upper teeth, nasal voiced sound" },
  { ipa: "/j/", example: "yes, you, yellow", vi: "Âm 'y' đầu từ - lưỡi nâng cao gần vòm miệng rồi trượt nhanh sang nguyên âm tiếp theo. KHÔNG phải /j/ trong tiếng Pháp.", tip: "Lưỡi cao gần vòm rồi trượt nhanh - như 'y' trong 'yêu'", tipEn: "Quick glide from high tongue position into the next vowel" },
];

// 8 nguyên âm đôi (diphthongs) chuẩn của tiếng Anh
const DIPHTHONGS: PhonemeRow[] = [
  { ipa: "/eɪ/", example: "day, face, make", vi: "Trượt từ /e/ sang /ɪ/ - bắt đầu mở miệng vừa, kết thúc khép môi như chữ 'i'. Giống 'ây' trong 'mây' nhưng dài và mềm hơn.", tip: "Bắt đầu 'e', trượt mượt sang 'i' trong cùng một hơi", tipEn: "Start with 'e', glide smoothly to 'i' in one breath" },
  { ipa: "/aɪ/", example: "my, time, eye", vi: "Trượt từ /a/ sang /ɪ/ - mở miệng to ở 'a' rồi khép nhanh sang 'i'. Giống 'ai' trong 'tai' của tiếng Việt.", tip: "Mở miệng to ở 'a', khép nhanh sang 'i'", tipEn: "Open wide on 'a', then quickly close to 'i'" },
  { ipa: "/ɔɪ/", example: "boy, coin, voice", vi: "Trượt từ /ɔː/ sang /ɪ/ - bắt đầu tròn môi ở 'o', kéo căng môi sang 'i'. Giống 'oi' trong 'tôi'.", tip: "Tròn môi ở 'o', kéo căng môi sang 'i'", tipEn: "Round lips on 'o', stretch to 'i'" },
  { ipa: "/aʊ/", example: "now, how, house", vi: "Trượt từ /a/ sang /ʊ/ - mở miệng to ở 'a' rồi chu môi tròn sang 'u'. Giống 'ao' trong 'cao' của tiếng Việt.", tip: "Mở to ở 'a', chu môi tròn sang 'u'", tipEn: "Wide 'a', then round lips into 'u'" },
  { ipa: "/əʊ/ (UK) · /oʊ/ (US)", example: "go, home, slow", vi: "Trượt từ /ə/ (UK) hoặc /o/ (US) sang /ʊ/. Anh-Mỹ tròn môi mạnh hơn, Anh-Anh bắt đầu trung tính hơn. Giống 'âu' trong 'sâu'.", tip: "Anh-Mỹ tròn môi mạnh hơn, Anh-Anh nhẹ hơn", tipEn: "American rounds the lips more; British starts more neutral" },
  { ipa: "/ɪə/", example: "here, near, ear", vi: "Trượt từ /ɪ/ sang /ə/ - chỉ dùng trong giọng Anh-Anh (không phát âm chữ 'r'). Giọng Mỹ thay bằng /ɪr/.", tip: "UK: trượt 'i-ơ' không có 'r'. US: phát âm /ɪr/", tipEn: "UK: glide 'i-uh' (no /r/). US: pronounce /ɪr/ instead" },
  { ipa: "/eə/", example: "hair, care, where", vi: "Trượt từ /e/ sang /ə/ - chỉ dùng trong giọng Anh-Anh. Giọng Mỹ thay bằng /er/.", tip: "UK: trượt 'e-ơ'. US: phát âm /er/", tipEn: "UK: glide 'e-uh'. US: pronounce /er/ instead" },
  { ipa: "/ʊə/", example: "tour, sure, poor", vi: "Trượt từ /ʊ/ sang /ə/ - chỉ trong giọng Anh-Anh cổ điển, đang biến mất. Đa số người nói trẻ thay bằng /ɔː/.", tip: "Hiếm gặp - đa số người nói trẻ dùng /ɔː/ thay thế", tipEn: "Rare nowadays - most young speakers use /ɔː/" },
];

interface VnMistake {
  word: string;
  wrong: string;
  wrongIpa: string;
  correctIpa: string;
  vi: string;
  en: string;
  category: "ending" | "vowel" | "th" | "stress" | "silent" | "cluster";
}

// 30+ common mispronunciations by Vietnamese learners (compiled from teaching experience)
const VN_MISTAKES: VnMistake[] = [
  // Ending consonants - dropped or replaced
  { word: "wished", wrong: "'wish-ết / wish'", wrongIpa: "/wɪʃ/", correctIpa: "/wɪʃt/", category: "ending", vi: "Người Việt hay bỏ /t/ cuối. Nhớ: -ed sau âm vô thanh = /t/.", en: "Vietnamese learners drop final /t/. Remember: -ed after voiceless = /t/." },
  { word: "asked", wrong: "'át / ask'", wrongIpa: "/æsk/", correctIpa: "/æskt/ hoặc /ɑːskt/", category: "cluster", vi: "Cụm /skt/ cuối từ - rất khó. Đừng bỏ qua /t/.", en: "Final /skt/ cluster is tough - don't skip the /t/." },
  { word: "clothes", wrong: "'cờ-lo / close'", wrongIpa: "/kloʊz/", correctIpa: "/kloʊðz/", category: "cluster", vi: "Có /ð/ + /z/ cuối, không phải 'close'.", en: "Has /ð/ + /z/ ending, not just 'close'." },
  { word: "months", wrong: "'mân / mân-s'", wrongIpa: "/mʌns/", correctIpa: "/mʌnθs/", category: "cluster", vi: "Cụm /nθs/ - lưỡi giữa răng rồi xì /s/.", en: "/nθs/ cluster - tongue between teeth then hiss /s/." },
  { word: "world", wrong: "'gô / wo'", wrongIpa: "/wɔː/", correctIpa: "/wɜːrld/", category: "ending", vi: "Đừng bỏ /ld/ cuối. Phát âm rõ cả /r/, /l/, /d/.", en: "Don't drop /ld/. Pronounce /r/, /l/, /d/ clearly." },
  { word: "lunch", wrong: "'lăn / lăn-chờ'", wrongIpa: "/lʌn/", correctIpa: "/lʌntʃ/", category: "ending", vi: "Có /tʃ/ cuối, không phải /n/ cụt.", en: "Has /tʃ/ ending, not bare /n/." },
  // /θ/ and /ð/ - replaced with /t/, /s/, /d/, /z/
  { word: "three", wrong: "'trê / sờ-ri'", wrongIpa: "/triː/", correctIpa: "/θriː/", category: "th", vi: "/θ/ - đặt đầu lưỡi giữa hai răng rồi xì hơi.", en: "/θ/ - put tongue tip between teeth and blow." },
  { word: "thank", wrong: "'ten-kiu'", wrongIpa: "/tæŋk/", correctIpa: "/θæŋk/", category: "th", vi: "Không phải /t/ - phải có /θ/ lưỡi giữa răng.", en: "Not /t/ - must be /θ/ with tongue between teeth." },
  { word: "this", wrong: "'đít / dít'", wrongIpa: "/dɪs/", correctIpa: "/ðɪs/", category: "th", vi: "/ð/ rung, giống /θ/ nhưng có rung dây thanh.", en: "/ð/ is voiced, like /θ/ with vocal cord vibration." },
  { word: "mother", wrong: "'mô-đờ / mô-dơ'", wrongIpa: "/ˈmʌdər/", correctIpa: "/ˈmʌðər/", category: "th", vi: "Đầu lưỡi giữa răng, có rung. Không phải /d/.", en: "Tongue between teeth, voiced. Not /d/." },
  { word: "thought", wrong: "'thót / sot'", wrongIpa: "/sɔːt/", correctIpa: "/θɔːt/", category: "th", vi: "/θ/ + /ɔː/ dài + /t/ cuối rõ.", en: "/θ/ + long /ɔː/ + clear final /t/." },
  // /v/ vs /w/ confusion
  { word: "very", wrong: "'oeo-ri / we-ri'", wrongIpa: "/ˈweri/", correctIpa: "/ˈveri/", category: "vowel", vi: "/v/ răng trên cắn nhẹ môi dưới, không tròn môi.", en: "/v/ upper teeth on lower lip, don't round lips." },
  { word: "while", wrong: "'vai-lờ / vail'", wrongIpa: "/vaɪl/", correctIpa: "/waɪl/", category: "vowel", vi: "/w/ tròn môi, không cắn răng.", en: "/w/ round lips, no teeth contact." },
  // Final /s/ /z/
  { word: "buses", wrong: "'bát-sì / bát'", wrongIpa: "/bʌs/", correctIpa: "/ˈbʌsɪz/", category: "ending", vi: "Sau /s/ /z/ /ʃ/ /tʃ/ /dʒ/, số nhiều = /ɪz/.", en: "After /s/ /z/ /ʃ/ /tʃ/ /dʒ/, plural = /ɪz/." },
  { word: "boys", wrong: "'boi-s'", wrongIpa: "/bɔɪs/", correctIpa: "/bɔɪz/", category: "ending", vi: "Sau nguyên âm, -s đọc là /z/ rung.", en: "After a vowel, -s is voiced /z/." },
  // Silent letters
  { word: "Wednesday", wrong: "'wét-nét-đê'", wrongIpa: "/ˈwednesdeɪ/", correctIpa: "/ˈwenzdeɪ/", category: "silent", vi: "Chữ 'd' đầu câm. Đọc 'wenz-day'.", en: "First 'd' is silent. Say 'wenz-day'." },
  { word: "comfortable", wrong: "'com-pho-tê-bồ'", wrongIpa: "/ˈkʌmfɔːrtəbl/", correctIpa: "/ˈkʌmftərbl/ hoặc /ˈkʌmfərtəbl/", category: "silent", vi: "Chỉ 3 âm tiết: KUMF-tuh-bul.", en: "Only 3 syllables: KUMF-tuh-bul." },
  { word: "vegetable", wrong: "'ve-gờ-tê-bồ'", wrongIpa: "/ˈvedʒətəbl/", correctIpa: "/ˈvedʒtəbl/", category: "silent", vi: "Nuốt 'e' giữa: VEJ-tuh-bul, chỉ 3 âm tiết.", en: "Swallow middle 'e': VEJ-tuh-bul, 3 syllables." },
  { word: "chocolate", wrong: "'chô-cô-lết'", wrongIpa: "/ˈtʃɒkəleɪt/", correctIpa: "/ˈtʃɒklət/", category: "silent", vi: "2 âm tiết: CHOK-lət, không phải 3.", en: "2 syllables: CHOK-lət, not 3." },
  { word: "island", wrong: "'ít-lừn / is-land'", wrongIpa: "/ˈɪzlænd/", correctIpa: "/ˈaɪlənd/", category: "silent", vi: "Chữ 's' câm hoàn toàn. Đọc 'EYE-lənd'.", en: "'s' is completely silent. Say 'EYE-lənd'." },
  { word: "knife", wrong: "'k'naif / knai-fê'", wrongIpa: "/knaɪf/", correctIpa: "/naɪf/", category: "silent", vi: "'k' đầu câm. Đọc 'NIGH-fe'.", en: "Initial 'k' is silent. Say 'NIGH-fe'." },
  // Word stress
  { word: "comfortable", wrong: "com-FOR-ta-ble", wrongIpa: "/kəmˈfɔːrtəbl/", correctIpa: "/ˈkʌmftərbl/", category: "stress", vi: "Trọng âm đầu: KUM-, không phải -FOR-.", en: "Stress first syllable: KUM-, not -FOR-." },
  { word: "photograph", wrong: "pho-to-GRAPH", wrongIpa: "/foʊtəˈɡræf/", correctIpa: "/ˈfoʊtəɡræf/", category: "stress", vi: "Trọng âm đầu: PHO-to-graph.", en: "Stress first: PHO-to-graph." },
  { word: "photography", wrong: "PHO-to-graphy", wrongIpa: "/ˈfoʊtəɡræfi/", correctIpa: "/fəˈtɒɡrəfi/", category: "stress", vi: "Trọng âm âm 2: pho-TO-gra-phy.", en: "Stress on 2nd: pho-TO-gra-phy." },
  { word: "develop", wrong: "DE-velop", wrongIpa: "/ˈdiːveləp/", correctIpa: "/dɪˈveləp/", category: "stress", vi: "Trọng âm âm 2: de-VEL-op.", en: "Stress on 2nd: de-VEL-op." },
  { word: "interesting", wrong: "in-tê-RÉT-ting", wrongIpa: "/ɪntəˈrestɪŋ/", correctIpa: "/ˈɪntrəstɪŋ/", category: "stress", vi: "Trọng âm đầu + chỉ 3 âm tiết: IN-tres-ting.", en: "Stress first + only 3 syllables: IN-tres-ting." },
  // Vowel confusion
  { word: "beach / bitch", wrong: "Đọc giống nhau", wrongIpa: "/bɪtʃ/", correctIpa: "beach /biːtʃ/ vs bitch /bɪtʃ/", category: "vowel", vi: "/iː/ dài (beach) vs /ɪ/ ngắn (bitch) - nhầm là tai họa!", en: "Long /iː/ vs short /ɪ/ - mixing them up is disastrous!" },
  { word: "sheet / shit", wrong: "Đọc giống nhau", wrongIpa: "/ʃɪt/", correctIpa: "sheet /ʃiːt/ vs shit /ʃɪt/", category: "vowel", vi: "/iː/ dài, kéo căng môi, khác hẳn /ɪ/ ngắn.", en: "Long /iː/ stretch lips - very different from short /ɪ/." },
  { word: "ago", wrong: "'a-gô' nhấn đầu", wrongIpa: "/ˈæɡoʊ/", correctIpa: "/əˈɡoʊ/", category: "stress", vi: "Trọng âm âm 2 + âm đầu là schwa /ə/.", en: "Stress 2nd + first syllable is schwa /ə/." },
  { word: "focus", wrong: "'phô-cứt'", wrongIpa: "/fəʊˈkʌs/", correctIpa: "/ˈfoʊkəs/", category: "stress", vi: "Trọng âm đầu, âm cuối nhẹ /əs/.", en: "Stress first, light final /əs/." },
  // Consonant clusters
  { word: "strength", wrong: "'sờ-treng / treng'", wrongIpa: "/treŋ/", correctIpa: "/streŋθ/", category: "cluster", vi: "Cụm /str/ đầu + /ŋθ/ cuối - một trong những từ khó nhất.", en: "Initial /str/ + final /ŋθ/ - one of the hardest words." },
  { word: "scripts", wrong: "'sờ-cờ-rip'", wrongIpa: "/skrɪp/", correctIpa: "/skrɪpts/", category: "cluster", vi: "Cụm /pts/ cuối - đừng nuốt mất /ts/.", en: "Final /pts/ cluster - don't swallow the /ts/." },
  { word: "sixth", wrong: "'síc'", wrongIpa: "/sɪks/", correctIpa: "/sɪksθ/", category: "cluster", vi: "Cụm /ksθ/ - kết thúc bằng /θ/ lưỡi giữa răng.", en: "/ksθ/ cluster - end with /θ/ tongue between teeth." },
];

const VN_MISTAKE_GROUPS: { key: VnMistake["category"]; vi: string; en: string; emoji: string; color: string }[] = [
  { key: "th", vi: "Âm /θ/ và /ð/ (lưỡi giữa răng)", en: "/θ/ and /ð/ (tongue between teeth)", emoji: "👅", color: "from-rose-500/15 to-rose-500/5 border-rose-500/30" },
  { key: "ending", vi: "Bỏ phụ âm cuối", en: "Dropping final consonants", emoji: "✂️", color: "from-amber-500/15 to-amber-500/5 border-amber-500/30" },
  { key: "cluster", vi: "Cụm phụ âm khó", en: "Difficult consonant clusters", emoji: "🧩", color: "from-purple-500/15 to-purple-500/5 border-purple-500/30" },
  { key: "vowel", vi: "Nhầm nguyên âm dài/ngắn", en: "Long vs short vowel confusion", emoji: "🎯", color: "from-sky-500/15 to-sky-500/5 border-sky-500/30" },
  { key: "stress", vi: "Sai trọng âm", en: "Wrong word stress", emoji: "💢", color: "from-orange-500/15 to-orange-500/5 border-orange-500/30" },
  { key: "silent", vi: "Chữ câm (silent letters)", en: "Silent letters", emoji: "🤫", color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30" },
];

interface MinimalPair {
  vi: string;
  pair: [string, string];
  ipa: [string, string];
}
const MIN_PAIRS: MinimalPair[] = [
  { vi: "i ngắn vs i dài", pair: ["ship", "sheep"], ipa: ["/ʃɪp/", "/ʃiːp/"] },
  { vi: "i ngắn vs i dài", pair: ["live", "leave"], ipa: ["/lɪv/", "/liːv/"] },
  { vi: "/ʌ/ vs /æ/", pair: ["cup", "cap"], ipa: ["/kʌp/", "/kæp/"] },
  { vi: "/e/ vs /æ/", pair: ["bed", "bad"], ipa: ["/bed/", "/bæd/"] },
  { vi: "/θ/ vs /s/", pair: ["think", "sink"], ipa: ["/θɪŋk/", "/sɪŋk/"] },
  { vi: "/v/ vs /w/", pair: ["vest", "west"], ipa: ["/vest/", "/west/"] },
  { vi: "/r/ vs /l/", pair: ["right", "light"], ipa: ["/raɪt/", "/laɪt/"] },
  { vi: "/ʃ/ vs /tʃ/", pair: ["sheep", "cheap"], ipa: ["/ʃiːp/", "/tʃiːp/"] },
];

type IntonationGroup = "falling" | "rising" | "mixed" | "stress" | "special";
interface IntonationItem {
  group: IntonationGroup;
  pattern: string;
  patternEn: string;
  examples: string[];
  note: string;
  noteEn: string;
}
const INTONATION: IntonationItem[] = [
  // ===== FALLING ↘ =====
  {
    group: "falling",
    pattern: "Câu tường thuật → giọng đi xuống ↘",
    patternEn: "Statements → falling tone ↘",
    examples: [
      "I live in Hanoi.",
      "She works at a bank downtown.",
      "We finished the project yesterday.",
    ],
    note: "Hạ giọng ở từ cuối nhấn (ví dụ: Hanoi, bank, yesterday).",
    noteEn: "Lower pitch on the last stressed word (e.g., Hanoi, bank, yesterday).",
  },
  {
    group: "falling",
    pattern: "Câu hỏi Wh- → giọng đi xuống ↘",
    patternEn: "Wh-questions → falling ↘",
    examples: [
      "Where do you live?",
      "What time does the meeting start?",
      "Why did you choose this course?",
    ],
    note: "Wh-questions kết thúc bằng giọng giảm - nghe tự tin, lịch sự.",
    noteEn: "Wh-questions end with a falling tone - sounds confident and polite.",
  },
  {
    group: "falling",
    pattern: "Câu mệnh lệnh → xuống dứt khoát ↘",
    patternEn: "Commands → firm falling ↘",
    examples: [
      "Close the door.",
      "Sit down, please.",
      "Don't touch that!",
    ],
    note: "Hạ giọng ngắn, gọn → quyết đoán.",
    noteEn: "Short, firm fall → decisive tone.",
  },
  {
    group: "falling",
    pattern: "Câu hỏi đuôi (chắc chắn) → xuống ↘",
    patternEn: "Tag question (sure) → falling ↘",
    examples: [
      "It's cold today, isn't it?",
      "You finished your homework, didn't you?",
      "That movie was great, wasn't it?",
    ],
    note: "Bạn đã chắc → hạ giọng phần đuôi (chỉ chờ xác nhận).",
    noteEn: "You're sure → fall on the tag (just seeking confirmation).",
  },

  // ===== RISING ↗ =====
  {
    group: "rising",
    pattern: "Câu hỏi Yes/No → giọng đi lên ↗",
    patternEn: "Yes/No questions → rising ↗",
    examples: [
      "Do you live in Hanoi?",
      "Are you coming to the party?",
      "Have you ever been to Japan?",
    ],
    note: "Lên giọng ở từ cuối - báo hiệu chờ câu trả lời yes/no.",
    noteEn: "Rise on the final word - signals you expect a yes/no answer.",
  },
  {
    group: "rising",
    pattern: "Câu hỏi đuôi (thật sự hỏi) → lên ↗",
    patternEn: "Tag question (real question) → rising ↗",
    examples: [
      "You're coming, aren't you?",
      "She speaks French, doesn't she?",
      "They left already, didn't they?",
    ],
    note: "Bạn không chắc → lên giọng đuôi (đang thật sự hỏi).",
    noteEn: "You're unsure → rise on the tag (genuinely asking).",
  },
  {
    group: "rising",
    pattern: "Câu chưa hoàn tất → lên ↗ (chờ tiếp)",
    patternEn: "Incomplete thought → rising ↗ (more to come)",
    examples: [
      "If I have time tomorrow, …",
      "When she arrives, …",
      "First, you boil the water, …",
    ],
    note: "Lên giọng ở mệnh đề phụ báo hiệu câu chưa kết thúc.",
    noteEn: "Rise on the subordinate clause signals the sentence isn't done.",
  },
  {
    group: "rising",
    pattern: "Yêu cầu lịch sự → lên nhẹ ↗",
    patternEn: "Polite requests → soft rising ↗",
    examples: [
      "Could you help me, please?",
      "Would you mind opening the window?",
      "Can I have a glass of water?",
    ],
    note: "Lên giọng mềm = lịch sự. Hạ giọng = giống ra lệnh.",
    noteEn: "Soft rise = polite. Falling = sounds like an order.",
  },

  // ===== MIXED (rise + fall) =====
  {
    group: "mixed",
    pattern: "Liệt kê → lên ↗ ↗ ↗ rồi xuống ↘",
    patternEn: "Lists → rise rise rise then fall",
    examples: [
      "I bought apples, oranges, bananas, and grapes.",
      "We need pens, paper, scissors, and glue.",
      "She speaks English, French, Spanish, and Italian.",
    ],
    note: "Mỗi mục lên, mục cuối xuống → báo hiệu danh sách kết thúc.",
    noteEn: "Rise on each item, fall on the last → signals the list is complete.",
  },
  {
    group: "mixed",
    pattern: "Lựa chọn (or) → lên ↗ rồi xuống ↘",
    patternEn: "Choice questions (or) → rise ↗ then fall ↘",
    examples: [
      "Would you like tea or coffee?",
      "Should we go on Saturday or Sunday?",
      "Do you prefer the red one or the blue one?",
    ],
    note: "Lên ở lựa chọn đầu, xuống ở lựa chọn cuối.",
    noteEn: "Rise on the first option, fall on the final option.",
  },

  // ===== STRESS / EMPHASIS =====
  {
    group: "stress",
    pattern: "Trọng âm tương phản → nhấn mạnh từ khoá",
    patternEn: "Contrastive stress → emphasize key word",
    examples: [
      "I didn't say SHE stole it (someone else did).",
      "I want the RED one, not the blue one.",
      "He said he'd call TODAY, not tomorrow.",
    ],
    note: "Nhấn mạnh từ in HOA đổi hoàn toàn nghĩa của câu.",
    noteEn: "Stressing the CAPITALIZED word completely changes the meaning.",
  },
  {
    group: "stress",
    pattern: "Câu cảm thán → xuống mạnh ↘↘",
    patternEn: "Exclamations → strong falling ↘↘",
    examples: [
      "What a beautiful day!",
      "How amazing!",
      "That's incredible!",
    ],
    note: "Xuống mạnh ở từ trọng tâm để diễn đạt cảm xúc.",
    noteEn: "Strong fall on the key word conveys emotion.",
  },

  // ===== SPECIAL =====
  {
    group: "special",
    pattern: "Echo / ngạc nhiên → lên cao ↗↗",
    patternEn: "Echo / surprise → high rising ↗↗",
    examples: [
      "You did WHAT?",
      "She's moving to Paris?!",
      "He said HOW much?",
    ],
    note: "Giọng vọt lên cao thể hiện sốc hoặc xác nhận lại.",
    noteEn: "Sharp high rise shows shock or asks for repetition.",
  },
  {
    group: "special",
    pattern: "Mỉa mai (Sarcasm) → ngữ điệu phẳng / kéo dài",
    patternEn: "Sarcasm → flat / stretched intonation",
    examples: [
      "Oh, great. Just what I needed.",
      "Wow, you're SO funny.",
      "Yeah, right. Like that's gonna happen.",
    ],
    note: "Giọng phẳng, kéo dài → mỉa mai chứ không khen.",
    noteEn: "Flat, drawn-out tone → sarcasm, not praise.",
  },
];

const INTONATION_GROUPS: { key: IntonationGroup; vi: string; en: string; emoji: string; color: string }[] = [
  { key: "falling", vi: "Nhóm Giọng Xuống ↘", en: "Falling Tone ↘", emoji: "📉", color: "from-rose-500/15 to-rose-500/5 border-rose-500/30" },
  { key: "rising", vi: "Nhóm Giọng Lên ↗", en: "Rising Tone ↗", emoji: "📈", color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30" },
  { key: "mixed", vi: "Nhóm Lên rồi Xuống ↗↘", en: "Mixed (Rise + Fall) ↗↘", emoji: "🎢", color: "from-amber-500/15 to-amber-500/5 border-amber-500/30" },
  { key: "stress", vi: "Nhóm Nhấn mạnh / Cảm xúc 💥", en: "Stress / Emphasis 💥", emoji: "💥", color: "from-purple-500/15 to-purple-500/5 border-purple-500/30" },
  { key: "special", vi: "Nhóm Đặc biệt 🎭", en: "Special Patterns 🎭", emoji: "🎭", color: "from-blue-500/15 to-blue-500/5 border-blue-500/30" },
];

// ===== Deep-dive intonation mini-lessons =====
interface IntonationLesson {
  title: string;
  titleEn: string;
  emoji: string;
  summary: string;
  summaryEn: string;
  body: string;
  bodyEn: string;
  examples: { text: string; note: string; noteEn: string }[];
}

const INTONATION_LESSONS: IntonationLesson[] = [
  {
    emoji: "🎚️",
    title: "Bài 1: Pitch Range (Khoảng cao độ)",
    titleEn: "Lesson 1: Pitch Range",
    summary: "Tiếng Anh dùng khoảng cao độ rộng hơn tiếng Việt nhiều. Người Việt nói tiếng Anh thường 'phẳng' vì giữ cao độ đều.",
    summaryEn: "English uses a much wider pitch range than Vietnamese. Vietnamese speakers often sound 'flat' because they keep an even pitch.",
    body: "Người bản xứ thường lên xuống cao độ khoảng 1.5-2 quãng tám trong cuộc trò chuyện bình thường. Tiếng Việt vốn có 6 thanh điệu nên người học hay sợ 'thay đổi cao độ' vì sợ đổi nghĩa - nhưng tiếng Anh là 'stress-timed' chứ không 'tone-timed', nên hãy MẠNH DẠN nhấn cao - thấp.",
    bodyEn: "Native speakers swing 1.5-2 octaves in normal conversation. Because Vietnamese has 6 tones, learners fear pitch changes (they alter meaning in Vietnamese) - but English is stress-timed, not tone-timed, so go BOLD with high-low contrasts.",
    examples: [
      { text: "I LOVE this song!", note: "Vọt cao 'LOVE' rồi giảm - không sợ 'lố'.", noteEn: "Spike high on 'LOVE' then drop - don't be shy." },
      { text: "Really? You did THAT?", note: "Cao trên 'THAT' để thể hiện ngạc nhiên thật.", noteEn: "Go high on 'THAT' to show genuine surprise." },
    ],
  },
  {
    emoji: "🧱",
    title: "Bài 2: Tone Units (Đơn vị ngữ điệu)",
    titleEn: "Lesson 2: Tone Units",
    summary: "Câu dài luôn được chia thành các 'tone units' (cụm ngữ điệu) ngắn, mỗi cụm có 1 trọng âm chính.",
    summaryEn: "Long sentences are always broken into short 'tone units', each with one main stress.",
    body: "Một tone unit = 1 hơi thở ngắn + 1 từ mang nucleus stress (trọng âm hạt nhân, thường là từ cuối nội dung). Việc chia tone units giúp người nghe 'tiêu hoá' thông tin. Quy tắc: ngắt sau cụm chủ ngữ dài, sau mệnh đề phụ, trước liên từ đối lập (but, although).",
    bodyEn: "A tone unit = one short breath + one word carrying nucleus stress (usually the last content word). Tone units help the listener digest info. Break: after long subjects, after subordinate clauses, before contrasts (but, although).",
    examples: [
      { text: "My older brother / who lives in Tokyo / is a software engineer.", note: "3 tone units, mỗi cụm 1 trọng âm chính.", noteEn: "3 tone units, one main stress each." },
      { text: "I wanted to come, / but I was too tired.", note: "Ngắt trước 'but' để nhấn đối lập.", noteEn: "Pause before 'but' to highlight contrast." },
    ],
  },
  {
    emoji: "💔",
    title: "Bài 3: Emotional Intonation (Ngữ điệu cảm xúc)",
    titleEn: "Lesson 3: Emotional Intonation",
    summary: "Cùng một câu 'I'm fine' có thể nghĩa là vui, mệt, giận, mỉa mai - tuỳ ngữ điệu.",
    summaryEn: "The same 'I'm fine' can mean happy, tired, angry, or sarcastic - depending on intonation.",
    body: "Vui: cao độ cao + lên cuối nhẹ. Mệt: cao độ thấp + kéo dài 'fine'. Giận: ngắn, gọn, hạ giọng mạnh. Mỉa mai: phẳng + kéo dài. Khi xem phim, hãy chú ý cao độ chứ không chỉ từ ngữ.",
    bodyEn: "Happy: high pitch + slight rise. Tired: low pitch + stretched 'fine'. Angry: short, sharp fall. Sarcastic: flat + drawn-out. When watching movies, focus on pitch - not just words.",
    examples: [
      { text: "I'm FINE.", note: "Vui: 'FINE' nhẹ, hơi lên.", noteEn: "Happy: light, slightly rising 'FINE'." },
      { text: "I'm fiiiine…", note: "Mệt/buồn: kéo dài, hạ giọng.", noteEn: "Tired/sad: stretched, falling." },
      { text: "I'm fine.", note: "Mỉa mai: ngắn, phẳng.", noteEn: "Sarcastic: short, flat." },
    ],
  },
  {
    emoji: "🎯",
    title: "Bài 4: Contrastive Stress (Trọng âm tương phản)",
    titleEn: "Lesson 4: Contrastive Stress",
    summary: "Việc nhấn mạnh từ nào trong câu sẽ thay đổi hoàn toàn ý người nói.",
    summaryEn: "Which word you stress completely changes what you mean.",
    body: "Câu 'I didn't say he stole the money' có 7 nghĩa khác nhau tuỳ vào từ được nhấn. Đây là một trong những công cụ giao tiếp mạnh nhất của tiếng Anh.",
    bodyEn: "'I didn't say he stole the money' has 7 different meanings depending on which word is stressed. One of English's most powerful communication tools.",
    examples: [
      { text: "I didn't SAY he stole it (I implied).", note: "Nhấn 'SAY' = ám chỉ thôi, không nói thẳng.", noteEn: "Stress 'SAY' = I only implied, didn't actually say." },
      { text: "I didn't say HE stole it (someone else did).", note: "Nhấn 'HE' = không phải anh ta, là người khác.", noteEn: "Stress 'HE' = it was someone else." },
      { text: "I didn't say he STOLE it (he just borrowed).", note: "Nhấn 'STOLE' = không phải trộm, có thể mượn.", noteEn: "Stress 'STOLE' = maybe just borrowed." },
      { text: "I didn't say he stole the MONEY (he stole something else).", note: "Nhấn 'MONEY' = không phải tiền, là vật khác.", noteEn: "Stress 'MONEY' = he stole something else." },
    ],
  },
  {
    emoji: "🤝",
    title: "Bài 5: Politeness through Intonation (Lịch sự qua ngữ điệu)",
    titleEn: "Lesson 5: Politeness through Intonation",
    summary: "Cùng một câu 'Can you help me?' nghe lịch sự hay khó chịu phụ thuộc gần như hoàn toàn vào intonation.",
    summaryEn: "Whether 'Can you help me?' sounds polite or rude depends almost entirely on intonation.",
    body: "Quy tắc vàng: lịch sự = ngữ điệu lên cuối + cao độ vừa phải. Mệnh lệnh = ngữ điệu xuống dứt khoát. Khi không chắc, hãy 'lên giọng' nhẹ ở cuối câu yêu cầu - người nghe sẽ cảm thấy bạn tôn trọng họ. Đây là lý do người Việt hay bị nhận xét 'sounds aggressive' dù dùng từ lịch sự.",
    bodyEn: "Golden rule: politeness = rising end + moderate pitch. Commands = decisive falling. When in doubt, gently rise at the end of requests - listeners feel respected. This is why Vietnamese speakers are often perceived as 'aggressive' despite using polite words.",
    examples: [
      { text: "Could you pass the salt? ↗", note: "Lên giọng cuối = mời, không ép.", noteEn: "Rising end = invite, not demand." },
      { text: "Pass the salt. ↘", note: "Hạ giọng dứt = mệnh lệnh (kém lịch sự).", noteEn: "Hard fall = command (less polite)." },
      { text: "I'm sorry, but ↗ I have to leave now ↘.", note: "Lên ở 'but' để mềm hoá, xuống ở 'now' để dứt khoát.", noteEn: "Rise on 'but' softens; fall on 'now' decides." },
    ],
  },
  {
    emoji: "🎭",
    title: "Bài 6: Sarcasm & Irony (Mỉa mai & Châm biếm)",
    titleEn: "Lesson 6: Sarcasm & Irony",
    summary: "Mỉa mai là 'ngôn ngữ thứ 2' của người bản xứ. Hiểu được = nghe được sitcom Mỹ thực thụ.",
    summaryEn: "Sarcasm is native speakers' 'second language'. Catching it = truly understanding American sitcoms.",
    body: "Đặc điểm intonation mỉa mai: (1) Cao độ phẳng bất thường, (2) Kéo dài nguyên âm trọng tâm, (3) Hạ giọng cuối câu không tự nhiên, (4) Đôi khi nhấn quá mạnh từ tích cực. Khi nghe người bản xứ, hãy luôn tự hỏi 'họ đang nói thật hay mỉa?'.",
    bodyEn: "Sarcastic intonation features: (1) Unnaturally flat pitch, (2) Stretched stressed vowel, (3) Awkward sentence-final fall, (4) Sometimes over-stressed positive words. Always ask: 'are they being literal or sarcastic?'",
    examples: [
      { text: "Oh, FANtastic. Another Monday.", note: "Kéo dài 'FAN' + giọng phẳng = chán nản.", noteEn: "Stretched 'FAN' + flat = annoyed." },
      { text: "Yeah, RIGHT.", note: "'RIGHT' nhấn mạnh + xuống = không tin chút nào.", noteEn: "Stressed 'RIGHT' + fall = total disbelief." },
      { text: "Wow, that's just GREAT.", note: "Nói chậm + phẳng = thực ra đang khó chịu.", noteEn: "Slow + flat = actually annoyed." },
    ],
  },
  {
    emoji: "📻",
    title: "Bài 7: News Anchor Intonation (Ngữ điệu phát thanh viên)",
    titleEn: "Lesson 7: News Anchor Intonation",
    summary: "Phát thanh viên dùng pattern intonation đặc biệt: rõ ràng, có nhịp, dễ theo dõi - rất tốt để bắt chước (shadowing).",
    summaryEn: "News anchors use a distinct intonation pattern: clear, rhythmic, easy to follow - perfect for shadowing.",
    body: "Pattern: lên ở giữa câu (giữ sự chú ý), giảm dần đều ở cuối, ngắt rõ giữa các tone units. Luyện tập: chọn 1 câu của BBC/CNN, nghe 3 lần, nói theo CHÍNH XÁC ngữ điệu, ghi âm so sánh. Đây là kỹ thuật shadowing kinh điển.",
    bodyEn: "Pattern: rise mid-sentence (hold attention), gradual fall at the end, clear pauses between tone units. Practice: pick a BBC/CNN sentence, listen 3 times, mimic intonation EXACTLY, record and compare. Classic shadowing technique.",
    examples: [
      { text: "The president / announced today / a new economic plan.", note: "3 cụm rõ rệt, giảm dần đều.", noteEn: "3 clear units with gradual fall." },
      { text: "Breaking news from Tokyo: / a major earthquake / has struck the region.", note: "Lên 'Tokyo', giữ năng lượng, hạ ở 'region'.", noteEn: "Rise on 'Tokyo', sustain energy, fall on 'region'." },
    ],
  },
  {
    emoji: "🎙️",
    title: "Bài 8: Storytelling Intonation (Ngữ điệu kể chuyện)",
    titleEn: "Lesson 8: Storytelling Intonation",
    summary: "Khi kể chuyện, người bản xứ dùng intonation để giữ người nghe cuốn theo - lên - xuống bất ngờ tạo kịch tính.",
    summaryEn: "When telling stories, natives use intonation to keep listeners hooked - sudden rises and falls create drama.",
    body: "Quy tắc: (1) Khởi đầu bình thường để 'set scene', (2) Tăng tốc + cao độ lên ở phần cao trào, (3) Giảm hẳn cao độ + nói chậm ở câu kết để tạo punchline. Luyện qua TED Talks - các speaker giỏi nhất đều bậc thầy intonation kể chuyện.",
    bodyEn: "Rules: (1) Normal pace to set scene, (2) Speed up + high pitch at climax, (3) Drop pitch + slow down for the punchline. Practice with TED Talks - the best speakers are masters of storytelling intonation.",
    examples: [
      { text: "So I was walking home… and suddenly… I saw something INCREDIBLE.", note: "Bình thường → chậm lại → vọt cao 'INCREDIBLE'.", noteEn: "Normal → slow → spike on 'INCREDIBLE'." },
      { text: "And you know what happened next? … Nothing. Absolutely nothing.", note: "Pause kịch tính rồi hạ giọng phẳng = punchline.", noteEn: "Dramatic pause then flat fall = punchline." },
    ],
  },
];

interface LinkingItem {
  type: string;
  typeEn: string;
  example: string;
  ipa: string;
  rule: string;
  ruleEn: string;
}
const LINKING: LinkingItem[] = [
  {
    type: "Phụ âm + Nguyên âm (nối liền)",
    typeEn: "Consonant → Vowel (linking)",
    example: "an apple",
    ipa: "/ə‿nˈæp.l̩/",
    rule: "Phụ âm cuối từ chạy sang nguyên âm đầu từ kế tiếp.",
    ruleEn: "Move final consonant onto next initial vowel.",
  },
  {
    type: "Nguyên âm + Nguyên âm + /j/ /w/",
    typeEn: "Vowel → Vowel insert /j/ or /w/",
    example: "go on, see it",
    ipa: "/ɡoʊwɒn/, /siːjɪt/",
    rule: "Chèn /j/ sau i,e; /w/ sau u,o.",
    ruleEn: "Insert /j/ after i,e; /w/ after u,o.",
  },
  {
    type: "Nuốt âm /t/ /d/ (Elision)",
    typeEn: "Elision of /t/ /d/",
    example: "next day → 'nex day'",
    ipa: "/neks deɪ/",
    rule: "Bỏ /t/ /d/ giữa hai phụ âm để nói nhanh hơn.",
    ruleEn: "Drop /t/ /d/ between consonants for fluency.",
  },
  {
    type: "Đồng hóa (Assimilation)",
    typeEn: "Assimilation",
    example: "good boy → 'goob boy'",
    ipa: "/ɡʊb bɔɪ/",
    rule: "/d/ biến thành /b/ vì âm sau là /b/.",
    ruleEn: "/d/ becomes /b/ before /b/.",
  },
  {
    type: "Catenation /t/ + you = /tʃ/",
    typeEn: "/t/ + you → /tʃu/",
    example: "What you want? → /wʌtʃu wɒnt/",
    ipa: "/wʌtʃu/",
    rule: "/t/ + /j/ thường nối thành /tʃ/.",
    ruleEn: "/t/ + /j/ blends into /tʃ/.",
  },
  {
    type: "Catenation /d/ + you = /dʒ/",
    typeEn: "/d/ + you → /dʒu/",
    example: "Did you eat? → /dɪdʒu iːt/",
    ipa: "/dɪdʒu/",
    rule: "/d/ + /j/ thường nối thành /dʒ/.",
    ruleEn: "/d/ + /j/ blends into /dʒ/.",
  },
  {
    type: "Phụ âm + Nguyên âm (linking)",
    typeEn: "Consonant → Vowel (linking)",
    example: "turn it off",
    ipa: "/tɜː.nɪ.tɒf/",
    rule: "Nối /n/→/ɪ/ và /t/→/ɒ/, đọc liền như một từ.",
    ruleEn: "Link /n/→/ɪ/ and /t/→/ɒ/, sounds like one word.",
  },
  {
    type: "Phụ âm + Nguyên âm (linking)",
    typeEn: "Consonant → Vowel (linking)",
    example: "pick it up",
    ipa: "/pɪ.kɪ.tʌp/",
    rule: "/k/→/ɪ/ và /t/→/ʌ/ nối liền nhau.",
    ruleEn: "/k/→/ɪ/ and /t/→/ʌ/ flow together.",
  },
  {
    type: "Nguyên âm + Nguyên âm chèn /w/",
    typeEn: "Vowel → Vowel insert /w/",
    example: "do it",
    ipa: "/duː.wɪt/",
    rule: "Sau /uː/ /oʊ/ chèn /w/ trước nguyên âm sau.",
    ruleEn: "After /uː/ /oʊ/ insert /w/ before next vowel.",
  },
  {
    type: "Nguyên âm + Nguyên âm chèn /j/",
    typeEn: "Vowel → Vowel insert /j/",
    example: "I am",
    ipa: "/aɪ.jæm/",
    rule: "Sau /iː/ /aɪ/ chèn /j/ trước nguyên âm sau.",
    ruleEn: "After /iː/ /aɪ/ insert /j/ before next vowel.",
  },
  {
    type: "Nuốt /h/ (h-dropping)",
    typeEn: "Elision of /h/",
    example: "tell him → 'tell im'",
    ipa: "/tel ɪm/",
    rule: "Pronoun không nhấn (him/her/his) thường mất /h/.",
    ruleEn: "Unstressed pronouns (him/her/his) often drop /h/.",
  },
  {
    type: "Đồng hóa /n/ → /m/",
    typeEn: "Assimilation /n/ → /m/",
    example: "in Paris",
    ipa: "/ɪm ˈpærɪs/",
    rule: "/n/ thành /m/ trước /p/ /b/ /m/.",
    ruleEn: "/n/ becomes /m/ before /p/ /b/ /m/.",
  },
  {
    type: "Đồng hóa /t/ → /p/",
    typeEn: "Assimilation /t/ → /p/",
    example: "that boy → 'thap boy'",
    ipa: "/ðæp bɔɪ/",
    rule: "/t/ thường thành /p/ trước âm môi /b/ /p/ /m/.",
    ruleEn: "/t/ shifts to /p/ before bilabial /b/ /p/ /m/.",
  },
  {
    type: "Lặp phụ âm (geminate)",
    typeEn: "Same consonant (hold once)",
    example: "big game",
    ipa: "/bɪɡː eɪm/",
    rule: "Hai phụ âm giống nhau: giữ một lần, không lặp.",
    ruleEn: "Same consonants meet: hold once, do not repeat.",
  },
  {
    type: "Flap T (Mỹ)",
    typeEn: "Flap T (American)",
    example: "water → 'wadder'",
    ipa: "/ˈwɔː.ɾɚ/",
    rule: "/t/ giữa hai nguyên âm thành flap nhẹ /ɾ/ (US).",
    ruleEn: "/t/ between vowels becomes flap /ɾ/ in US English.",
  },
  {
    type: "Catenation /s/ + you = /ʃ/",
    typeEn: "/s/ + you → /ʃu/",
    example: "miss you → /mɪʃu/",
    ipa: "/mɪʃu/",
    rule: "/s/ + /j/ trộn thành /ʃ/ trong câu nói nhanh.",
    ruleEn: "/s/ + /j/ merges into /ʃ/ in fast speech.",
  },
  {
    type: "Catenation /z/ + you = /ʒ/",
    typeEn: "/z/ + you → /ʒu/",
    example: "as you wish → /əʒu wɪʃ/",
    ipa: "/əʒu/",
    rule: "/z/ + /j/ trộn thành /ʒ/.",
    ruleEn: "/z/ + /j/ merges into /ʒ/.",
  },
  {
    type: "Liên kết R (linking R)",
    typeEn: "Linking R (British)",
    example: "far away → /fɑːr əˈweɪ/",
    ipa: "/fɑːr əˈweɪ/",
    rule: "Anh-Anh: /r/ cuối được phát âm khi sau là nguyên âm.",
    ruleEn: "In British English, silent final /r/ resurfaces before a vowel.",
  },
];

interface WeakForm {
  word: string;
  strong: string;
  weak: string;
  example: string;
}
const WEAK_FORMS: WeakForm[] = [
  { word: "and", strong: "/ænd/", weak: "/ənd/ or /n̩/", example: "fish and chips → 'fish 'n chips'" },
  { word: "to", strong: "/tuː/", weak: "/tə/", example: "I want to go → /aɪ wɒnt tə ɡoʊ/" },
  { word: "of", strong: "/ɒv/", weak: "/əv/", example: "a cup of tea → /ə kʌp əv tiː/" },
  { word: "for", strong: "/fɔːr/", weak: "/fər/", example: "for me → /fər miː/" },
  { word: "can", strong: "/kæn/", weak: "/kən/", example: "I can swim → /aɪ kən swɪm/" },
  { word: "have", strong: "/hæv/", weak: "/həv/ or /əv/", example: "could have → /kʊd əv/ ('coulda')" },
  { word: "are", strong: "/ɑːr/", weak: "/ər/", example: "you are right → /jʊ ər raɪt/" },
  { word: "the", strong: "/ðiː/", weak: "/ðə/", example: "the book → /ðə bʊk/" },
  { word: "a / an", strong: "/eɪ/ /æn/", weak: "/ə/ /ən/", example: "a cat and an egg → /ə kæt ən ən eɡ/" },
  { word: "was", strong: "/wɒz/", weak: "/wəz/", example: "she was here → /ʃi wəz hɪər/" },
  { word: "were", strong: "/wɜːr/", weak: "/wər/", example: "they were late → /ðeɪ wər leɪt/" },
  { word: "do", strong: "/duː/", weak: "/də/", example: "do you know? → /də ju noʊ/" },
  { word: "does", strong: "/dʌz/", weak: "/dəz/", example: "what does it mean? → /wʌt dəz ɪt miːn/" },
  { word: "has", strong: "/hæz/", weak: "/həz/ or /əz/", example: "she has gone → /ʃi əz ɡɒn/" },
  { word: "had", strong: "/hæd/", weak: "/həd/ or /əd/", example: "I had seen → /aɪ əd siːn/" },
  { word: "shall", strong: "/ʃæl/", weak: "/ʃəl/", example: "we shall go → /wi ʃəl ɡoʊ/" },
  { word: "should", strong: "/ʃʊd/", weak: "/ʃəd/", example: "you should try → /ju ʃəd traɪ/" },
  { word: "would", strong: "/wʊd/", weak: "/wəd/ or /əd/", example: "I would love to → /aɪ əd lʌv tə/" },
  { word: "must", strong: "/mʌst/", weak: "/məst/", example: "you must come → /ju məst kʌm/" },
  { word: "but", strong: "/bʌt/", weak: "/bət/", example: "small but strong → /smɔːl bət strɒŋ/" },
  { word: "than", strong: "/ðæn/", weak: "/ðən/", example: "better than this → /ˈbetər ðən ðɪs/" },
  { word: "as", strong: "/æz/", weak: "/əz/", example: "as soon as → /əz suːn əz/" },
  { word: "at", strong: "/æt/", weak: "/ət/", example: "look at me → /lʊk ət miː/" },
  { word: "from", strong: "/frɒm/", weak: "/frəm/", example: "from school → /frəm skuːl/" },
  { word: "some", strong: "/sʌm/", weak: "/səm/", example: "some milk → /səm mɪlk/" },
  { word: "him / her", strong: "/hɪm/ /hɜːr/", weak: "/ɪm/ /ər/", example: "tell him → /tel ɪm/" },
  { word: "them", strong: "/ðem/", weak: "/ðəm/ or /əm/", example: "give them this → /ɡɪv əm ðɪs/" },
  { word: "you", strong: "/juː/", weak: "/jə/", example: "see you later → /si jə ˈleɪtər/" },
  { word: "your", strong: "/jɔːr/", weak: "/jər/", example: "your turn → /jər tɜːn/" },
];

interface AccentRow {
  feature: string;
  featureEn: string;
  uk: string;
  us: string;
  example: string;
}
const ACCENT_TABLE: AccentRow[] = [
  {
    feature: "Âm /r/ ở cuối",
    featureEn: "Rhotic /r/",
    uk: "Không phát âm (non-rhotic)",
    us: "Có phát âm rõ (rhotic)",
    example: "car, hard, mother",
  },
  {
    feature: "Âm /æ/ vs /ɑː/",
    featureEn: "/æ/ vs /ɑː/",
    uk: "/ɑː/ - dài, mở (UK)",
    us: "/æ/ - bẹt, ngắn (US)",
    example: "dance, can't, after",
  },
  {
    feature: "Âm /t/ giữa từ",
    featureEn: "Intervocalic /t/",
    uk: "/t/ rõ - 'water'",
    us: "/d/ flap - 'wader'",
    example: "water, butter, better, city",
  },
  {
    feature: "Âm /ɒ/ vs /ɑː/",
    featureEn: "Hot vowel",
    uk: "/ɒ/ - tròn ngắn",
    us: "/ɑː/ - dài mở",
    example: "hot, lot, dog, bottle",
  },
  {
    feature: "Trọng âm từ Latin",
    featureEn: "Stress shift",
    uk: "ad-VER-tise-ment",
    us: "AD-ver-tise-ment",
    example: "advertisement, garage, ballet",
  },
  {
    feature: "Schedule",
    featureEn: "Schedule",
    uk: "/ˈʃedjuːl/ ('shed-yool')",
    us: "/ˈskedʒuːl/ ('sked-jool')",
    example: "schedule",
  },
  {
    feature: "Either / Neither",
    featureEn: "Either / Neither",
    uk: "/ˈaɪðə/",
    us: "/ˈiːðər/",
    example: "either, neither",
  },
  {
    feature: "Tomato",
    featureEn: "Tomato",
    uk: "/təˈmɑːtəʊ/",
    us: "/təˈmeɪtoʊ/",
    example: "tomato, potato",
  },
];

/* -------------------------------------------------------------------------- */
/*  Quiz                                                                      */
/* -------------------------------------------------------------------------- */

interface QuizQ {
  question: string;
  questionEn: string;
  audio: { text: string; accent: Accent };
  options: string[];
  answer: number;
  explain: string;
  explainEn: string;
}

const QUIZ: QuizQ[] = [
  {
    question: "Bạn nghe được từ nào?",
    questionEn: "Which word do you hear?",
    audio: { text: "ship", accent: "en-US" },
    options: ["sheep", "ship", "shape"],
    answer: 1,
    explain: "/ɪ/ ngắn (ship) khác /iː/ dài (sheep).",
    explainEn: "Short /ɪ/ vs long /iː/.",
  },
  {
    question: "Câu này dùng intonation gì?",
    questionEn: "Which intonation is used?",
    audio: { text: "Do you live in Hanoi?", accent: "en-US" },
    options: ["Falling ↘", "Rising ↗", "Flat →"],
    answer: 1,
    explain: "Yes/No questions thường lên giọng cuối câu.",
    explainEn: "Yes/No questions rise at the end.",
  },
  {
    question: "Cụm 'Did you eat?' nối thành âm gì?",
    questionEn: "What linking sound forms in 'Did you eat?'",
    audio: { text: "Did you eat?", accent: "en-US" },
    options: ["/dʒu/", "/tju/", "/diju/"],
    answer: 0,
    explain: "/d/ + /j/ → /dʒ/ (catenation).",
    explainEn: "/d/ + /j/ catenates to /dʒ/.",
  },
  {
    question: "Đây là giọng nào?",
    questionEn: "Which accent is this?",
    audio: { text: "Water in the bottle.", accent: "en-US" },
    options: ["British (UK)", "American (US)"],
    answer: 1,
    explain: "Mỹ phát âm 'water' với /t/ flap thành /d/ → 'wader'.",
    explainEn: "American flapping turns /t/ into /d/.",
  },
  {
    question: "Đây là giọng nào?",
    questionEn: "Which accent is this?",
    audio: { text: "Park the car in the yard.", accent: "en-GB" },
    options: ["British (UK)", "American (US)"],
    answer: 0,
    explain: "Anh-Anh non-rhotic: /r/ cuối từ không phát âm.",
    explainEn: "British is non-rhotic: final /r/ is dropped.",
  },
  {
    question: "Schwa /ə/ xuất hiện ở từ nào?",
    questionEn: "Where is the schwa?",
    audio: { text: "banana", accent: "en-US" },
    options: ["âm thứ 1", "âm thứ 2", "âm thứ 1 và 3"],
    answer: 2,
    explain: "ba-NA-na: âm 1 và 3 là /ə/, âm 2 nhấn /næ/.",
    explainEn: "ba-NA-na: syllables 1 & 3 reduce to /ə/.",
  },
  {
    question: "Nghe thấy từ nào (minimal pair)?",
    questionEn: "Which word do you hear?",
    audio: { text: "think", accent: "en-US" },
    options: ["sink", "think", "thing"],
    answer: 1,
    explain: "/θ/ - đặt lưỡi giữa hai răng, không phải /s/.",
    explainEn: "/θ/ - tongue between teeth, not /s/.",
  },
  {
    question: "'I want to go' - từ 'to' đọc như thế nào?",
    questionEn: "How is 'to' pronounced in connected speech?",
    audio: { text: "I want to go", accent: "en-US" },
    options: ["/tuː/ (strong)", "/tə/ (weak)"],
    answer: 1,
    explain: "Trong câu nói tự nhiên, 'to' giảm thành /tə/.",
    explainEn: "In natural speech, 'to' reduces to /tə/.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  </div>
);

const PlayBtn = ({
  text,
  accent = "en-US",
  small,
}: {
  text: string;
  accent?: Accent;
  small?: boolean;
}) => (
  <button
    onClick={() => speak(text, accent, 0.9)}
    className={`inline-flex items-center gap-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium ${
      small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
    }`}
    aria-label={`Play ${text}`}
  >
    <Volume2 className={small ? "w-3 h-3" : "w-4 h-4"} />
    {accent === "en-GB" ? "🇬🇧" : "🇺🇸"}
  </button>
);

/**
 * SpeakCheck - live mic-recognition button that grades pronunciation.
 * Uses Web Speech API (free, no key). Strips punctuation + lowercases on both
 * sides, then computes word-level overlap percentage as a simple accuracy score.
 */
const normalize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const scorePronunciation = (target: string, heard: string): number => {
  const t = normalize(target).split(" ").filter(Boolean);
  const h = normalize(heard).split(" ").filter(Boolean);
  if (t.length === 0) return 0;
  const heardSet = new Map<string, number>();
  h.forEach((w) => heardSet.set(w, (heardSet.get(w) ?? 0) + 1));
  let matched = 0;
  for (const w of t) {
    const n = heardSet.get(w) ?? 0;
    if (n > 0) {
      matched++;
      heardSet.set(w, n - 1);
    }
  }
  return Math.round((matched / t.length) * 100);
};

const SpeakCheck = ({
  target,
  small,
  accent = "en-US",
}: {
  target: string;
  small?: boolean;
  accent?: Accent;
}) => {
  const [listening, setListening] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [heard, setHeard] = useState<string>("");
  const recRef = useRef<any>(null);

  const start = useCallback(() => {
    const W = window as any;
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) {
      toast.error("Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome/Edge.");
      return;
    }
    try {
      const rec = new SR();
      rec.lang = accent;
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      rec.continuous = false;
      recRef.current = rec;
      setScore(null);
      setHeard("");
      setListening(true);
      rec.onresult = (e: any) => {
        let best = "";
        let bestScore = -1;
        for (let i = 0; i < e.results[0].length; i++) {
          const alt = e.results[0][i].transcript as string;
          const s = scorePronunciation(target, alt);
          if (s > bestScore) {
            bestScore = s;
            best = alt;
          }
        }
        setHeard(best);
        setScore(bestScore);
        if (bestScore >= 85) toast.success(`Xuất sắc! ${bestScore}/100`);
        else if (bestScore >= 60) toast.message(`Khá tốt - ${bestScore}/100`);
        else toast.error(`Cần luyện thêm - ${bestScore}/100`);
      };
      rec.onerror = (e: any) => {
        setListening(false);
        if (e.error === "not-allowed") toast.error("Hãy cấp quyền micro");
        else if (e.error !== "no-speech") toast.error("Lỗi: " + e.error);
      };
      rec.onend = () => setListening(false);
      rec.start();
    } catch (err) {
      setListening(false);
      toast.error("Không khởi động được mic");
    }
  }, [target, accent]);

  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch {}
    setListening(false);
  }, []);

  const color =
    score === null ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20"
      : score >= 85 ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
      : score >= 60 ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
      : "bg-rose-500/20 text-rose-700 dark:text-rose-300";

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        onClick={listening ? stop : start}
        className={`inline-flex items-center gap-1.5 rounded-lg transition-colors font-medium border border-current/20 ${color} ${
          small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
        }`}
        aria-label="Speak and check pronunciation"
      >
        {listening ? <Loader2 className={`${small ? "w-3 h-3" : "w-4 h-4"} animate-spin`} /> : <Mic className={small ? "w-3 h-3" : "w-4 h-4"} />}
        {listening ? "Đang nghe..." : score !== null ? `${score}/100` : "Speak"}
      </button>
      {heard && score !== null && (
        <span className="text-[10px] text-muted-foreground italic max-w-[220px] truncate" title={heard}>
          "{heard}"
        </span>
      )}
    </div>
  );
};

const EnglishPronunciation = () => {
  const { t } = useLanguage();

  // IPA chart active category
  const [ipaGroup, setIpaGroup] = useState<"vowels" | "diphthongs" | "consonants">("vowels");

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const startedRef = useRef(false);

  const currentQ = QUIZ[quizIdx];

  useEffect(() => {
    // Prime voices on first interaction
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  }, []);

  const handleAnswer = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === currentQ.answer) {
      setScore((s) => s + 1);
      toast.success(t("Chính xác!", "Correct!"));
    } else {
      toast.error(t("Chưa đúng", "Not quite"));
    }
  };

  const nextQ = () => {
    if (quizIdx + 1 >= QUIZ.length) {
      setFinished(true);
      return;
    }
    setQuizIdx((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  };

  const PRACTICE_SENTENCES = useMemo(
    () => [
      {
        text: "Could you tell me the way to the station?",
        focus: t("Câu hỏi lịch sự - giọng lên cuối", "Polite question - rising end"),
      },
      {
        text: "I'd like a cup of coffee, please.",
        focus: t("Weak form 'of' = /əv/, 'a' = /ə/", "Weak forms 'of' = /əv/, 'a' = /ə/"),
      },
      {
        text: "What are you doing this weekend?",
        focus: t("'What are you' nối thành 'wadaya'", "'What are you' links to 'wadaya'"),
      },
      {
        text: "She sells seashells by the seashore.",
        focus: t("Luyện /s/ vs /ʃ/", "Practice /s/ vs /ʃ/"),
      },
      {
        text: "Three thirsty thieves thanked the king.",
        focus: t("Luyện /θ/ - lưỡi giữa hai răng", "/θ/ practice - tongue between teeth"),
      },
      {
        text: "How much wood would a woodchuck chuck?",
        focus: t("Luyện /w/ và nối âm tự nhiên", "/w/ and natural linking"),
      },
    ],
    [t],
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t(
          "Pronunciation & Intonation - Phát âm chuẩn tiếng Anh | HaiEduTech",
          "Pronunciation & Intonation - Master Standard English | HaiEduTech",
        )}
        description={t(
          "Học bảng IPA, intonation, nối âm, weak forms, và phân biệt giọng Anh-Anh vs Anh-Mỹ với bài tập tương tác có audio.",
          "Master IPA, intonation, linking, weak forms, and contrast British vs American English with interactive audio exercises.",
        )}
        path="/english/pronunciation"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-primary to-emerald-500 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white/15 blur-3xl" />
        <FloatingEnglishParticles count={24} />
        <div className="container mx-auto px-4 py-14 relative">

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
              <Mic2 className="w-4 h-4" />
              {t("Nền tảng Anh ngữ • Phát âm", "English Foundation • Pronunciation")}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              {t(
                "Pronunciation & Intonation",
                "Pronunciation & Intonation",
              )}
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl">
              {t(
                "Làm chủ phát âm IPA, ngữ điệu, nối âm, luyến láy và phân biệt rõ ràng giữa Anh-Anh (British) và Anh-Mỹ (American). Mỗi ví dụ đều có nút phát âm 🇬🇧 / 🇺🇸.",
                "Master IPA, intonation, linking, connected speech, and clearly distinguish British vs American English. Every example has 🇬🇧 / 🇺🇸 audio buttons.",
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "🔊", label: t("Audio chuẩn 2 giọng", "Native UK + US audio") },
                { icon: "📖", label: t("Bảng IPA đầy đủ", "Complete IPA chart") },
                { icon: "🎯", label: t("Quiz tương tác", "Interactive quiz") },
                { icon: "🇬🇧", label: t("So sánh UK vs US", "UK vs US comparison") },
              ].map((c) => (
                <span
                  key={c.label}
                  className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs sm:text-sm"
                >
                  {c.icon} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-10">
        <Tabs defaultValue="ipa" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-secondary/60 p-2 rounded-xl mb-8 justify-start">
            <TabsTrigger value="ipa" className="gap-2"><Layers3 className="w-4 h-4" />{t("Bảng IPA", "IPA Chart")}</TabsTrigger>
            <TabsTrigger value="minpairs" className="gap-2"><Headphones className="w-4 h-4" />{t("Cặp tối thiểu", "Minimal Pairs")}</TabsTrigger>
            <TabsTrigger value="intonation" className="gap-2"><Music2 className="w-4 h-4" />{t("Ngữ điệu", "Intonation")}</TabsTrigger>
            <TabsTrigger value="linking" className="gap-2"><Waves className="w-4 h-4" />{t("Nối âm & Luyến láy", "Linking & Connected")}</TabsTrigger>
            <TabsTrigger value="weak" className="gap-2"><AudioLines className="w-4 h-4" />{t("Weak Forms", "Weak Forms")}</TabsTrigger>
            <TabsTrigger value="ukus" className="gap-2"><Flag className="w-4 h-4" />{t("Anh-Anh vs Anh-Mỹ", "British vs American")}</TabsTrigger>
            <TabsTrigger value="vnmistakes" className="gap-2"><AlertTriangle className="w-4 h-4" />{t("Lỗi VN hay sai", "Common VN Mistakes")}</TabsTrigger>
            <TabsTrigger value="practice" className="gap-2"><GraduationCap className="w-4 h-4" />{t("Luyện câu", "Sentence Drill")}</TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2"><Trophy className="w-4 h-4" />{t("Quiz nghe", "Listening Quiz")}</TabsTrigger>
          </TabsList>

          {/* ============== IPA chart ============== */}
          <TabsContent value="ipa" className="space-y-6">
            <SectionHeader
              icon={Layers3}
              title={t("Bảng phiên âm IPA", "IPA Phoneme Chart")}
              subtitle={t(
                "44 âm vị tiếng Anh: 12 nguyên âm đơn, 8 nguyên âm đôi và 24 phụ âm. Bấm 🔊 để nghe đọc cả 3 từ ví dụ mượt mà; bấm 🎤 Speak để máy chấm phát âm của bạn.",
                "44 English phonemes: 12 monophthongs, 8 diphthongs, and 24 consonants. Tap 🔊 to hear all 3 example words smoothly; tap 🎤 Speak for instant pronunciation scoring.",
              )}
            />
            {/* Horizontal category selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "vowels" as const, label: t("Nguyên âm đơn", "Monophthongs"), count: VOWELS.length, color: "amber" },
                { key: "diphthongs" as const, label: t("Nguyên âm đôi", "Diphthongs"), count: DIPHTHONGS.length, color: "fuchsia" },
                { key: "consonants" as const, label: t("Phụ âm", "Consonants"), count: CONSONANTS.length, color: "sky" },
              ].map((g) => {
                const active = ipaGroup === g.key;
                const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
                  amber: { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-700 dark:text-amber-300", ring: "ring-amber-500/30" },
                  fuchsia: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/40", text: "text-fuchsia-700 dark:text-fuchsia-300", ring: "ring-fuchsia-500/30" },
                  sky: { bg: "bg-sky-500/10", border: "border-sky-500/40", text: "text-sky-700 dark:text-sky-300", ring: "ring-sky-500/30" },
                };
                const c = colorMap[g.color];
                return (
                  <button
                    key={g.key}
                    onClick={() => setIpaGroup(g.key)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-semibold text-sm transition-all ${
                      active ? `${c.bg} ${c.border} ${c.text} ring-2 ${c.ring} shadow-sm` : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {g.label}
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-background/70" : "bg-secondary"}`}>
                      {g.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active category phonemes in compact grid */}
            {(() => {
              const group =
                ipaGroup === "vowels"
                  ? { rows: VOWELS, color: "from-amber-500/10 to-amber-500/5", border: "border-amber-500/25" }
                  : ipaGroup === "diphthongs"
                    ? { rows: DIPHTHONGS, color: "from-fuchsia-500/10 to-fuchsia-500/5", border: "border-fuchsia-500/25" }
                    : { rows: CONSONANTS, color: "from-sky-500/10 to-sky-500/5", border: "border-sky-500/25" };
              return (
                <div className={`rounded-2xl border-2 ${group.border} bg-gradient-to-br ${group.color} p-4 shadow-sm`}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.rows.map((row) => {
                      const firstWord = row.example.split(",")[0].replace(/\(.+?\)/g, "").trim();
                      return (
                        <div key={row.ipa} className="bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap min-w-0">
                              <span className="font-mono font-bold text-primary text-lg leading-none">{row.ipa}</span>
                              <span className="text-sm text-foreground font-medium">{row.example}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => speakExamples(row.example, "en-US")}
                                className="inline-flex items-center gap-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium px-2 py-1 text-xs"
                                aria-label={`Play all examples: ${row.example}`}
                                title={t("Nghe cả 3 từ ví dụ", "Play all 3 examples")}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                🇺🇸
                              </button>
                              <SpeakCheck target={firstWord} small />
                            </div>
                          </div>
                          <p className="text-[13px] leading-relaxed text-foreground/80">
                            <span className="font-semibold text-foreground">💡 {t(row.tip, row.tipEn)}</span>
                          </p>
                          <p className="text-xs leading-relaxed text-muted-foreground mt-1">
                            {t(row.vi, row.tipEn)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </TabsContent>


          {/* ============== Minimal pairs ============== */}
          <TabsContent value="minpairs" className="space-y-6">
            <SectionHeader
              icon={Headphones}
              title={t("Cặp âm tối thiểu (Minimal Pairs)", "Minimal Pairs")}
              subtitle={t(
                "Hai từ chỉ khác nhau 1 âm - luyện phân biệt là chìa khóa nói chuẩn.",
                "Two words differing by one sound - discriminating them is key.",
              )}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MIN_PAIRS.map((mp) => (
                <div key={mp.pair.join("-")} className="rounded-xl border border-border bg-card p-4">
                  <div className="text-xs text-muted-foreground mb-3">{mp.vi}</div>
                  <div className="grid grid-cols-2 gap-3">
                    {mp.pair.map((w, i) => (
                      <div key={w} className="text-center bg-secondary/50 rounded-lg p-3 border border-border/60">
                        <div className="font-bold text-foreground text-lg">{w}</div>
                        <div className="font-mono text-xs text-primary mt-0.5">{mp.ipa[i]}</div>
                        <div className="flex justify-center gap-1 mt-2 flex-wrap">
                          <PlayBtn text={w} accent="en-US" small />
                          <PlayBtn text={w} accent="en-GB" small />
                          <SpeakCheck target={w} small />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ============== Intonation ============== */}
          <TabsContent value="intonation" className="space-y-6">
            <SectionHeader
              icon={Music2}
              title={t("Ngữ điệu (Intonation Patterns)", "Intonation Patterns")}
              subtitle={t(
                "Cao độ thay đổi theo loại câu - đúng intonation là đúng nghĩa.",
                "Pitch changes based on sentence type - right intonation, right meaning.",
              )}
            />
            <div className="space-y-8">
              {INTONATION_GROUPS.map((group) => {
                const items = INTONATION.filter((it) => it.group === group.key);
                if (items.length === 0) return null;
                return (
                  <div key={group.key} className={`rounded-2xl border bg-gradient-to-br ${group.color} p-5`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{group.emoji}</span>
                      <h3 className="text-lg font-bold text-foreground">{t(group.vi, group.en)}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background/60 text-muted-foreground border border-border">
                        {items.length} {t("mẫu", "patterns")}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {items.map((it) => (
                        <div key={it.pattern} className="rounded-xl border border-border bg-card p-5">
                          <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium mb-3">
                            <Music2 className="w-3 h-3" /> {t(it.pattern, it.patternEn)}
                          </div>
                          <div className="space-y-2 mb-3">
                            {it.examples.map((ex, i) => (
                              <div key={i} className="rounded-lg border border-border/60 bg-secondary/40 p-2.5">
                                <p className="text-foreground font-medium text-sm mb-1.5">"{ex}"</p>
                                <div className="flex items-center gap-1.5">
                                  <PlayBtn text={ex} accent="en-US" small />
                                  <PlayBtn text={ex} accent="en-GB" small />
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{t(it.note, it.noteEn)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mẹo của thầy Hải */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-foreground">
              💡 <strong>{t("Mẹo của thầy Hải:", "Mr. Hai's Tip:")}</strong> {t(
                "Tiếng Việt có 6 thanh điệu nên người Việt thường giữ cao độ rất phẳng khi nói tiếng Anh để 'không sai nghĩa'. Nhưng tiếng Anh KHÔNG dùng cao độ phân biệt từ - hãy mạnh dạn lên - xuống! Cao độ phẳng = nghe robot, không cảm xúc.",
                "Vietnamese has 6 tones, so Vietnamese speakers keep an unusually flat pitch in English to 'avoid changing meaning'. But English does NOT use pitch to distinguish words - go BOLD with rises and falls! Flat pitch = robotic, emotionless.",
              )}
            </div>

            {/* Deep-dive intonation lessons */}
            <div className="mt-8">
              <SectionHeader
                icon={Music2}
                title={t("8 Bài học Chuyên sâu về Ngữ điệu", "8 Deep-Dive Intonation Lessons")}
                subtitle={t(
                  "Từ cao độ, đơn vị ngữ điệu, đến mỉa mai và kể chuyện - bí quyết nói tiếng Anh có cảm xúc.",
                  "From pitch range and tone units to sarcasm and storytelling - the secrets to emotional, native-like English.",
                )}
              />
              <Accordion type="single" collapsible className="w-full space-y-3">
                {INTONATION_LESSONS.map((lesson, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`int-lesson-${idx}`}
                    className="border border-border rounded-xl bg-card px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-start gap-3 text-left">
                        <span className="text-2xl flex-shrink-0">{lesson.emoji}</span>
                        <div>
                          <div className="font-semibold text-foreground">
                            {t(lesson.title, lesson.titleEn)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 font-normal">
                            {t(lesson.summary, lesson.summaryEn)}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                        {t(lesson.body, lesson.bodyEn)}
                      </p>
                      <div className="space-y-2">
                        {lesson.examples.map((ex, j) => (
                          <div key={j} className="rounded-lg border border-border bg-secondary/40 p-3">
                            <p className="text-foreground font-medium mb-2">"{ex.text}"</p>
                            <div className="flex items-center gap-2 mb-2">
                              <PlayBtn text={ex.text} accent="en-US" />
                              <PlayBtn text={ex.text} accent="en-GB" />
                            </div>
                            <p className="text-xs text-muted-foreground">{t(ex.note, ex.noteEn)}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* ============== Linking ============== */}
          <TabsContent value="linking" className="space-y-6">
            <SectionHeader
              icon={Waves}
              title={t("Nối âm & Luyến láy (Connected Speech)", "Linking & Connected Speech")}
              subtitle={t(
                "Người bản xứ nối các từ liền lạc - không nói rời rạc từng chữ.",
                "Native speakers connect words fluidly - they don't say each word separately.",
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {LINKING.map((lk) => (
                <div key={lk.example} className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    {t(lk.type, lk.typeEn)}
                  </h4>
                  <div className="bg-secondary/60 rounded-lg p-3 mb-3 border border-border/50">
                    <div className="font-medium text-foreground mb-1">{lk.example}</div>
                    <div className="font-mono text-xs text-primary">{lk.ipa}</div>
                    <div className="mt-2"><PlayBtn text={lk.example} /></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(lk.rule, lk.ruleEn)}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ============== Weak forms ============== */}
          <TabsContent value="weak" className="space-y-6">
            <SectionHeader
              icon={AudioLines}
              title={t("Weak Forms & Schwa /ə/", "Weak Forms & Schwa /ə/")}
              subtitle={t(
                "Các từ chức năng (and, to, of, can…) thường bị giảm thành schwa khi nói nhanh.",
                "Function words (and, to, of, can…) reduce to schwa in connected speech.",
              )}
            />
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm" style={{ minWidth: 600 }}>
                <thead className="bg-secondary text-foreground">
                  <tr>
                    <th className="text-left p-3 font-semibold">{t("Từ", "Word")}</th>
                    <th className="text-left p-3 font-semibold">{t("Dạng mạnh", "Strong")}</th>
                    <th className="text-left p-3 font-semibold">{t("Dạng yếu", "Weak")}</th>
                    <th className="text-left p-3 font-semibold">{t("Ví dụ", "Example")}</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {WEAK_FORMS.map((wf, i) => (
                    <tr key={wf.word} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                      <td className="p-3 font-bold text-primary">{wf.word}</td>
                      <td className="p-3 font-mono text-xs">{wf.strong}</td>
                      <td className="p-3 font-mono text-xs text-emerald-600 dark:text-emerald-400">{wf.weak}</td>
                      <td className="p-3 text-foreground">{wf.example}</td>
                      <td className="p-3"><PlayBtn text={wf.example.split("→")[0].trim()} small /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-foreground">
              💡 <strong>{t("Mẹo của thầy Hải:", "Mr. Hai's Tip:")}</strong> {t(
                "Người Việt học tiếng Anh hay phát âm rõ từng chữ → nghe 'cứng'. Hãy luyện giảm các từ chức năng (and, of, to, for, are…) thành /ə/ - bạn sẽ tự nhiên hơn ngay lập tức.",
                "Vietnamese learners often pronounce every word clearly → sounds 'stiff'. Practice reducing function words to /ə/ - you'll sound natural immediately.",
              )}
            </div>
          </TabsContent>

          {/* ============== UK vs US ============== */}
          <TabsContent value="ukus" className="space-y-6">
            <SectionHeader
              icon={Flag}
              title={t("Anh-Anh (British) vs Anh-Mỹ (American)", "British vs American English")}
              subtitle={t(
                "Hai biến thể chính - bấm 🇬🇧 và 🇺🇸 để nghe sự khác biệt.",
                "Two major varieties - tap 🇬🇧 and 🇺🇸 to hear the difference.",
              )}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-blue-600" />
                  <h3 className="font-display font-bold text-lg">🇬🇧 British (RP)</h3>
                </div>
                <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside">
                  <li>{t("Non-rhotic - không phát âm /r/ cuối", "Non-rhotic - drops final /r/")}</li>
                  <li>{t("/t/ rõ ở giữa từ (water → 'wo-tah')", "Crisp /t/ between vowels")}</li>
                  <li>{t("/ɑː/ dài (dance, can't)", "Long /ɑː/ (dance, can't)")}</li>
                  <li>{t("/ɒ/ tròn ngắn (hot, lot)", "Rounded short /ɒ/ (hot, lot)")}</li>
                  <li>{t("Ngữ điệu lên xuống mạnh hơn", "More melodic intonation")}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-5 h-5 text-red-600" />
                  <h3 className="font-display font-bold text-lg">🇺🇸 American (GA)</h3>
                </div>
                <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside">
                  <li>{t("Rhotic - luôn phát âm /r/ cuối", "Rhotic - always pronounces final /r/")}</li>
                  <li>{t("/t/ flap thành /d/ (water → 'wader')", "/t/ flapping → 'wader'")}</li>
                  <li>{t("/æ/ bẹt (dance, can't)", "Flat /æ/ (dance, can't)")}</li>
                  <li>{t("/ɑː/ mở (hot, lot, bottle)", "Open /ɑː/ (hot, lot, bottle)")}</li>
                  <li>{t("Ngữ điệu phẳng và đều hơn", "Flatter, more even intonation")}</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm" style={{ minWidth: 600 }}>
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3 font-semibold">{t("Đặc điểm", "Feature")}</th>
                    <th className="text-left p-3 font-semibold">🇬🇧 UK</th>
                    <th className="text-left p-3 font-semibold">🇺🇸 US</th>
                    <th className="text-left p-3 font-semibold">{t("Nghe ví dụ", "Listen")}</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCENT_TABLE.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                      <td className="p-3 font-medium text-foreground">{t(row.feature, row.featureEn)}</td>
                      <td className="p-3 text-foreground">{row.uk}</td>
                      <td className="p-3 text-foreground">{row.us}</td>
                      <td className="p-3">
                        <div className="flex gap-1.5">
                          <PlayBtn text={row.example.split(",")[0].trim()} accent="en-GB" small />
                          <PlayBtn text={row.example.split(",")[0].trim()} accent="en-US" small />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-foreground">
              <strong>{t("Chọn giọng nào?", "Which accent should I learn?")}</strong>{" "}
              {t(
                "IELTS/Cambridge → khuyến khích Anh-Anh nhưng cả hai đều được chấp nhận. TOEIC/SAT → Anh-Mỹ. Quan trọng nhất: chọn 1 giọng và kiên trì luyện cho nhất quán.",
                "IELTS/Cambridge → British preferred but both accepted. TOEIC/SAT → American. Most important: pick one and practice consistently.",
              )}
            </div>
          </TabsContent>

          {/* ============== Vietnamese Mistakes ============== */}
          <TabsContent value="vnmistakes" className="space-y-6">
            <SectionHeader
              icon={AlertTriangle}
              title={t("Các từ người Việt hay phát âm sai", "Words Vietnamese Learners Mispronounce")}
              subtitle={t(
                "Tổng hợp lỗi phát âm phổ biến nhất của người học Việt. Bấm 🔊 nghe mẫu, bấm 🎤 Speak để máy chấm.",
                "Most common Vietnamese learner mistakes. Tap 🔊 to hear, tap 🎤 Speak for instant scoring.",
              )}
            />
            <div className="space-y-6">
              {VN_MISTAKE_GROUPS.map((g) => {
                const items = VN_MISTAKES.filter((m) => m.category === g.key);
                if (items.length === 0) return null;
                return (
                  <div key={g.key} className={`rounded-2xl border bg-gradient-to-br ${g.color} p-5`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{g.emoji}</span>
                      <h3 className="text-lg font-bold text-foreground">{t(g.vi, g.en)}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background/60 text-muted-foreground border border-border">
                        {items.length} {t("từ", "words")}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {items.map((m) => {
                        const target = m.word.split("/")[0].trim();
                        return (
                          <div key={m.word + m.wrongIpa} className="rounded-xl border border-border bg-card p-4">
                            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                              <div>
                                <div className="font-display font-bold text-foreground text-lg">{m.word}</div>
                                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">✓ {m.correctIpa}</div>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                <PlayBtn text={target} accent="en-US" small />
                                <PlayBtn text={target} accent="en-GB" small />
                                <SpeakCheck target={target} small />
                              </div>
                            </div>
                            <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-2 mb-2">
                              <p className="text-xs text-rose-700 dark:text-rose-300">
                                <span className="font-semibold">✗ {t("Hay đọc sai:", "Common mistake:")}</span>{" "}
                                {m.wrong} <span className="font-mono">{m.wrongIpa}</span>
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">💡 {t(m.vi, m.en)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-foreground">
              💡 <strong>{t("Mẹo của thầy Hải:", "Mr. Hai's Tip:")}</strong>{" "}
              {t(
                "Hãy chọn mỗi ngày 3 từ trong bảng này, luyện 'shadowing' 10 lần, rồi bấm Speak để máy chấm. Sau 30 ngày bạn sẽ hết 80% lỗi phát âm phổ biến.",
                "Pick 3 words a day, shadow each 10 times, then tap Speak for instant scoring. In 30 days you'll eliminate 80% of common mistakes.",
              )}
            </div>
          </TabsContent>

          {/* ============== Sentence Practice ============== */}
          <TabsContent value="practice" className="space-y-6">
            <SectionHeader
              icon={GraduationCap}
              title={t("Luyện đọc câu (Shadowing)", "Sentence Shadowing Drill")}
              subtitle={t(
                "Bấm phát, lặp lại theo audio, ghi âm và so sánh - luyện shadowing 5-10 phút mỗi ngày.",
                "Listen, shadow, record and compare - 5-10 minutes a day.",
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {PRACTICE_SENTENCES.map((s, i) => (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-foreground text-base font-medium mb-3 leading-relaxed">
                    "{s.text}"
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <PlayBtn text={s.text} accent="en-US" />
                    <PlayBtn text={s.text} accent="en-GB" />
                    <button
                      onClick={() => speak(s.text, "en-US", 0.55)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-medium"
                    >
                      🐢 {t("Chậm", "Slow")}
                    </button>
                    <SpeakCheck target={s.text} />
                  </div>
                  <p className="text-xs text-muted-foreground">🎯 {s.focus}</p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm text-foreground flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>{t("Kết hợp với AI Speaking Coach", "Combine with AI Speaking Coach")}:</strong>{" "}
                {t(
                  "Sau khi luyện ở đây, hãy ghi âm thử ở AI Speaking Coach để được chấm điểm phát âm chi tiết.",
                  "After practicing here, record yourself in the AI Speaking Coach for detailed pronunciation scoring.",
                )}{" "}
                <Link to="/speaking-coach/english" className="text-primary font-semibold underline">
                  {t("Mở AI Speaking Coach", "Open AI Speaking Coach")} →
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* ============== Quiz ============== */}
          <TabsContent value="quiz" className="space-y-6">
            <SectionHeader
              icon={Trophy}
              title={t("Quiz nghe & phân biệt giọng", "Listening & Accent Quiz")}
              subtitle={t(
                `${QUIZ.length} câu hỏi: minimal pairs, intonation, nối âm, UK vs US.`,
                `${QUIZ.length} questions: minimal pairs, intonation, linking, UK vs US.`,
              )}
            />

            {!finished ? (
              <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("Câu", "Question")} {quizIdx + 1} / {QUIZ.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {t("Điểm", "Score")}: {score}
                  </span>
                </div>

                <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
                    style={{ width: `${((quizIdx + (revealed ? 1 : 0)) / QUIZ.length) * 100}%` }}
                  />
                </div>

                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  {t(currentQ.question, currentQ.questionEn)}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <button
                    onClick={() => speak(currentQ.audio.text, currentQ.audio.accent, 0.9)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
                  >
                    <Volume2 className="w-5 h-5" /> {t("Phát audio", "Play audio")}
                  </button>
                  <button
                    onClick={() => speak(currentQ.audio.text, currentQ.audio.accent, 0.55)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80"
                  >
                    🐢 {t("Phát chậm", "Play slow")}
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  {currentQ.options.map((opt, i) => {
                    const isCorrect = revealed && i === currentQ.answer;
                    const isWrong = revealed && i === selected && i !== currentQ.answer;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={revealed}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                            : isWrong
                            ? "border-red-500 bg-red-500/10 text-foreground"
                            : "border-border bg-secondary/40 hover:bg-secondary text-foreground"
                        } ${revealed ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + i)}. {opt}</span>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isWrong && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-secondary/60 border border-border p-4 mb-4 text-sm text-foreground"
                  >
                    💡 {t(currentQ.explain, currentQ.explainEn)}
                  </motion.div>
                )}

                {revealed && (
                  <button
                    onClick={nextQ}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
                  >
                    {quizIdx + 1 >= QUIZ.length ? t("Xem kết quả", "See results") : t("Câu tiếp theo", "Next question")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-emerald-500/10 p-8 max-w-xl mx-auto text-center">
                <Trophy className="w-14 h-14 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {t("Hoàn thành!", "All done!")}
                </h3>
                <p className="text-lg text-foreground mb-1">
                  {t("Điểm số của bạn", "Your score")}:{" "}
                  <span className="font-bold text-primary">
                    {score} / {QUIZ.length}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {score >= QUIZ.length * 0.8
                    ? t("Xuất sắc! Tai nghe của bạn rất nhạy.", "Excellent! Sharp ears.")
                    : score >= QUIZ.length * 0.5
                    ? t("Tốt - luyện thêm minimal pairs.", "Good - keep drilling minimal pairs.")
                    : t("Đừng nản - quay lại học bảng IPA và intonation.", "Don't worry - revisit IPA & intonation.")}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={restartQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110"
                  >
                    {t("Làm lại", "Retry")}
                  </button>
                  <Link
                    to="/speaking-coach/english"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80"
                  >
                    <Mic2 className="w-4 h-4" /> {t("Tới AI Speaking Coach", "To AI Speaking Coach")}
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Companion CTA */}
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[
            { to: "/english/grammar", icon: BookOpenIcon, title: t("Ngữ pháp", "Grammar"), desc: t("9 modules ngữ pháp toàn diện", "9 grammar modules") },
            { to: "/english/conversational", icon: ChatIcon, title: t("Giao tiếp", "Conversational"), desc: t("38 bài giao tiếp với TTS", "38 lessons with TTS") },
            { to: "/songs/english", icon: SongIcon, title: t("Học qua bài hát", "Learn via Songs"), desc: t("Karaoke + bài tập điền từ", "Karaoke + fill-in-blank") },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <c.icon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                {c.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Tiny icon shims to avoid extra imports
const BookOpenIcon = (props: any) => <Languages {...props} />;
const ChatIcon = (props: any) => <Mic2 {...props} />;
const SongIcon = (props: any) => <Music2 {...props} />;

export default EnglishPronunciation;
