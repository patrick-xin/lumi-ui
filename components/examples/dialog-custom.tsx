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

export function DialogCustom() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <DialogPopup
        showCloseButton={false}
        classNames={{
          backdrop: "backdrop-blur",
          popup: "bg-indigo-800 top-[30%]",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Notifications</DialogTitle>
          <DialogDescription className="text-lg">
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
