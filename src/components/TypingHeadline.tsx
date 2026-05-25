import { useEffect, useState } from "react";

interface Props {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}

/** Rotating typed word with blinking caret. Apple-tinted gradient. */
const TypingHeadline = ({
  words,
  className = "",
  typeSpeed = 90,
  deleteSpeed = 45,
  pause = 1400,
}: Props) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(words[0] ?? "");
      return;
    }
    const current = words[idx % words.length];
    let timer: number;
    if (!deleting && text === current) {
      timer = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      timer = window.setTimeout(
        () => {
          setText((t) =>
            deleting ? t.slice(0, -1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={`text-gradient ${className}`}>
      {text}
      <span
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-primary align-middle"
        style={{ height: "0.9em" }}
        aria-hidden
      />
    </span>
  );
};

export default TypingHeadline;
