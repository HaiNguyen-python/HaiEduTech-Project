// Mounts SuperDictionary globally on relevant routes (home + Learn English pages).
import { useLocation } from "react-router-dom";
import SuperDictionary from "./SuperDictionary";

// Routes that should show the floating Super Dictionary.
// Matches by prefix where appropriate.
const ALLOWED_PREFIXES = [
  "/english",                  // English hub + all sub-routes (course, grammar, conversational, learn)
  "/ielts-",                   // ielts-writing-practice, ielts-vocabulary, ielts-lectures, ielts-sample-essays, ielts-speaking-practice
  "/toeic-",                   // toeic-vocabulary, toeic-lectures
  "/cambridge-",               // cambridge-lectures, cambridge-mock-exam
  "/national-exam",            // national exam prep + room
  "/pte",                      // PTE hub + sub-skills
  "/ai-grading",               // AI grading
  "/speaking-coach",           // speaking coach
];

const isAllowedRoute = (pathname: string): boolean => {
  if (pathname === "/") return true; // home
  return ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/") || pathname.startsWith(prefix));
};

const GlobalSuperDictionary = () => {
  const { pathname } = useLocation();
  if (!isAllowedRoute(pathname)) return null;
  return <SuperDictionary />;
};

export default GlobalSuperDictionary;
