// Client-side body-language scoring for speaking practice.
// All maths runs on small canvas samples in the browser; no video leaves the device.

export interface BodyLanguageSamples {
  /** number of samples collected */
  total: number;
  /** samples where the centre frame stayed steady (looking at the lens) */
  steadyHits: number;
  /** average frame-to-frame movement (0-255 scale) */
  movementAvg: number;
  /** average brightness of the centre (face) box, 0-255 */
  framingBrightness: number;
  /** variance of the mouth-region brightness across samples (expression animation) */
  expressionVariance: number;
}

export interface BodyLanguageScores {
  eyeContact: number;
  framing: number;
  movement: number;
  expression: number;
  confidence: number;
  naturalness: number;
  tips: { vi: string; en: string }[];
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function scoreBodyLanguage(s: BodyLanguageSamples): BodyLanguageScores {
  const eyeContact = s.total > 1 ? clamp((s.steadyHits / (s.total - 1)) * 100) : 0;

  // Framing: a well-lit, visible face sits roughly in the 55-190 brightness band.
  const b = s.framingBrightness;
  const framing = clamp(b < 25 || b > 235 ? 25 : 100 - Math.abs(b - 120) * 0.55);

  // Movement: a natural speaker moves a little. Too still = stiff, too much = restless.
  const m = s.movementAvg;
  const movement = clamp(m < 3 ? 45 + m * 8 : m > 26 ? 100 - (m - 26) * 3.2 : 100 - Math.abs(m - 12) * 1.6);

  // Expression: variation of the mouth region shows the face is animated while talking.
  const expression = clamp(Math.min(s.expressionVariance, 90) * 1.15);

  const confidence = clamp(eyeContact * 0.5 + framing * 0.28 + movement * 0.22);
  const naturalness = clamp(expression * 0.45 + movement * 0.35 + eyeContact * 0.2);

  const tips: { vi: string; en: string }[] = [];
  if (eyeContact < 60)
    tips.push({
      vi: "Giữ mắt hướng vào ống kính lâu hơn thay vì nhìn xuống ghi chú.",
      en: "Hold your gaze on the lens longer instead of looking down at notes.",
    });
  if (framing < 60)
    tips.push({
      vi: "Chỉnh lại khung hình và ánh sáng: khuôn mặt nên nằm giữa khung, đủ sáng.",
      en: "Fix your framing and lighting: keep your face centred and well lit.",
    });
  if (movement < 55) {
    tips.push(
      m > 20
        ? {
            vi: "Bạn đang di chuyển khá nhiều - hãy hít thở sâu và giữ tư thế ổn định hơn.",
            en: "You are moving a lot - breathe and keep a steadier posture.",
          }
        : {
            vi: "Cử chỉ hơi cứng - hãy dùng tay và gật đầu nhẹ để nói tự nhiên hơn.",
            en: "Your delivery looks stiff - use light hand gestures and nods to sound natural.",
          },
    );
  }
  if (expression < 55)
    tips.push({
      vi: "Biểu cảm còn ít - mỉm cười và thay đổi nét mặt theo nội dung bạn nói.",
      en: "Add more expression - smile and let your face follow what you are saying.",
    });
  if (!tips.length)
    tips.push({
      vi: "Rất tốt! Ngôn ngữ cơ thể của bạn tự tin và tự nhiên - hãy giữ phong độ này.",
      en: "Great work! Your body language looks confident and natural - keep it up.",
    });

  return { eyeContact, framing, movement, expression, confidence, naturalness, tips: tips.slice(0, 3) };
}

export function scoreLabel(score: number): { vi: string; en: string } {
  if (score >= 80) return { vi: "Rất tự tin", en: "Very confident" };
  if (score >= 65) return { vi: "Tự tin", en: "Confident" };
  if (score >= 50) return { vi: "Khá ổn", en: "Fair" };
  return { vi: "Cần luyện thêm", en: "Needs practice" };
}
