import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Show Dialog</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            You are all caught up. Good job!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
