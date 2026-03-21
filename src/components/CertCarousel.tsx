import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";
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
];

interface CertCarouselProps {
  title?: string;
}

const CertCarousel = ({ title }: CertCarouselProps) => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;

  const next = () => setCurrent((p) => Math.min(p + 1, certs.length - visibleCount));
  const prev = () => setCurrent((p) => Math.max(p - 1, 0));

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          {title || t("Chứng chỉ Chuyên môn", "Professional Certifications")}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={prev}
            disabled={current === 0}
            className="p-1.5 rounded-lg bg-secondary hover:bg-primary/10 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={next}
            disabled={current >= certs.length - visibleCount}
            className="p-1.5 rounded-lg bg-secondary hover:bg-primary/10 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${current * (100 / visibleCount + 1.5)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {certs.map((cert, i) => (
            <a
              key={i}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 rounded-lg border border-border bg-secondary overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
              style={{ width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={cert.img}
                  alt={cert.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground truncate">{cert.name}</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {Array.from({ length: certs.length - visibleCount + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CertCarousel;
