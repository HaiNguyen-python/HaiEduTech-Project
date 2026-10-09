import { Link } from "react-router-dom";
import { LockKeyhole, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookChapter } from "@/data/curriculum/pythonBookTheory";
import { pythonChallenges } from "@/data/pythonChallenges";
import { usePythonChallengeProgress } from "@/hooks/usePythonChallengeProgress";
import { isPythonChallengeUnlocked } from "@/lib/pythonChallengeProgress";

export default function BookChallengePractice({ lessonId }: { lessonId: string }) {
  const chapter = getBookChapter(lessonId);
  const { ids, loading } = usePythonChallengeProgress();
  if (!chapter) return null;
  const challenges = pythonChallenges.filter(challenge => challenge.number >= chapter.first && challenge.number <= chapter.last);
  return <section className="mt-6 border-t border-border pt-5">
    <h3 className="mb-3 font-semibold text-foreground">Python Challenges {String(chapter.first).padStart(3, "0")}-{String(chapter.last).padStart(3, "0")}</h3>
    <div className="grid gap-2 sm:grid-cols-2">
      {challenges.map(challenge => {
        const unlocked = !loading && isPythonChallengeUnlocked(challenge.id, ids);
        return <Button key={challenge.id} asChild={unlocked} disabled={!unlocked} variant="outline" className="h-auto min-h-10 justify-start whitespace-normal text-left">
          {unlocked ? <Link to={`/python-challenges/${challenge.id}`}>
            {ids.has(challenge.id) ? <Check className="h-4 w-4 shrink-0" /> : <ArrowRight className="h-4 w-4 shrink-0" />}
            <span>#{challenge.id} {challenge.title}</span>
          </Link> : <><LockKeyhole className="h-4 w-4 shrink-0" /><span>#{challenge.id} {challenge.title}</span></>}
        </Button>;
      })}
    </div>
    <Button asChild variant="link" className="mt-2 px-0"><Link to="/python-challenges">All 150 challenges <ArrowRight className="h-4 w-4" /></Link></Button>
  </section>;
}