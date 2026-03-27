// Folklore card grid component matching watercolor illustration design
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import type { FolkloreItem } from "@/data/vietnamese/types";

// Image map for folklore items
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header: Badge + Title */}
            <div className="px-4 pt-4 pb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-xs shrink-0 border-primary/40 text-primary"
              >
                {item.type === "ca-dao" ? t("Ca Dao", "Folk Song") : t("Tục Ngữ", "Proverb")}
              </Badge>
              <h3 className="font-extrabold text-foreground text-base leading-tight">
                {t(item.title, item.titleEn)}
              </h3>
            </div>

            {/* Watercolor Illustration */}
            {imageMap[item.id] && (
              <div className="px-4">
                <img
                  src={imageMap[item.id]}
                  alt={t(item.title, item.titleEn)}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-auto rounded-lg object-cover aspect-square"
                />
              </div>
            )}

            {/* Content (for ca-dao with multi-line poetry) */}
            {item.type === "ca-dao" && (
              <div className="px-4 pt-3">
                <p
                  className="text-base font-semibold text-foreground italic leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {t(item.content, item.contentEn)}
                </p>
              </div>
            )}

            {/* Meaning */}
            <div className="px-4 py-3">
              <p className="text-[0.95rem] text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">{t("Ý nghĩa:", "Meaning:")}</span>{" "}
                {t(item.meaning, item.meaningEn)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FolkloreCardGrid;
