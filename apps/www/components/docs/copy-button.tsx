"use client";

import { cn } from "@/lib/utils";
import { Button } from "@lumi-ui/ui/button";
import { useCopyToClipboard } from "@lumi-ui/ui/hooks/use-copy-to-clipboard";
import { ToastArrow, toast } from "@lumi-ui/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@lumi-ui/ui/tooltip";
import {
  motion,
  useMotionValue,
  useTransform,
  type Easing,
  type Variants,
} from "motion/react";
import * as React from "react";

const duration = 0.45;
const ease: Easing = [0.16, 1, 0.3, 1];

const svgVariants = {
  hover: (isChecked: boolean) => ({
    scale: isChecked ? 1 : 1.05,
  }),
  idle: {
    scale: 1,
  },
  pressed: (isChecked: boolean) => ({
    scale: isChecked ? 1 : 0.95,
  }),
};
const boxVariants: Variants = {
  checked: { opacity: 0, transition: { duration: 0.25, ease } },
  unchecked: { opacity: 1, transition: { duration: 0.25, ease } },
};

const tickVariants = {
  checked: { pathLength: 1, transition: { duration: duration * 0.9, ease } },
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.05 }),
  unchecked: { pathLength: 0, transition: { duration: duration * 0.5, ease } },
};

export function CopyButton({
  code,
  className,
  variant = "glow",
  ...props
}: React.ComponentProps<typeof Button> & {
  code: string;
  src?: string;
}) {
  const { isCopied, copyToClipboard, setIsCopied } = useCopyToClipboard();
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handleCopy = () => {
    copyToClipboard(code);

    toast.anchor(buttonRef.current, {
      customContent: (
        <>
          <ToastArrow />
          <p className="text-xs p-1.5 rounded-sm outline-1 outline-border dark:-outline-offset-1 shadow-md shadow-primary/10 bg-popover text-primary">
            Copied
          </p>
        </>
      ),
      onClose() {
        setIsCopied(false);
      },
      side: "right",
      timeout: 1500,
    });
  };
  return (
    <Tooltip
      disabled={isCopied}
      onOpenChange={(_, eventDetails) => {
        if (eventDetails.reason === "trigger-press") {
          eventDetails.cancel();
        }
      }}
    >
      <TooltipTrigger
        aria-label="Copy to clipboard"
        onClick={handleCopy}
        ref={buttonRef}
        render={
          <Button
            className={cn(
              "bg-code size-7",
              className,
            )}
            disabled={isCopied}
            size="icon-sm"
            variant={variant}
            {...props}
          >
            <span className="sr-only">Copy</span>
            <motion.svg
              custom={isCopied}
              fill="none"
              height="16"
              initial="idle"
              transition={{ duration }}
              variants={svgVariants}
              viewBox="0 0 25 25"
              whileHover="hover"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>copy code</title>
              <motion.path
                animate={isCopied ? "checked" : "unchecked"}
                custom={isCopied}
                d="M20.8511 9.46338H11.8511C10.7465 9.46338 9.85107 10.3588 9.85107 11.4634V20.4634C9.85107 21.5679 10.7465 22.4634 11.8511 22.4634H20.8511C21.9556 22.4634 22.8511 21.5679 22.8511 20.4634V11.4634C22.8511 10.3588 21.9556 9.46338 20.8511 9.46338Z"
                initial={false}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                transition={{ duration }}
                variants={boxVariants}
              />
              <motion.path
                animate={isCopied ? "checked" : "unchecked"}
                custom={isCopied}
                d="M5.85107 15.4634H4.85107C4.32064 15.4634 3.81193 15.2527 3.43686 14.8776C3.06179 14.5025 2.85107 13.9938 2.85107 13.4634V4.46338C2.85107 3.93295 3.06179 3.42424 3.43686 3.04917C3.81193 2.67409 4.32064 2.46338 4.85107 2.46338H13.8511C14.3815 2.46338 14.8902 2.67409 15.2653 3.04917C15.6404 3.42424 15.8511 3.93295 15.8511 4.46338V5.46338"
                initial={false}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                transition={{ duration }}
                variants={boxVariants}
              />
              <motion.path
                animate={isCopied ? "checked" : "unchecked"}
                custom={isCopied}
                d="M4 12L9 17L20 6"
                initial={false}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                style={{ opacity, pathLength }}
                transition={{ duration }}
                variants={tickVariants}
              />
            </motion.svg>
          </Button>
        }
      />
      <TooltipContent
        className="bg-popover text-popover-foreground"
        showArrow={false}
      >
        <p className="text-xs text-primary">Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
}
