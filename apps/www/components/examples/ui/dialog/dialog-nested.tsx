import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogStackedContent,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export function DialogNestedDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>View notifications</Button>} />
      <DialogStackedContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            You are all caught up. Good job!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <Dialog>
            <DialogTrigger render={<Button>Customize</Button>} />
            <DialogStackedContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Customize notification</DialogTitle>
                <DialogDescription>
                  Review your settings here.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Close</Button>}
                />
              </DialogFooter>
            </DialogStackedContent>
          </Dialog>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </div>
      </DialogStackedContent>
    </Dialog>
  );
}
