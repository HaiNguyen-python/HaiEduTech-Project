// Folklore card grid component with artistic typography and masonry layout
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import type { FolkloreItem } from "@/data/vietnamese/types";

// Image imports for folklore illustrations
import congCha from "@/assets/folklore/cong-cha-nghia-me.jpg";
import khongThay from "@/assets/folklore/khong-thay-do-may.jpg";
import coCong from "@/assets/folklore/co-cong-mai-sat.jpg";
import thuongNguoi from "@/assets/folklore/thuong-nguoi.jpg";
import anQua from "@/assets/folklore/an-qua-nho-ke-trong-cay.jpg";
import thuanVo from "@/assets/folklore/thuan-vo-thuan-chong.jpg";
import queHuong from "@/assets/folklore/ca-dao-que-huong.jpg";
import laLanh from "@/assets/folklore/la-lanh-dum-la-rach.jpg";
import ganMuc from "@/assets/folklore/gan-muc-thi-den.jpg";
import motCay from "@/assets/folklore/mot-cay-lam-chang-nen-non.jpg";
import uongNuoc from "@/assets/folklore/uong-nuoc-nho-nguon.jpg";
import denNha from "@/assets/folklore/den-nha-ai-nay-rang.jpg";
import miengTrau from "@/assets/folklore/mieng-trau.jpg";
import ruCon from "@/assets/folklore/ca-dao-ru-con.jpg";
import totGo from "@/assets/folklore/tot-go-hon-tot-nuoc-son.jpg";
import doiCho from "@/assets/folklore/doi-cho-sach.jpg";
import tinhYeu from "@/assets/folklore/ca-dao-tinh-yeu.jpg";
import hocAn from "@/assets/folklore/hoc-an-hoc-noi.jpg";
import muaXuan from "@/assets/folklore/mua-xuan-tet-trong-cay.jpg";
import chiNga from "@/assets/folklore/chi-nga-em-nang.jpg";
import tinhBan from "@/assets/folklore/ca-dao-tinh-ban.jpg";
import diMotNgay from "@/assets/folklore/di-mot-ngay-dang.jpg";
import datNuoc from "@/assets/folklore/ca-dao-dat-nuoc.jpg";
import oHien from "@/assets/folklore/o-hien-gap-lanh.jpg";

const imageMap: Record<string, string> = {
  "folk-1": congCha,
  "folk-2": khongThay,
  "folk-3": coCong,
  "folk-5": thuongNguoi,
  "folk-6": denNha,
  "folk-8": anQua,
  "folk-9": thuanVo,
  "folk-11": queHuong,
  "folk-12": laLanh,
  "folk-13": ganMuc,
  "folk-14": miengTrau,
  "folk-16": motCay,
  "folk-17": ruCon,
  "folk-18": uongNuoc,
  "folk-20": totGo,
  "folk-21": doiCho,
  "folk-22": tinhYeu,
  "folk-23": hocAn,
  "folk-24": muaXuan,
  "folk-26": chiNga,
  "folk-27": tinhBan,
  "folk-28": diMotNgay,
  "folk-29": datNuoc,
  "folk-30": oHien,
};

interface FolkloreCardGridProps {
  items: FolkloreItem[];
}

const FolkloreCardGrid = ({ items }: FolkloreCardGridProps) => {
  const { t } = useLanguage();

  // Filter out truyen-co (fairy tales), keep only ca-dao and tuc-ngu
  const filtered = items.filter((item) => item.type !== "truyen-co");

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        🌾 {t("Ca Dao & Tục Ngữ", "Folk Songs & Proverbs")}
      </h2>

      {/* Responsive 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => {
          const isProverb = item.type === "tuc-ngu";
          // For proverbs, show full content as main title; for folk songs, show the title
          const displayTitle = isProverb
            ? t(item.content, item.contentEn)
            : t(item.title, item.titleEn);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Header: Badge + Main verse */}
              <div className="px-5 pt-5 pb-2 flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="text-xs shrink-0 border-primary/40 text-primary mt-1"
                >
                  {isProverb ? t("Tục Ngữ", "Proverb") : t("Ca Dao", "Folk Song")}
                </Badge>
              </div>

              {/* Main verse text — artistic Dancing Script font */}
              <div className="px-5 pb-3">
                <h3
                  className="text-foreground leading-relaxed italic"
                  style={{
                    fontFamily: "'Dancing Script', 'Playfair Display', 'Noto Serif', serif",
                    fontSize: "26px",
                    lineHeight: 1.5,
                    fontWeight: 700,
                  }}
                >
                  {displayTitle}
                </h3>
              </div>

              {/* Watercolor illustration with soft border and glow */}
              {imageMap[item.id] && (
                <div className="px-4">
                  <div className="rounded-lg overflow-hidden border border-border/50 shadow-sm ring-1 ring-primary/10">
                    <img
                      src={imageMap[item.id]}
                      alt={t(item.title, item.titleEn)}
                      loading="lazy"
                      width={512}
                      height={320}
                      className="w-full object-cover"
                      style={{ maxHeight: "280px" }}
                    />
                  </div>
                </div>
              )}

              {/* Folk song content (only for ca-dao, distinct from title) */}
              {!isProverb && (
                <div className="px-5 pt-3">
                  <p
                    className="text-foreground italic leading-relaxed whitespace-pre-line"
                    style={{
                      fontFamily: "'Dancing Script', 'Playfair Display', 'Noto Serif', serif",
                      fontSize: "24px",
                      lineHeight: 1.5,
                    }}
                  >
                    {t(item.content, item.contentEn)}
                  </p>
                </div>
              )}

              {/* Meaning — clean Inter font, smaller size */}
              <div className="px-5 py-4">
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                  }}
                >
                  <span className="font-semibold text-foreground">
                    {t("Ý nghĩa:", "Meaning:")}
                  </span>{" "}
                  {t(item.meaning, item.meaningEn)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FolkloreCardGrid;
