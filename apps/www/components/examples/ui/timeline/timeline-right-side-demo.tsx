import { Badge } from "@/registry/ui/badge";
import {
  Timeline,
  TimelineCard,
  TimelineDate,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
} from "@/registry/ui/timeline";

export function TimelineRightSideDemo() {
  return (
    <Timeline side="right">
      {releases.map((item) => (
        <TimelineItem key={item.version}>
          <TimelineCard>
            <TimelineHeader>
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineTitle>
                {item.version}
                {item.latest && <Badge variant="outline">Latest</Badge>}
              </TimelineTitle>
            </TimelineHeader>
            <ul className="list-disc pl-4 space-y-2">
              {item.content.map((content, index) => (
                <li
                  className="text-sm text-muted-foreground"
                  key={String(index)}
                >
                  {content}
                </li>
              ))}
            </ul>
          </TimelineCard>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

const releases = [
  {
    content: [
      "Introduced experimental cache hydration helpers for server rendering.",
      "Improved error overlays for async component boundaries.",
    ],
    date: "Jan 5, 2026",
    latest: true,
    version: "19.0.0",
  },
  {
    content: [
      "Added compiler compatibility checks for stricter build validation.",
      "Improved hydration mismatch diagnostics in development.",
    ],
    date: "Nov 18, 2025",
    version: "18.4.2",
  },
];
