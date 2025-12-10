"use client";
import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "@/registry/ui/dialog";
export default function OutsideScrollDialog() {
  const popupRef = React.useRef<HTMLDivElement>(null);
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport className="group/dialog fixed inset-0 block">
          <ScrollArea.Root
            style={{ position: undefined }}
            className="h-full overscroll-contain group-data-[ending-style]/dialog:pointer-events-none"
          >
            <ScrollArea.Viewport className="h-full overscroll-contain group-data-[ending-style]/dialog:pointer-events-none">
              <ScrollArea.Content className="flex min-h-full items-center justify-center">
                <DialogPopup
                  className="w-full max-w-[calc(100%-2rem)] max-h-full min-h-0 sm:max-w-lg"
                  ref={popupRef}
                  initialFocus={popupRef}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <DialogTitle>Dialog</DialogTitle>
                    <DialogClose aria-label="Close">
                      <XIcon className="h-[1.1rem] w-[1.1rem]" />
                    </DialogClose>
                  </div>

                  <DialogDescription>
                    This layout keeps an outer container scrollable while the
                    dialog can extend past the bottom edge.
                  </DialogDescription>

                  <div className="mb-[1.75rem] flex flex-col gap-6">
                    {CONTENT_SECTIONS.map((item) => (
                      <section key={item.title}>
                        <h3 className="m-0 mb-[0.4rem] text-base font-semibold leading-6">
                          {item.title}
                        </h3>
                        <p className="m-0 text-[0.95rem] leading-[1.55rem] text-muted-foreground">
                          {item.body}
                        </p>
                      </section>
                    ))}
                  </div>
                </DialogPopup>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="pointer-events-none absolute m-[0.4rem] flex w-[0.25rem] justify-center rounded-[1rem] opacity-0 transition-opacity duration-[250ms] data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-[75ms] data-[scrolling]:delay-[0ms] hover:pointer-events-auto hover:opacity-100 hover:duration-[75ms] hover:delay-[0ms] md:w-[0.4375rem] group-data-[ending-style]/dialog:opacity-0 group-data-[ending-style]/dialog:duration-300">
              <ScrollArea.Thumb className="w-full rounded-[inherit] bg-gray-500 before:absolute before:content-[''] before:top-1/2 before:left-1/2 before:h-[calc(100%+1rem)] before:w-[calc(100%+1rem)] before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}

const CONTENT_SECTIONS = [
  {
    title: "What a dialog is for",
    body: "Use a dialog when you need the user to complete a focused task or read something important without navigating away. It opens on top of the page and returns focus back where it started when closed.",
  },
  {
    title: "Anatomy at a glance",
    body: "Root, Trigger, Portal, Backdrop, Viewport, Popup, Title, Description, Close. Keep the title short and the first paragraph specific so screen readers announce something meaningful.",
  },
  {
    title: "Opening and closing",
    body: "Control it using external state via the `open` and `onOpenChange` props, or let it manage state for you internally.",
  },
  {
    title: "Keyboard and focus behavior",
    body: "Focus moves inside the dialog when it opens. Tab and Shift+Tab loop within, and Esc requests close.",
  },
  {
    title: "Accessible labeling",
    body: "Set an explicit title and description using the `Dialog.Title` and `Dialog.Description` components.",
  },
  {
    title: "Backdrop and page scrolling",
    body: "The backdrop visually separates layers while background content is inert. Don’t rely on dimness alone—keep copy clear and buttons obvious so actions are easy to choose.",
  },
  {
    title: "Portals and stacking",
    body: "Dialogs render in a portal so they sit above the `isolation: isolate` app content and avoid local z-index wars.",
  },
  {
    title: "Viewport overflow",
    body: "Let long content overflow the bottom edge and reveal as you scroll the page container. Keep generous padding at the top and bottom so the dialog doesn’t feel jammed against the edges.",
  },
  {
    title: "Nested dialogs and confirmations",
    body: "If closing a dialog needs confirmation, open a child alert dialog rather than mutating the current one. The parent stays visible behind it; only the topmost layer should feel interactive.",
  },
  {
    title: "Transitions that respect motion settings",
    body: "Use small, fast transitions (opacity plus a few pixels of Y translation or scale). Subtle motion helps people notice what changed without slowing them down.",
  },
  {
    title: "Controlled vs. uncontrolled",
    body: "Controlled state is best when other parts of the page need to react to open/close. Uncontrolled is fine for local cases where only the dialog matters.",
  },
  {
    title: "Close affordances",
    body: "Always offer a visible close button in the corner. Don’t rely only on Esc or the backdrop for pointer outside presses. Touch screen readers and accessibility users benefit from a clear, targetable control to click to close the dialog.",
  },
  {
    title: "Forms inside dialogs",
    body: "Keep forms short; longer flows usually deserve a full page. Validate inline, keep button text specific (“Create project”), and disable destructive actions until the input is valid.",
  },
  {
    title: "Content guidelines",
    body: "Lead with the outcome (“Rename project?”) and follow with one or two short, concrete sentences. Avoid long prose; link out for details instead.",
  },
  {
    title: "SSR and hydration notes",
    body: "Because dialogs render in a portal, make sure your portal container exists on the client.",
  },
  {
    title: "Mobile ergonomics",
    body: "Use larger touch targets and keep the close button reachable with the thumb. Avoid full-screen modals unless the task truly needs a whole screen.",
  },
  {
    title: "Theming and density",
    body: "Match spacing and corner radius to your system. Use a slightly denser layout than pages so the dialog feels purpose-built, not like a mini web page.",
  },
  {
    title: "Internationalization",
    body: "Plan for longer text. Buttons can grow to two lines; titles should wrap gracefully. Keep destructive terms consistent across locales.",
  },
  {
    title: "Performance",
    body: "Children are mounted lazily when the dialog opens. If the dialog can reopen often, consider the `keepMounted` prop sparingly to perform the work only once on mount to avoid re-initializing complex React trees on each open.",
  },
  {
    title: "When a popover is better",
    body: "If the content is a small hint or a few quick actions anchored to a control, use a popover or menu instead of a dialog. Dialogs interrupt on purpose—use that sparingly.",
  },
  {
    title: "Follow-up and cleanup",
    body: "After a successful action, close the dialog and show confirmation in context (toast, inline message, or updated UI) so people can see the result of what they just did.",
  },
];
