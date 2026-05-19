"use client";

import * as React from "react";
import { cn } from "@/registry/lib/utils";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field";
import { OTPFieldInput, OTPFieldRoot } from "@/registry/ui/otp-field";

const CODE_LENGTH = 6;
const INVALID_PULSE_MS = 400;

function sanitizeTierCode(value: string) {
  return value.replace(/[^0-3]/g, "");
}

// Inline keyframes so the demo is self-contained — paste the CSS below into
// your global stylesheet (or a Tailwind plugin) and drop the <style> tag if
// you'd rather keep CSS out of JSX. The two animations are duplicates that
// alternate per invalid tick so consecutive rejections re-trigger the shake
// (browsers don't restart an animation when the same one is reapplied).
const shakeStyles = `
@media (prefers-reduced-motion: no-preference) {
  @keyframes otp-shake-a {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
  @keyframes otp-shake-b {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
  .otp-shake-a { animation: otp-shake-a 180ms ease-in-out; }
  .otp-shake-b { animation: otp-shake-b 180ms ease-in-out; }
}
`;

export function OTPFieldSanitizeDemo() {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [invalidTick, setInvalidTick] = React.useState(0);
  const [statusMessage, setStatusMessage] = React.useState("");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipClearRef = React.useRef(false);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  function clearFeedback() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setInvalidTick(0);
    setStatusMessage("");
  }

  function handleValueChange() {
    if (skipClearRef.current) {
      skipClearRef.current = false;
      return;
    }
    clearFeedback();
  }

  function handleValueInvalid(value: string) {
    skipClearRef.current = true;
    setInvalidTick((tick) => tick + 1);
    setStatusMessage(`Unsupported characters ignored from "${value}".`);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setInvalidTick(0);
    }, INVALID_PULSE_MS);
  }

  const activeInvalidIndex = invalidTick > 0 ? focusedIndex : -1;
  const shakeClass = invalidTick % 2 === 0 ? "otp-shake-b" : "otp-shake-a";

  return (
    <Field>
      <style>{shakeStyles}</style>
      <FieldLabel>Tier code</FieldLabel>
      <OTPFieldRoot
        inputMode="numeric"
        length={CODE_LENGTH}
        onValueChange={handleValueChange}
        onValueInvalid={handleValueInvalid}
        sanitizeValue={sanitizeTierCode}
        validationType="none"
      >
        {Array.from({ length: CODE_LENGTH }, (_, index) => (
          <OTPFieldInput
            aria-invalid={activeInvalidIndex === index || undefined}
            aria-label={`Character ${index + 1} of ${CODE_LENGTH}`}
            className={cn(
              activeInvalidIndex === index && [
                "border-destructive ring-4 ring-destructive/30",
                "focus-visible:border-destructive focus-visible:ring-4 focus-visible:ring-destructive/30 focus-visible:outline-destructive",
                shakeClass,
              ],
            )}
            key={index}
            onFocus={() => setFocusedIndex(index)}
          />
        ))}
      </OTPFieldRoot>
      <FieldDescription>
        Digits <code>0-3</code> only.
      </FieldDescription>
      <span aria-live="polite" className="sr-only">
        {statusMessage}
      </span>
    </Field>
  );
}
