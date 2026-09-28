import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GROUPS = [
  {
    title: "Tiếng Phần Lan / Finnish",
    links: [
      ["/finnish", "Finnish hub"],
      ["/finnish/beginner", "Beginner"],
      ["/finnish/yki-dashboard", "YKI A2"],
      ["/finnish/yki-b1", "YKI B1"],
      ["/finnish-vocabulary", "Vocabulary"],
      ["/finnish/arcade", "Arcade"],
      ["/finnish/life-in-finland", "Life in Finland"],
    ],
  },
  {
    title: "Tiếng Thụy Điển / Swedish",
    links: [
      ["/swedish", "Swedish hub"],
      ["/swedish/beginner", "Beginner"],
      ["/swedish/curriculum", "Curriculum"],
      ["/swedish/yki-a2", "YKI A2"],
      ["/swedish/yki-b1", "YKI B1"],
      ["/swedish/vocabulary", "Vocabulary"],
      ["/swedish/reading", "Reading lab"],
      ["/swedish/listening", "Listening lab"],
      ["/swedish/writing", "Writing lab"],
      ["/swedish/speaking", "Speaking lab"],
      ["/swedish/skills", "Skills lab"],
      ["/swedish/performance", "Performance"],
      ["/swedish/svenskfinland", "Svenskfinland"],
    ],
  },
];

export default function PrivateLanguagesTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {GROUPS.map((g) => (
        <Card key={g.title}>
          <CardHeader>
            <CardTitle className="text-lg">{g.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {g.links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:bg-accent/10"
              >
                {label}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
