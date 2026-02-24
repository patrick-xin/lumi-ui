import { Badge } from "@/registry/ui/badge";
import {
  Timeline,
  TimelineCard,
  TimelineDate,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
} from "@/registry/ui/timeline";

export function TimelineDemo() {
  return (
    <Timeline>
      {releases.map((item) => (
        <TimelineItem glowOnHover={true} key={item.version}>
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
  {
    content: [
      "Optimized rendering performance for large lists with frequent updates.",
      "Fixed an issue with transitions stalling after nested suspense fallbacks.",
    ],
    date: "Aug 7, 2025",
    version: "18.4.1",
  },
  {
    content: [
      "Added warnings for legacy root APIs in strict mode.",
      "Improved developer messages for invalid hook call edge cases.",
    ],
    date: "Mar 12, 2025",
    version: "18.4.0",
  },
  {
    content: [
      "Patched a regression affecting event delegation in portals.",
      "Minor stability improvements for concurrent rendering.",
    ],
    date: "Oct 3, 2024",
    version: "18.3.2",
  },
  {
    content: [
      "Added warnings for deprecated APIs to prepare for React 19.",
      "Bugfixes and minor performance improvements.",
    ],
    date: "Apr 25, 2024",
    version: "18.3.0",
  },
  {
    content: ["Fixed a bug with useId in suspense boundaries."],
    date: "Jun 14, 2022",
    version: "18.2.0",
  },
];
