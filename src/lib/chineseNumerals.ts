/**
 * Speech recognizers often return Arabic digits for spoken Chinese numbers
 * ("零" -> "0", "十五" -> "15"). Convert digit runs back to Hanzi so the
 * learner sees characters and scoring compares like with like.
 */
const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const UNITS = ["", "十", "百", "千"];

function under10000(n: number): string {
  if (n === 0) return "零";
  const s = String(n);
  let out = "";
  let zeroPending = false;
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i]);
    const unit = UNITS[s.length - 1 - i];
    if (d === 0) { zeroPending = out.length > 0; continue; }
    if (zeroPending) { out += "零"; zeroPending = false; }
    out += DIGITS[d] + unit;
  }
  // 一十五 -> 十五
  return out.startsWith("一十") ? out.slice(1) : out;
}

function numberToHanzi(run: string): string {
  // Runs of zeros, phone-style numbers or very long runs are read digit by digit.
  if (/^0+$/.test(run)) return "零";
  if (run.startsWith("0") || run.length > 8) return [...run].map((d) => DIGITS[Number(d)]).join("");
  const n = Number(run);
  if (n < 10000) return under10000(n);
  const high = Math.floor(n / 10000);
  const low = n % 10000;
  return under10000(high) + "万" + (low === 0 ? "" : (low < 1000 ? "零" : "") + under10000(low));
}

export function chineseDigitsToHanzi(text: string): string {
  if (!text) return text;
  return text.replace(/[0-9０-９]+/g, (m) =>
    numberToHanzi(m.replace(/[０-９]/g, (c) => String(c.charCodeAt(0) - 0xff10))),
  );
}
