import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="70 190 400 110"
    className={cn("w-14 h-12", className)}
  >
    <title>Lumi UI</title>
    <path
      fill="var(--foreground)"
      d="m154 270-1-1-12 12h-1l-2 2h-1l-1 1h-1l-2 2h-2l-1 1h-1l-1 1h-2l-1 1h-4l-1 1 1 1h32l1-1ZM273 262l-1 1v2l-1 1v2l-1 1v1l-1 1v2l-1 1v1l-2 2v1l-1 1v1l-3 3v1l-6 6 1 1h16l1-1v-27ZM391 198l-1 2 4 4 2 4v73l-1 1v2l-5 6 1 1h32l1-1-3-3-3-6v-73l1-1v-2l5-5v-1l-1-1ZM346 198l-1 1v5l1 1v13l1 1v12l1 1v13l1 1v12l1 1v13l1 1v9l-1 1v2l-5 5 1 1h32l1-1-5-6-1-2v-3l-1-1-1-27-1-1-1-26-1-1v-15l2-4 4-4v-1l-1-1ZM268 198l-1 1 9 8 3 6v2l2 3v2l2 3v2l2 3v2l2 3v2l2 3v2l2 3v2l4 8 1 5 2 3v2l2 3v2l2 3v2l2 3v2l2 3v2l4 8 2-2v-2l2-3v-2l3-6 1-5 2-3v-2l1-1v-4l-3-6v-2l-2-3v-2l-2-3v-2l-2-3-1-5-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-2ZM255 198h-14l-1 1v26l1 1 1-1v-2l1-1v-2l1-1v-2l1-1v-1l1-1v-2l2-2v-1l1-1v-1l7-7v-1ZM163 198l-1 2 3 2 3 5v51l1 1v6l1 1v3l5 9 6 6 9 5h2l4 2h3l1 1h4l1-1-1-1-4-1-6-6-2-4v-2l-1-1v-4l-1-1v-62l1-1v-2l5-6v-1l-1-1ZM76 198l-1 2 5 5 1 2v75l-2 4-4 4 1 1h26l1-1v-82l2-4 4-4v-1l-1-1Z"
    ></path>
  </svg>
);
