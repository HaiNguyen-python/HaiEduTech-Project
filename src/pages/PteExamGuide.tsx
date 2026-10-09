import { Link } from "react-router-dom";
import { BookOpenCheck, CheckCircle2, Clock3, LockKeyhole, Mic2 } from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import { Button } from "@/components/ui/button";
import { PTE_TASK_REQUIREMENTS, PTE_OFFICIAL_SOURCES } from "@/data/pteTaskRequirements";
import { PTE_EXAM_BLUEPRINT, PTE_SECTION_TIMINGS } from "@/data/pteExamBlueprint";

const PteExamGuide = () => (
  <PteShell title="PTE Academic Exam Guide" subtitle="Current structure, item types and scoring pathways">
    <p className="mb-5 text-sm text-muted-foreground">Reviewed against Pearson sources on 9 October 2026. This guide covers the enhanced PTE Academic and Academic UKVI format introduced on 7 August 2025, not PTE Core.</p>
    <section className="mb-6 grid gap-3 md:grid-cols-3">
      {PTE_SECTION_TIMINGS.map(section => (
        <div key={section.section} className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><Clock3 size={17} /> {section.minutes} minutes</div>
          <h2 className="text-lg font-bold">{section.section}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{section.itemTypes} scored item types{section.section === "Speaking & Writing" ? " + unscored introduction" : ""}</p>
        </div>
      ))}
    </section>

    <div className="mb-6 flex flex-wrap gap-3 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1.5"><BookOpenCheck size={16} className="text-primary" /> Approximately two hours</span>
      <span className="inline-flex items-center gap-1.5"><Mic2 size={16} className="text-primary" /> Computer-based</span>
      <span className="inline-flex items-center gap-1.5"><LockKeyhole size={16} className="text-primary" /> Fixed section order</span>
      <span className="font-semibold text-foreground">Scores range from 10 to 90. Overall is not a simple average of the four skills.</span>
    </div>

    {PTE_SECTION_TIMINGS.map(section => (
      <section key={section.section} className="mb-7">
        <h2 className="mb-3 text-xl font-bold text-foreground">{section.section}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {PTE_EXAM_BLUEPRINT.filter(item => item.section === section.section).map(item => (
            <div key={item.id} className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </div>
                {item.available ? <CheckCircle2 className="shrink-0 text-primary" size={19} /> : <span className="max-w-28 shrink-0 rounded bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">Practice not yet available</span>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-muted px-2 py-1 capitalize">{item.scoring}</span>
                {item.contributesTo.map(skill => <span key={skill} className="rounded bg-muted px-2 py-1 capitalize">{skill}</span>)}
              </div>
              {item.practiceRoute && <Button asChild size="sm" className="mt-3"><Link to={item.practiceRoute}>Practice this type</Link></Button>}
            </div>
          ))}
        </div>
      </section>
    ))}

    <section className="mb-7 border-t border-border pt-5">
      <h2 className="mb-3 text-xl font-bold">Exam flow and score interpretation</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>Pearson describes approximately two hours and 65-75 questions. The validation report presents a representative 65-question composition; counts are not a guaranteed fixed paper.</li>
        <li>The three sections run in order. After moving to the next question, you cannot return to a previous question. There is no scheduled break.</li>
        <li>Recordings play once and spoken responses are recorded once. Reading and most Listening tasks share their section time; our short per-item practice timers are training targets, not official deadlines.</li>
        <li>The two new speaking types are already part of the real exam. A missing practice link describes HaiEduTech availability, not Pearson exam status.</li>
        <li>Overall and the four communicative scores use the 10-90 scale. Do not average raw item accuracy to predict an official overall score.</li>
        <li>Pearson uses automated scoring with human review for selected response content. Relevant spontaneous responses matter; memorised unrelated material does not replace task completion.</li>
        <li>Our mini sets omit some formats and use synthetic speech. They support practice, not full-exam simulation or official score prediction. For official scored practice, use Pearson resources.</li>
      </ul>
    </section>
    <section className="mb-6 border-t border-border pt-5">
      <h2 className="mb-3 text-xl font-bold">Official sources</h2>
      <ul className="space-y-2 text-sm">{PTE_OFFICIAL_SOURCES.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.title}</a></li>)}</ul>
    </section>
    <p className="text-sm leading-relaxed text-muted-foreground">HaiEduTech practice scores are estimates for learning. They are not official Pearson scores.</p>
  </PteShell>
);

export default PteExamGuide;
