import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const certs = [
  { name: "AWS Cloud Foundations", file: "/certs/aws-cloud-foundations.pdf", img: "/certs/aws-cloud-foundations.png" },
  { name: "AWS Data Engineering", file: "/certs/aws-data-engineering.pdf", img: "/certs/aws-data-engineering.png" },
  { name: "AWS ML for NLP", file: "/certs/aws-ml-nlp.pdf", img: "/certs/aws-ml-nlp.png" },
  { name: "ETL/ELT in Python", file: "/certs/etl-elt-python.pdf", img: "/certs/etl-elt-python.png" },
  { name: "MLOps", file: "/certs/mlops.pdf", img: "/certs/mlops.png" },
  { name: "SQL Certification", file: "/certs/sql-cert.pdf", img: "/certs/sql-cert.png" },
  { name: "Intro to Deep Learning", file: "/certs/intro-deep-learning.pdf", img: "/certs/intro-deep-learning.png" },
  { name: "Reinforcement Learning", file: "/certs/reinforcement-learning.pdf", img: "/certs/reinforcement-learning.png" },
  { name: "Building AI", file: "/certs/building-ai.png", img: "/certs/building-ai.png" },
  { name: "Data Analytics with Power BI", file: "/certs/data-analytics-power-bi.pdf", img: null },
  { name: "Data Analytics with Fabric", file: "/certs/data-analytics-fabric.pdf", img: null },
  { name: "Intro to Data Engineering", file: "/certs/intro-data-engineering.pdf", img: null },
  { name: "Supervised Learning (scikit-learn)", file: "/certs/supervised-learning-sklearn.pdf", img: null },
  { name: "Working with OpenAI API", file: "/certs/working-openai-api.pdf", img: null },
];

interface CertCarouselProps {
  title?: string;
}

// Marquee row that scrolls infinitely
const MarqueeRow = ({
  items,
  direction = "left",
  duration = 60,
  onClickCert,
}: {
  items: typeof certs;
  direction?: "left" | "right";
  duration?: number;
  onClickCert: (index: number) => void;
}) => {
  const doubled = [...items, ...items];
  const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: animateX }}
        transition={{ x: { repeat: Infinity, duration, ease: "linear" } }}
      >
        {doubled.map((cert, i) => {
          const realIndex = i % items.length;
          return (
            <div
              key={`${cert.name}-${i}`}
              onClick={(e) => {
                e.preventDefault();
                onClickCert(realIndex);
              }}
              className="group shrink-0 w-[260px] rounded-xl border border-border bg-secondary overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                {cert.img ? (
                  <img
                    src={cert.img}
                    alt={cert.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <FileText className="w-12 h-12 text-primary/60" />
                    <span className="text-sm font-medium text-muted-foreground leading-tight">{cert.name}</span>
                  </div>
                )}
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground truncate">{cert.name}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const CertCarousel = ({ title }: CertCarouselProps) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          {title || t("Chứng chỉ Chuyên môn", "Professional Certifications")}
        </h3>
        <span className="text-xs text-muted-foreground">{certs.length} {t("chứng chỉ", "certificates")}</span>
      </div>

      {/* Marquee scrolling */}
      <MarqueeRow items={certs} direction="left" duration={50} onClickCert={setSelected} />

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Navigation */}
              <button
                onClick={() => setSelected((selected - 1 + certs.length) % certs.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => setSelected((selected + 1) % certs.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {certs[selected].img ? (
                <img
                  src={certs[selected].img}
                  alt={certs[selected].name}
                  className="w-full object-contain max-h-[70vh] bg-white"
                />
              ) : (
                <div className="w-full h-[50vh] bg-white flex flex-col items-center justify-center gap-4">
                  <FileText className="w-16 h-16 text-primary/60" />
                  <p className="text-lg font-medium text-muted-foreground">{certs[selected].name}</p>
                </div>
              )}

              <div className="p-4 flex items-center justify-between">
                <span className="font-medium text-foreground">{certs[selected].name}</span>
                <a
                  href={certs[selected].file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  {t("Xem chứng chỉ", "View certificate")} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertCarousel;
