import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import classroom1 from "@/assets/classroom-1.jpg";
import classroom2 from "@/assets/classroom-2.jpg";
import classroom3 from "@/assets/classroom-3.jpg";
import classroom4 from "@/assets/classroom-4.jpg";
import classroom5 from "@/assets/classroom-5.jpg";
import classroom6 from "@/assets/classroom-6.jpg";
import classroom7 from "@/assets/classroom-7.jpg";
import classroom8 from "@/assets/classroom-8.jpg";
import classroom9 from "@/assets/classroom-9.jpg";
import classroom10 from "@/assets/classroom-10.jpg";
import classroom11 from "@/assets/classroom-11.jpg";
import classroom12 from "@/assets/classroom-12.jpg";
import classroom13 from "@/assets/classroom-13.jpg";
import classroom14 from "@/assets/classroom-14.jpg";
import classroom15 from "@/assets/classroom-15.jpg";
import classroom16 from "@/assets/classroom-16.jpg";
import classroom17 from "@/assets/classroom-17.jpg";
import classroom18 from "@/assets/classroom-18.jpg";

const classroomImages = [
  { src: classroom1, caption: "English Mr.Hai – Since 2013" },
  { src: classroom2, caption: "IELTS & General English classes" },
  { src: classroom3, caption: "Students having fun after class" },
  { src: classroom4, caption: "Group study sessions" },
  { src: classroom5, caption: "Our amazing students" },
  { src: classroom6, caption: "Full house learning" },
  { src: classroom7, caption: "IELTS preparation class" },
  { src: classroom8, caption: "Focused learning environment" },
  { src: classroom9, caption: "Interactive teaching moments" },
  { src: classroom10, caption: "Young learners & teens" },
  { src: classroom11, caption: "High school English class" },
  { src: classroom12, caption: "Kids learning with joy" },
  { src: classroom13, caption: "Fun classroom activities" },
  { src: classroom14, caption: "Welcome to Mr.Hai's English Class" },
  { src: classroom15, caption: "Birthday celebrations with students" },
  { src: classroom16, caption: "Cambridge exam preparation" },
  { src: classroom17, caption: "Certificate award ceremony" },
  { src: classroom18, caption: "Adult IELTS class" },
];

// Split images into two rows for dual marquee
const row1 = classroomImages.slice(0, Math.ceil(classroomImages.length / 2));
const row2 = classroomImages.slice(Math.ceil(classroomImages.length / 2));

const MarqueeRow = ({
  images,
  direction = "left",
  duration = 40,
  onClickImage,
}: {
  images: typeof classroomImages;
  direction?: "left" | "right";
  duration?: number;
  onClickImage: (idx: number) => void;
}) => {
  // Duplicate for seamless loop
  const doubled = [...images, ...images];
  const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: animateX }}
        transition={{ x: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" } }}
      >
        {doubled.map((img, i) => {
          // Map back to original index for lightbox
          const originalIdx = i < images.length ? images.indexOf(img) : images.indexOf(img);
          const globalIdx = classroomImages.indexOf(img);

          return (
            <div
              key={`${img.caption}-${i}`}
              className="group relative flex-shrink-0 w-64 h-44 md:w-72 md:h-48 rounded-xl cursor-pointer p-[2px] bg-gradient-to-br from-primary/40 via-emerald-400/30 to-amber-300/40 hover:from-primary hover:via-emerald-400 hover:to-amber-300 transition-all duration-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.45)]"
              onClick={() => onClickImage(globalIdx)}
            >
              <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-background">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Shimmer sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-medium drop-shadow">{img.caption}</span>
                </div>
                {/* Sparkle accent */}
                <Sparkles className="absolute top-2 right-2 w-4 h-4 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse drop-shadow-[0_0_6px_rgba(252,211,77,0.8)]" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const ClassroomGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-3">
        <MarqueeRow images={row1} direction="left" duration={45} onClickImage={setSelected} />
        <MarqueeRow images={row2} direction="right" duration={50} onClickImage={setSelected} />
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={classroomImages[selected].src}
              alt={classroomImages[selected].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-3 text-sm">{classroomImages[selected].caption}</p>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold hover:bg-primary/80"
            >
              ×
            </button>
            <div className="absolute top-1/2 -translate-y-1/2 -left-12">
              <button
                onClick={() => setSelected((selected - 1 + classroomImages.length) % classroomImages.length)}
                className="w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg"
              >
                ‹
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12">
              <button
                onClick={() => setSelected((selected + 1) % classroomImages.length)}
                className="w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg"
              >
                ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ClassroomGallery;
