import { XIcon } from "lucide-react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
  DialogViewport,
} from "@/registry/ui/dialog";

export default function ExampleUncontainedDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open dialog</Button>} />
      <DialogPortal>
        <DialogBackdrop className="duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogViewport className="grid place-items-center px-4 py-10 xl:py-6">
          <DialogPopup className="group/popup flex h-full w-full justify-center pointer-events-none transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 p-0 bg-transparent">
            <DialogClose
              className="absolute right-3 top-2 xl:right-3 xl:top-3 xl:h-10 xl:w-10 pointer-events-auto"
              render={
                <Button variant="outline" size="icon" aria-label="Close">
                  <XIcon />
                </Button>
              }
            />
            <div className="pointer-events-auto box-border h-full w-full max-w-[70rem] rounded-lg bg-popover p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[starting-style]/popup:scale-110">
              Close button is outside
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
