import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import PteShell from '@/components/pte/PteShell';
import { Button } from '@/components/ui/button';
import { getPteMock, getPteMockTasks } from '@/lib/pteMockTasks';
import { usePteProgress } from '@/hooks/usePteProgress';

export default function PteMockPractice() {
  const { mockId = '' } = useParams();
  const mock = getPteMock(mockId);
  const { progress } = usePteProgress();
  if (!mock) return <PteShell title="Practice set not found"><Button asChild><Link to="/pte">Back to PTE</Link></Button></PteShell>;
  const tasks = getPteMockTasks(mock);
  const complete = new Set(progress.completedIds);
  const next = tasks.find(task => !complete.has(task.id));
  return <PteShell title={mock.title} subtitle="Guided mini set · original HaiEduTech material">
    <p className="mb-3 text-muted-foreground">{mock.description}</p>
    <p className="mb-5 text-sm text-muted-foreground">{tasks.length} tasks · {tasks.filter(task => complete.has(task.id)).length} previously completed. This is not a full-length mock: some exam formats are omitted, audio is synthetic, and there is no shared exam clock or official score prediction.</p>
    {next && <Button asChild className="mb-6"><Link to={next.route}>Continue practice<ChevronRight className="ml-2" size={16} /></Link></Button>}
    {['Speaking & Writing', 'Reading', 'Listening'].map(section => <section key={section} className="mb-6">
      <h2 className="mb-3 text-xl font-bold">{section}</h2>
      <div className="divide-y divide-border border-y border-border">{tasks.filter(task => task.section === section).map(task => <Link key={task.id} to={task.route} className="flex items-center justify-between gap-3 py-4 text-sm hover:text-primary">
        <span>{task.label}<span className="ml-2 text-xs text-muted-foreground">{task.id}</span></span>
        {complete.has(task.id) ? <CheckCircle2 size={18} className="shrink-0 text-primary" /> : <ChevronRight size={18} className="shrink-0" />}
      </Link>)}</div>
    </section>)}
    <Button asChild variant="outline"><Link to="/pte/exam-guide">Compare with the full exam format</Link></Button>
  </PteShell>;
}
