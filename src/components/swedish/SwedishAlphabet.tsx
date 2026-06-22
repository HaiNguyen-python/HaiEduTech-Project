/**
 * @file SwedishAlphabet.tsx
 * @description Bảng chữ cái tiếng Thụy Điển (29 chữ A-Ö) kèm nút phát âm
 *              từng âm rõ ràng, ví dụ minh hoạ và mẹo phát âm cho học viên
 *              Việt Nam. Dùng SwedishAudioButton (sv-SE) để đọc tên chữ.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import SwedishAudioButton from "./SwedishAudioButton";
import { Lightbulb } from "lucide-react";

interface Letter {
  upper: string;
  lower: string;
  /** Cách phát âm tên chữ (xấp xỉ IPA / kiểu Việt). */
  name: string;
  /** Mẹo phát âm cho người Việt. */
  tipVi: string;
  tipEn: string;
  /** Từ ví dụ tiếng Thụy Điển. */
  example: string;
  /** Nghĩa ví dụ. */
  meaningVi: string;
  meaningEn: string;
  /** true nếu là nguyên âm. */
  vowel?: boolean;
  /** true nếu là chữ đặc biệt Bắc Âu (Å, Ä, Ö). */
  special?: boolean;
}

const LETTERS: Letter[] = [
  { upper: "A", lower: "a", name: "aa (dài)", tipVi: "Như 'a' trong 'ba', mở rộng miệng.", tipEn: "Like 'a' in 'father'.", example: "apa", meaningVi: "con khỉ", meaningEn: "monkey", vowel: true },
  { upper: "B", lower: "b", name: "be", tipVi: "Giống 'b' tiếng Việt.", tipEn: "Like English 'b'.", example: "bok", meaningVi: "cuốn sách", meaningEn: "book" },
  { upper: "C", lower: "c", name: "se", tipVi: "Trước e/i/y đọc như 's'; còn lại như 'k'.", tipEn: "Soft 's' before e/i/y; otherwise 'k'.", example: "cykel", meaningVi: "xe đạp", meaningEn: "bicycle" },
  { upper: "D", lower: "d", name: "de", tipVi: "Giống 'đ' tiếng Việt nhưng nhẹ hơn.", tipEn: "Like English 'd'.", example: "dag", meaningVi: "ngày", meaningEn: "day" },
  { upper: "E", lower: "e", name: "ee (dài)", tipVi: "Như 'ê' kéo dài: 'êê'.", tipEn: "Like 'e' in 'they'.", example: "elev", meaningVi: "học sinh", meaningEn: "student", vowel: true },
  { upper: "F", lower: "f", name: "ef", tipVi: "Giống 'ph' tiếng Việt.", tipEn: "Like English 'f'.", example: "fisk", meaningVi: "con cá", meaningEn: "fish" },
  { upper: "G", lower: "g", name: "ge", tipVi: "Trước e/i/y/ä/ö đọc như 'y'; còn lại như 'g'.", tipEn: "'Y' sound before e/i/y/ä/ö; otherwise hard 'g'.", example: "gata", meaningVi: "con đường", meaningEn: "street" },
  { upper: "H", lower: "h", name: "hå", tipVi: "Bật hơi nhẹ như 'h' tiếng Việt.", tipEn: "Like English 'h'.", example: "hus", meaningVi: "ngôi nhà", meaningEn: "house" },
  { upper: "I", lower: "i", name: "ii (dài)", tipVi: "Như 'i' kéo dài: 'iii'.", tipEn: "Like 'ee' in 'see'.", example: "is", meaningVi: "đá / kem", meaningEn: "ice", vowel: true },
  { upper: "J", lower: "j", name: "ji (yi)", tipVi: "Đọc như 'y' tiếng Việt (KHÔNG phải 'gi').", tipEn: "Like English 'y' in 'yes'.", example: "ja", meaningVi: "vâng / có", meaningEn: "yes" },
  { upper: "K", lower: "k", name: "kå", tipVi: "Trước e/i/y/ä/ö đọc gần như 'sh'; còn lại 'k'.", tipEn: "'Sh' (sj-sound) before e/i/y/ä/ö; otherwise 'k'.", example: "kaffe", meaningVi: "cà phê", meaningEn: "coffee" },
  { upper: "L", lower: "l", name: "el", tipVi: "Giống 'l' tiếng Việt.", tipEn: "Like English 'l'.", example: "ljus", meaningVi: "ánh sáng / nến", meaningEn: "light / candle" },
  { upper: "M", lower: "m", name: "em", tipVi: "Giống 'm' tiếng Việt.", tipEn: "Like English 'm'.", example: "mat", meaningVi: "thức ăn", meaningEn: "food" },
  { upper: "N", lower: "n", name: "en", tipVi: "Giống 'n' tiếng Việt.", tipEn: "Like English 'n'.", example: "natt", meaningVi: "đêm", meaningEn: "night" },
  { upper: "O", lower: "o", name: "oo (dài)", tipVi: "Thường đọc 'u' (như 'bok' = búúk), không phải 'ô'.", tipEn: "Often 'oo' as in 'boot'.", example: "bok", meaningVi: "sách", meaningEn: "book", vowel: true },
  { upper: "P", lower: "p", name: "pe", tipVi: "Giống 'p' tiếng Việt.", tipEn: "Like English 'p'.", example: "pojke", meaningVi: "cậu bé", meaningEn: "boy" },
  { upper: "Q", lower: "q", name: "ku", tipVi: "Hiếm dùng, đọc như 'k'.", tipEn: "Rare, sounds like 'k'.", example: "quiz", meaningVi: "đố vui", meaningEn: "quiz" },
  { upper: "R", lower: "r", name: "är", tipVi: "Rung lưỡi nhẹ như 'r' tiếng Việt miền Bắc.", tipEn: "Lightly trilled 'r'.", example: "röd", meaningVi: "màu đỏ", meaningEn: "red" },
  { upper: "S", lower: "s", name: "es", tipVi: "Giống 's' tiếng Việt, KHÔNG bao giờ thành 'z'.", tipEn: "Always voiceless 's' (never 'z').", example: "sol", meaningVi: "mặt trời", meaningEn: "sun" },
  { upper: "T", lower: "t", name: "te", tipVi: "Giống 't' tiếng Việt.", tipEn: "Like English 't'.", example: "tid", meaningVi: "thời gian", meaningEn: "time" },
  { upper: "U", lower: "u", name: "uu (chu môi)", tipVi: "Chu môi như huýt sáo, giữa 'u' và 'uy'.", tipEn: "Rounded, between 'oo' and 'ew'.", example: "ung", meaningVi: "trẻ", meaningEn: "young", vowel: true },
  { upper: "V", lower: "v", name: "ve", tipVi: "Giống 'v' tiếng Việt.", tipEn: "Like English 'v'.", example: "vatten", meaningVi: "nước", meaningEn: "water" },
  { upper: "W", lower: "w", name: "dubbel-ve", tipVi: "Hiếm dùng, đọc như 'v'.", tipEn: "Rare, pronounced like 'v'.", example: "webb", meaningVi: "web", meaningEn: "web" },
  { upper: "X", lower: "x", name: "eks", tipVi: "Đọc như 'ks'.", tipEn: "Like 'ks'.", example: "sex", meaningVi: "sáu", meaningEn: "six" },
  { upper: "Y", lower: "y", name: "yy (chu môi)", tipVi: "Chu môi rồi nói 'i' - như 'uy' nhanh.", tipEn: "Rounded 'i', like German 'ü'.", example: "yr", meaningVi: "chóng mặt", meaningEn: "dizzy", vowel: true },
  { upper: "Z", lower: "z", name: "säta", tipVi: "Đọc như 's', không phải 'z' tiếng Anh.", tipEn: "Pronounced like 's' (not 'z').", example: "zebra", meaningVi: "ngựa vằn", meaningEn: "zebra" },
  { upper: "Å", lower: "å", name: "åå (dài)", tipVi: "Như 'o' trong 'cho': miệng tròn, môi chu.", tipEn: "Like 'o' in 'more'.", example: "år", meaningVi: "năm", meaningEn: "year", vowel: true, special: true },
  { upper: "Ä", lower: "ä", name: "ää (dài)", tipVi: "Như 'e' trong 'em' nhưng mở rộng hơn.", tipEn: "Like 'e' in 'bed', more open.", example: "äta", meaningVi: "ăn", meaningEn: "to eat", vowel: true, special: true },
  { upper: "Ö", lower: "ö", name: "öö (dài)", tipVi: "Chu môi rồi nói 'ơ' - như 'eu' tiếng Pháp.", tipEn: "Rounded 'er', like German 'ö'.", example: "öl", meaningVi: "bia", meaningEn: "beer", vowel: true, special: true },
];

export const SwedishAlphabet = () => {
  const { t } = useLanguage();
  const fullAlphabetText = LETTERS.map((l) => l.upper).join(", ");

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              🇸🇪 {t("Bảng chữ cái Thụy Điển - 29 chữ", "Swedish Alphabet - 29 letters")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(
                "Bấm 🔊 ở mỗi chữ để nghe phát âm tên chữ. Có 3 chữ đặc biệt cuối bảng: Å, Ä, Ö.",
                "Tap 🔊 on each letter to hear the name. Three special Nordic letters come last: Å, Ä, Ö."
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-background/60 px-3 py-1.5 shadow-sm">
            <span className="text-xs font-medium text-muted-foreground">
              {t("Đọc cả bảng", "Read full alphabet")}
            </span>
            <SwedishAudioButton text={fullAlphabetText} size="md" rate={0.75} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {LETTERS.map((l) => (
          <Card
            key={l.upper}
            className={`group relative overflow-hidden p-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${
              l.special
                ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-orange-500/5"
                : l.vowel
                ? "border-blue-500/30 bg-blue-500/5"
                : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold leading-none">{l.upper}</span>
                <span className="font-display text-xl text-muted-foreground">{l.lower}</span>
              </div>
              <SwedishAudioButton text={l.upper} size="sm" rate={0.7} ariaLabel={`Phát âm chữ ${l.upper}`} />
            </div>

            <div className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-300">
              /{l.name}/
            </div>

            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {t(l.tipVi, l.tipEn)}
            </p>

            <div className="mt-2 flex items-center justify-between gap-1.5 rounded-md bg-muted/60 px-2 py-1.5">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{l.example}</div>
                <div className="truncate text-[10px] text-muted-foreground">
                  {t(l.meaningVi, l.meaningEn)}
                </div>
              </div>
              <SwedishAudioButton text={l.example} size="xs" rate={0.85} />
            </div>

            {l.special && (
              <Badge
                variant="secondary"
                className="absolute right-1.5 top-1.5 h-4 bg-amber-500/20 px-1.5 text-[9px] text-amber-700 dark:text-amber-300"
              >
                {t("Đặc biệt", "Special")}
              </Badge>
            )}
          </Card>
        ))}
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div className="space-y-2 text-sm">
            <p className="font-semibold">{t("💡 Mẹo vàng của thầy Hải", "💡 Teacher Hai's golden tips")}</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
              <li>{t("Å, Ä, Ö là CHỮ RIÊNG, không phải biến thể của A/O - bắt buộc gõ đúng khi tra từ điển.", "Å, Ä, Ö are separate letters, not A/O variants - type them correctly when looking up words.")}</li>
              <li>{t("J luôn đọc là 'Y' (ja = ya, không phải 'gia').", "J always sounds like English 'Y' (ja = ya, not 'ja').")}</li>
              <li>{t("S không bao giờ đọc thành 'z' kể cả giữa từ (läsa = lê-sa, không phải lê-za).", "S is never 'z', even between vowels (läsa = leh-sa, not leh-za).")}</li>
              <li>{t("Nguyên âm dài/ngắn quan trọng: 'vit' (trắng) ≠ 'vitt' (trắng - giống trung).", "Long vs short vowels matter: 'vit' (white) ≠ 'vitt' (white-neuter).")}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SwedishAlphabet;
