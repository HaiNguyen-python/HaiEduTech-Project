/**
 * GraduationCertificate — premium printable certificate modal for AI Academy.
 * Shown when a student collects all 36/36 stars across the 12 lessons.
 *
 * Design goals:
 *  - Classic academic look (ivory paper, gold geometric border, watermark)
 *  - Cursive student name, serif headings
 *  - Founder signature block (script text, can be swapped with PNG asset)
 *  - Print / PDF via window.print() with a scoped print stylesheet
 *  - Responsive scaling via aspect-ratio + viewport-aware container
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, X, Share2, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onClose: () => void;
  studentName: string;
  /** Stable seed (e.g. user id) used to derive the certificate serial. */
  seed?: string;
}

/** Build a short, human-friendly verifiable serial like HET-AI-2026-7F3A9C. */
function buildSerial(seed: string): string {
  const year = new Date().getFullYear();
  let h = 0;
  const base = `${seed}|${year}`;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) >>> 0;
  }
  const hex = h.toString(16).toUpperCase().padStart(6, "0").slice(0, 6);
  return `HET-AI-${year}-${hex}`;
}

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export default function GraduationCertificate({ open, onClose, studentName, seed }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(studentName || "Học sinh HaiEduTech");

  useEffect(() => {
    if (studentName) setName(studentName);
  }, [studentName]);

  const issueDate = useMemo(() => formatDate(new Date()), [open]);
  const serial = useMemo(() => buildSerial(seed || name || "guest"), [seed, name]);

  const handlePrint = () => {
    // Triggers the browser print dialog. The @media print rules below
    // ensure only the certificate is shown on paper / PDF.
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `Mình vừa hoàn thành khoá học AI Academy của HaiEduTech với 36/36 sao! 🎓`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto print:bg-white print:p-0 print:static print:block"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Chứng chỉ tốt nghiệp AI Academy"
        >
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="w-full max-w-5xl my-auto print:max-w-none print:m-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ============= CERTIFICATE PAPER ============= */}
            <div
              id="ai-academy-certificate"
              className="relative w-full mx-auto bg-[#fbf7ec] text-[#1a1a2e] shadow-2xl print:shadow-none overflow-hidden"
              style={{
                aspectRatio: "1.414 / 1", // A4 landscape
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(201,168,76,0.07), transparent 50%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.07), transparent 50%)",
              }}
            >
              {/* Decorative gold border layers */}
              <div className="absolute inset-[1.5%] border-[3px] border-[#c9a84c] rounded-sm" />
              <div className="absolute inset-[2.5%] border border-[#c9a84c]/60 rounded-sm" />
              {/* Corner ornaments */}
              {[
                "top-[2.5%] left-[2.5%]",
                "top-[2.5%] right-[2.5%]",
                "bottom-[2.5%] left-[2.5%]",
                "bottom-[2.5%] right-[2.5%]",
              ].map((pos, i) => (
                <svg
                  key={i}
                  className={`absolute ${pos} w-[6%] h-[8%] text-[#c9a84c]`}
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M2 2h28M2 2v28M8 8h16M8 8v16" />
                  <circle cx="2" cy="2" r="1.2" fill="currentColor" />
                </svg>
              ))}

              {/* Centered watermark logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="font-display font-black text-[clamp(3rem,12vw,9rem)] text-[#c9a84c]/[0.06] tracking-tighter rotate-[-12deg]">
                  HaiEduTech
                </div>
              </div>

              {/* ============= CONTENT ============= */}
              <div className="relative h-full w-full px-[6%] py-[5%] flex flex-col items-center text-center">
                {/* Brand */}
                <div className="flex items-center gap-2 text-[#c9a84c]">
                  <span className="text-[clamp(0.7rem,1.4vw,1rem)] tracking-[0.4em] font-bold">
                    HAIEDUTECH · AI ACADEMY
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="mt-[2%] font-serif font-bold text-[#1a1a2e] tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", fontSize: "clamp(1.4rem,3.6vw,2.8rem)" }}
                >
                  CHỨNG CHỈ HOÀN THÀNH KHÓA HỌC
                </h1>
                <div
                  className="text-[#6b5a2e] italic tracking-wider"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.85rem,1.8vw,1.25rem)" }}
                >
                  Certificate of Completion
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 mt-[1.5%]">
                  <span className="h-px w-12 sm:w-20 bg-[#c9a84c]" />
                  <span className="text-[#c9a84c] text-lg">✦</span>
                  <span className="h-px w-12 sm:w-20 bg-[#c9a84c]" />
                </div>

                {/* Body */}
                <p
                  className="mt-[2.5%] text-[#3a3a4a]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.85rem,1.7vw,1.2rem)" }}
                >
                  Trân trọng chứng nhận em <span className="italic text-[#6b5a2e]">/ This is to certify that:</span>
                </p>

                {/* Student name (calligraphic) */}
                <div className="mt-[1%] relative inline-flex items-center gap-2 group">
                  <h2
                    className="text-[#1a1a2e]"
                    style={{
                      fontFamily: "'Great Vibes', 'Dancing Script', 'Brush Script MT', cursive",
                      fontSize: "clamp(2.2rem,6.5vw,5rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {name}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setEditing((v) => !v)}
                    className="print:hidden opacity-0 group-hover:opacity-100 transition text-[#c9a84c] hover:text-[#a08736]"
                    aria-label="Sửa tên"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-[60%] h-px bg-[#c9a84c]/50 mt-[0.5%]" />

                {/* Description */}
                <p
                  className="mt-[2%] max-w-[85%] text-[#3a3a4a] leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.85rem,1.7vw,1.2rem)" }}
                >
                  Đã hoàn thành xuất sắc khóa học{" "}
                  <span className="font-bold text-[#1a1a2e]">
                    Trí tuệ nhân tạo Phổ thông (AI Academy)
                  </span>
                  {" "}gồm <span className="font-bold">12 chuyên đề</span> công nghệ thực hành chuyên sâu, đạt thành tích <span className="font-bold text-[#c9a84c]">36/36 sao ⭐</span>.
                </p>

                {/* Footer area */}
                <div className="mt-auto w-full grid grid-cols-3 gap-3 items-end pt-[2%]">
                  {/* Date + Serial */}
                  <div className="text-left">
                    <div
                      className="text-[#6b5a2e] uppercase tracking-widest"
                      style={{ fontSize: "clamp(0.55rem,0.9vw,0.75rem)" }}
                    >
                      Ngày cấp · Issue Date
                    </div>
                    <div
                      className="font-bold text-[#1a1a2e]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.85rem,1.6vw,1.1rem)" }}
                    >
                      {issueDate}
                    </div>
                    <div
                      className="mt-1 text-[#6b5a2e] uppercase tracking-widest"
                      style={{ fontSize: "clamp(0.55rem,0.9vw,0.75rem)" }}
                    >
                      Mã chứng chỉ · ID
                    </div>
                    <div
                      className="font-mono font-bold text-[#1a1a2e]"
                      style={{ fontSize: "clamp(0.7rem,1.3vw,0.95rem)" }}
                    >
                      {serial}
                    </div>
                  </div>

                  {/* Seal */}
                  <div className="flex items-center justify-center">
                    <div
                      className="relative rounded-full border-[3px] border-[#c9a84c] flex items-center justify-center text-center bg-[#fbf7ec]"
                      style={{ width: "clamp(54px,9vw,110px)", height: "clamp(54px,9vw,110px)" }}
                    >
                      <div className="absolute inset-1 rounded-full border border-[#c9a84c]/60" />
                      <div className="text-[#c9a84c] font-display font-black leading-tight">
                        <div style={{ fontSize: "clamp(0.55rem,1vw,0.8rem)" }}>OFFICIAL</div>
                        <div style={{ fontSize: "clamp(1rem,1.8vw,1.4rem)" }}>★</div>
                        <div style={{ fontSize: "clamp(0.5rem,0.9vw,0.7rem)" }}>HAIEDU</div>
                      </div>
                    </div>
                  </div>

                  {/* Signature block */}
                  <div className="text-right flex flex-col items-end">
                    {/* Signature script — replace with <img src="/signature.png" /> if available */}
                    <div
                      className="text-[#1a1a2e]"
                      style={{
                        fontFamily: "'Great Vibes', 'Dancing Script', 'Brush Script MT', cursive",
                        fontSize: "clamp(1.4rem,3.4vw,2.6rem)",
                        lineHeight: 1,
                      }}
                    >
                      Hai Nguyen
                    </div>
                    <div className="w-[80%] h-px bg-[#1a1a2e]/50 mt-1" />
                    <div
                      className="mt-1 font-bold text-[#1a1a2e]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.75rem,1.3vw,1rem)" }}
                    >
                      Hai Nguyen
                    </div>
                    <div
                      className="text-[#6b5a2e] italic"
                      style={{ fontSize: "clamp(0.6rem,1.05vw,0.85rem)" }}
                    >
                      Founder of HaiEduTech
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============= INLINE NAME EDITOR ============= */}
            {editing && (
              <div className="mt-3 print:hidden flex items-center justify-center gap-2 bg-card border-2 border-border rounded-2xl p-3 max-w-md mx-auto">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên đầy đủ của em"
                  className="text-center font-semibold"
                  maxLength={60}
                  autoFocus
                />
                <Button size="icon" onClick={() => setEditing(false)} aria-label="Xong">
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* ============= ACTIONS (hidden on print) ============= */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 print:hidden">
              <Button
                onClick={handlePrint}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold shadow-lg"
              >
                <Printer className="w-4 h-4 mr-2" /> Tải về PDF / Máy in
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="font-bold border-2"
              >
                <Share2 className="w-4 h-4 mr-2" /> Chia sẻ lên Facebook
              </Button>
              <Button onClick={onClose} variant="ghost" className="font-bold">
                <X className="w-4 h-4 mr-2" /> Đóng
              </Button>
            </div>
          </motion.div>

          {/* ============= PRINT STYLES — show only the certificate ============= */}
          <style>{`
            @media print {
              @page { size: A4 landscape; margin: 0; }
              body * { visibility: hidden !important; }
              #ai-academy-certificate, #ai-academy-certificate * { visibility: visible !important; }
              #ai-academy-certificate {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                box-shadow: none !important;
                margin: 0 !important;
                aspect-ratio: auto !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
