import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { allProgrammingModules } from "@/data/programmingLessonData";

/**
 * PillarHub now acts as a smart redirect to the first lesson of the pillar.
 * The lesson page (ProgrammingLesson) already provides the unified
 * "lesson sidebar on the left + lesson content on the right" layout that
 * matches every other Programming pillar, so we route the user straight
 * into that experience for consistency.
 */
const PillarHub = () => {
  const location = useLocation();

  const pillarId = location.pathname.endsWith("/edtech")
    ? "edtech"
    : location.pathname.endsWith("/nlp")
    ? "nlp"
    : location.pathname.endsWith("/software-eng")
    ? "software-eng"
    : null;

  const target = useMemo(() => {
    if (!pillarId) return "/programming";
    // Software & Web Engineering is built from two specific module ids
    // rather than a shared `course` key.
    const modules =
      pillarId === "software-eng"
        ? allProgrammingModules.filter(
            (m) => m.id === "se-foundations" || m.id === "web-dev-foundations",
          )
        : allProgrammingModules.filter((m) => m.course === pillarId);
    const firstModule = modules[0];
    const firstLesson = firstModule?.lessons[0];
    if (firstModule && firstLesson) {
      return `/programming/${firstModule.id}/${firstLesson.id}`;
    }
    return "/programming";
  }, [pillarId]);

  return <Navigate to={target} replace />;
};

export default PillarHub;
